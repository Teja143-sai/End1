import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { app } from '../firebase/firebase';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  updateProfile as updateAuthProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp, 
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED
} from 'firebase/firestore';

// Initialize Firebase
export const auth = getAuth(app);

// Initialize Firestore with offline persistence
let db;
// Check if Firestore is already initialized
try {
  db = getFirestore(app);
  
  // Only initialize with custom settings if not already initialized
  if (!db._settingsFrozen) {
    db = initializeFirestore(app, {
      cacheSizeBytes: CACHE_SIZE_UNLIMITED
    });
    
    // Enable offline data persistence
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Offline persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support offline persistence.');
      }
    });
  }
} catch (error) {
  console.error('Firestore initialization error:', error);
  // Fallback to default Firestore instance if there's an error
  db = getFirestore(app);
}

// Helper function to convert Firebase error codes to user-friendly messages
const getFirebaseErrorMessage = (code) => {
  const errorMessages = {
    'auth/email-already-in-use': 'This email is already in use. Please use a different email or sign in.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
    'auth/weak-password': 'Please enter a stronger password (at least 6 characters).',
    'auth/user-not-found': 'No account found with this email. Please sign up first.',
    'auth/wrong-password': 'Incorrect password. Please try again or reset your password.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later or reset your password.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/requires-recent-login': 'Please sign in again to update your security settings.',
    'permission-denied': 'You do not have permission to perform this action.',
    'unavailable': 'Network error. Please check your internet connection and try again.',
    'cancelled-popup-request': 'Sign in was cancelled. Please try again.',
    'popup-closed-by-user': 'Sign in was cancelled. Please try again.',
    'popup-blocked': 'Popup was blocked. Please allow popups for this site and try again.'
  };
  
  return errorMessages[code] || 'An error occurred. Please try again.';
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // All hooks must be called unconditionally at the top level
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    error: null,
    initialLoading: true,
    isOffline: false
  });
  
  // Auto logout after 1 hour of inactivity
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Initialize Google Auth Provider
  const googleProvider = useMemo(() => new GoogleAuthProvider(), []);
  
  // Set up event listeners for user activity
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'mousemove', 'scroll', 'touchstart'];
    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      // Set timeout for 1 hour (3600000 ms)
      timeoutId = setTimeout(() => {
        if (authState.user) {
          console.log('User inactive for 1 hour, logging out...');
          logout();
        }
      }, 3600000); // 1 hour in milliseconds
      
      setLogoutTimer(timeoutId);
    };
    
    // Initial setup
    resetTimer();
    
    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });
    
    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [authState.user]); // Only re-run if authState.user changes

  // Memoize the auth state to prevent unnecessary re-renders
  const memoizedAuthState = useMemo(() => ({
    ...authState,
    isAuthenticated: !!authState.user,
    isInitialLoading: authState.initialLoading
  }), [authState]);
  
  // Handle user login with email and password
  const login = useCallback(async (email, password, rememberMe = false) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // Set session persistence
      try {
        await setPersistence(
          auth,
          rememberMe ? browserLocalPersistence : browserSessionPersistence
        );
      } catch (persistenceError) {
        console.warn('Error setting auth persistence:', persistenceError);
        // Continue with login even if persistence fails
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user document from Firestore
      let userDoc;
      try {
        userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (!userDoc.exists()) {
          console.warn('User document not found, creating default profile');
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName || userCredential.user.email?.split('@')[0] || 'User',
            role: 'interviewee',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          
          // Create a new user object with the role
          return {
            ...userCredential.user,
            role: 'interviewee'
          };
        }
        
        // Return user with role from Firestore
        return {
          ...userCredential.user,
          role: userDoc.data().role || 'interviewee'
        };
      } catch (dbError) {
        console.error('Error accessing user document:', dbError);
        // Return user with default role if there's an error
        return {
          ...userCredential.user,
          role: 'interviewee'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = getFirebaseErrorMessage(error.code || error.message);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      throw new Error(errorMessage);
    }
  }, []);

  // Handle user signup with email and password
  const signup = useCallback(async (email, password, displayName) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      await updateAuthProfile(userCredential.user, { displayName });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        displayName,
        role: 'interviewee',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Send verification email
      await sendEmailVerification(userCredential.user);
      
      return userCredential.user;
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      throw new Error(errorMessage);
    }
  }, []);

  // Handle Google sign-in
  const signInWithGoogle = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      let userData = {};
      
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: 'interviewee',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        userData.role = 'interviewee';
      } else {
        userData = userDoc.data();
      }
      
      // Return user with role
      return {
        ...firebaseUser,
        role: userData.role || 'interviewee'
      };
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      throw new Error(errorMessage);
    }
  }, [googleProvider]);

  // Handle user logout
  const logout = useCallback(async () => {
    try {
      // Clear any existing logout timer
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        setLogoutTimer(null);
      }
      
      await signOut(auth);
      setAuthState(prev => ({
        ...prev,
        user: null,
        loading: false
      }));
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState(prev => ({
        ...prev,
        error: 'Failed to sign out. Please try again.'
      }));
    }
  }, [navigate, logoutTimer]);

  // Handle password reset
  const resetPassword = useCallback(async (email) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      throw new Error(errorMessage);
    }
  }, []);

  // Update user profile
  const updateUserProfile = useCallback(async (updates) => {
    try {
      if (!auth.currentUser) throw new Error('No user is currently signed in');
      
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // Ensure we're not storing Blob URLs
      const cleanUpdates = { ...updates };
      if (cleanUpdates.photoURL && cleanUpdates.photoURL.startsWith('blob:')) {
        delete cleanUpdates.photoURL;
      }
      
      // Update auth profile
      if (cleanUpdates.displayName) {
        await updateAuthProfile(auth.currentUser, {
          displayName: cleanUpdates.displayName,
          // Don't update photoURL as we're not using it anymore
        });
      }
      
      // Update Firestore - explicitly set fields we want to update
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userData = {
        displayName: cleanUpdates.displayName,
        updatedAt: serverTimestamp()
      };
      
      // Only include fields that exist in cleanUpdates
      if (cleanUpdates.role) userData.role = cleanUpdates.role;
      
      await setDoc(userRef, userData, { merge: true });
      
      // Update local state with the latest user data using the state setter callback
      setAuthState(prev => {
        const updatedUser = {
          ...prev.user,
          ...cleanUpdates,
          // Remove photoURL entirely
          photoURL: null
        };
        
        return {
          ...prev,
          user: updatedUser,
          loading: false
        };
      });
      
      return true;
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code || 'unknown-error');
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      throw new Error(errorMessage);
    }
  }, []);

  // Delete user account
  const deleteAccount = useCallback(async (password) => {
    try {
      if (!auth.currentUser) throw new Error('No user is currently signed in');
      
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Anonymize user data in Firestore
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        status: 'deleted',
        deletedAt: serverTimestamp(),
        email: `${auth.currentUser.uid}@deleted.user`,
        displayName: 'Deleted User',
        updatedAt: serverTimestamp(),
        // Keep some metadata but remove PII
        role: null,
        photoURL: null,
        phoneNumber: null,
        recoveryEmail: null
      }, { merge: true });
      
      // Delete auth account
      await deleteUser(auth.currentUser);
      
      // Sign out the user
      await logout();
      
      return { success: true };
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code || 'unknown-error');
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      throw new Error(errorMessage);
    }
  }, [logout]);

  // Deactivate user account
  const deactivateAccount = useCallback(async (password) => {
    try {
      if (!auth.currentUser) throw new Error('No user is currently signed in');
      
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Update user status in Firestore
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        status: 'deactivated',
        deactivatedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      // Sign out the user
      await logout();
      
      return { success: true };
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code || 'unknown-error');
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      throw new Error(errorMessage);
    }
  }, [logout]);

  // Clear error message
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  // Set up auth state observer with optimized updates
  useEffect(() => {
    let isMounted = true;
    let authCheckTimeout;
    
    const handleAuthStateChange = async (firebaseUser) => {
      if (!isMounted) return;
      
      clearTimeout(authCheckTimeout);
      
      // Handle signed out state
      if (!firebaseUser) {
        if (isMounted) {
          setAuthState({
            user: null,
            loading: false,
            error: null,
            initialLoading: false,
            isOffline: false
          });
        }
        return;
      }
      
      // User is signed in
      let userData = { role: 'interviewee' };
      let isOffline = false;
      
      // Try to get user data from Firestore with a timeout
      try {
        const userDoc = await Promise.race([
          getDoc(doc(db, 'users', firebaseUser.uid)),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firestore request timeout')), 5000)
          )
        ]);
        
        if (userDoc?.exists()) {
          userData = userDoc.data();
        } else {
          // Create default user document if it doesn't exist
          console.log('Creating default user document for', firebaseUser.uid);
          const defaultUserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            role: 'interviewee',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };
          
          // Save the default user data to Firestore
          try {
            await setDoc(doc(db, 'users', firebaseUser.uid), defaultUserData);
            userData = defaultUserData;
          } catch (docError) {
            console.error('Error saving user document:', docError);
            isOffline = true;
          }
        }
        
        if (isMounted) {
          // Create a clean user object without photoURL to prevent Blob URLs
          const user = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            photoURL: null, // Explicitly set to null to prevent Blob URLs
            role: userData.role || 'interviewee',
            emailVerified: firebaseUser.emailVerified,
            metadata: {
              creationTime: firebaseUser.metadata?.creationTime,
              lastSignInTime: firebaseUser.metadata?.lastSignInTime
            }
          };
          
          // Clean up any existing Blob URLs in Firestore
          if (userData.photoURL && userData.photoURL.startsWith('blob:')) {
            try {
              await setDoc(doc(db, 'users', firebaseUser.uid), {
                photoURL: null,
                updatedAt: serverTimestamp()
              }, { merge: true });
            } catch (error) {
              console.error('Error cleaning up Blob URL:', error);
            }
          }
          
          setAuthState({
            user,
            loading: false,
            error: null,
            initialLoading: false,
            isOffline
          });
          
          // Redirect to home page after login
          const currentPath = window.location.pathname;
          const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(currentPath);
          
          if (isAuthPage) {
            navigate('/', { replace: true });
          }
        }
        
      } catch (error) {
        console.error('Error in auth state change:', error);
        isOffline = true;
        
        if (isMounted) {
          setAuthState({
            user: firebaseUser ? {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              photoURL: null, // Explicitly set to null to prevent Blob URLs
              role: 'interviewee',
              emailVerified: firebaseUser.emailVerified,
              metadata: {
                creationTime: firebaseUser.metadata?.creationTime,
                lastSignInTime: firebaseUser.metadata?.lastSignInTime
              }
            } : null,
            loading: false,
            error: error.message,
            initialLoading: false,
            isOffline: true
          });
        }
      }
    };
    
    // Set a timeout for the initial auth check
    authCheckTimeout = setTimeout(() => {
      if (isMounted && authState.initialLoading) {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          initialLoading: false,
          error: 'Authentication check timed out. Please refresh the page.'
        }));
      }
    }, 10000); // 10 seconds timeout
    
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    
    return () => {
      isMounted = false;
      clearTimeout(authCheckTimeout);
      unsubscribe();
    };
  }, [location.pathname, navigate]);
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    ...authState,
    login,
    signup,
    signInWithGoogle,
    logout,
    resetPassword,
    updateProfile: updateUserProfile,
    deactivateAccount,
    deleteAccount,
    clearError
  }), [
    authState,
    login,
    signup,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    deactivateAccount,
    deleteAccount,
    clearError
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {!authState.initialLoading ? children : null}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Return the memoized context value with additional properties
  return {
    ...context,
    currentUser: context.user, // Expose the user as currentUser
    isAuthenticated: !!context.user,
    isInitialLoading: context.initialLoading
  };
};

export default AuthContext;

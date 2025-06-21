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
  browserSessionPersistence
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
import { getAnalytics } from 'firebase/analytics';

// Initialize Firebase
export const auth = getAuth(app);

// Initialize Firestore with offline persistence
let db;
try {
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
} catch (error) {
  console.error('Firestore initialization error:', error);
  db = getFirestore(app);
}

// Initialize Analytics
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

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
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    error: null,
    initialLoading: true,
    isOffline: false
  });
  
  // Initialize Google Auth Provider
  const googleProvider = useMemo(() => new GoogleAuthProvider(), []);
  
  // Helper function to create a fallback user object when offline
  const createFallbackUser = useCallback((firebaseUser) => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    photoURL: firebaseUser.photoURL || '',
    role: 'interviewee',
    emailVerified: firebaseUser.emailVerified,
    isAnonymous: firebaseUser.isAnonymous
  }), []);
  
  // Update user data in Firestore
  const updateUserData = useCallback(async (userId, userData) => {
    if (!userId) return null;
    
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return userData;
    } catch (error) {
      console.error('Error updating user data:', error);
      return null;
    }
  }, []);
  
  // Handle auth state changes
  useEffect(() => {
    let isMounted = true;
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;
      
      try {
        if (user) {
          // User is signed in
          let userData = {};
          
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              userData = userDoc.data();
            }
          } catch (error) {
            console.warn('Error fetching user data:', error);
          }
          
          const currentUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || userData.displayName || user.email?.split('@')[0] || 'User',
            photoURL: user.photoURL || userData.photoURL || '',
            role: userData.role || 'interviewee',
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            ...userData
          };
          
          setAuthState({
            user: currentUser,
            loading: false,
            initialLoading: false,
            error: null,
            isOffline: false
          });
        } else {
          // User is signed out
          setAuthState({
            user: null,
            loading: false,
            initialLoading: false,
            error: null,
            isOffline: false
          });
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        if (isMounted) {
          setAuthState({
            user: null,
            loading: false,
            initialLoading: false,
            error: getFirebaseErrorMessage(error.code || 'unknown'),
            isOffline: error.code === 'unavailable' || error.code === 'failed-precondition'
          });
        }
      }
    });
    
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [navigate, location]);
  
  // Login with email/password
  const login = useCallback(async (email, password, rememberMe = false) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // Set persistence based on remember me
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get user data from Firestore
      let userData = { role: 'interviewee' };
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          userData = userDoc.data();
        }
      } catch (error) {
        console.warn('Error fetching user data on login:', error);
      }
      
      const currentUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || userData.displayName || user.email?.split('@')[0] || 'User',
        photoURL: user.photoURL || userData.photoURL || '',
        role: userData.role || 'interviewee',
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        ...userData
      };
      
      setAuthState({
        user: currentUser,
        loading: false,
        error: null,
        isOffline: false
      });
      
      return { success: true, user: currentUser };
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      return { success: false, error: errorMessage };
    }
  }, []);
  
  // Sign up with email/password
  const signup = useCallback(async ({ email, password, fullName, role = 'interviewee', phoneNumber = '' }) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // Create user with email/password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      await updateAuthProfile(user, { displayName: fullName });
      
      // Prepare user data for Firestore
      const userData = {
        email,
        displayName: fullName,
        role,
        phoneNumber,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      };
      
      // Save to Firestore
      await updateUserData(user.uid, userData);
      
      const currentUser = {
        uid: user.uid,
        email: user.email,
        displayName: fullName,
        photoURL: user.photoURL || '',
        role,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        ...userData
      };
      
      setAuthState({
        user: currentUser,
        loading: false,
        error: null,
        isOffline: false
      });
      
      return { success: true, user: currentUser };
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      return { success: false, error: errorMessage };
    }
  }, [updateUserData]);
  
  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Prepare user data for Firestore
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: serverTimestamp()
      };
      
      // Save to Firestore
      await updateUserData(user.uid, userData);
      
      const currentUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || '',
        role: 'interviewee',
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        ...userData
      };
      
      setAuthState({
        user: currentUser,
        loading: false,
        error: null,
        isOffline: false
      });
      
      return { success: true, user: currentUser };
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      return { success: false, error: errorMessage };
    }
  }, [googleProvider, updateUserData]);
  
  // Logout
  const logout = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await signOut(auth);
      setAuthState({
        user: null,
        loading: false,
        error: null,
        isOffline: false
      });
      return { success: true };
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      return { success: false, error: errorMessage };
    }
  }, []);
  
  // Clear error
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);
  
  // Update user profile
  const updateProfile = useCallback(async (updates) => {
    try {
      if (!authState.user) {
        throw new Error('No user is currently logged in');
      }
      
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // Update auth profile if displayName or photoURL is being updated
      const authUpdates = {};
      if (updates.displayName) authUpdates.displayName = updates.displayName;
      if (updates.photoURL) authUpdates.photoURL = updates.photoURL;
      
      if (Object.keys(authUpdates).length > 0) {
        await updateAuthProfile(auth.currentUser, authUpdates);
      }
      
      // Update user data in Firestore
      const updatedUser = await updateUserData(authState.user.uid, updates);
      
      const currentUser = {
        ...authState.user,
        ...updates,
        ...updatedUser
      };
      
      setAuthState(prev => ({
        ...prev,
        user: currentUser,
        loading: false,
        error: null
      }));
      
      return { success: true, user: currentUser };
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code || error.message);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      return { success: false, error: errorMessage };
    }
  }, [authState.user, updateUserData]);
  
  // Memoize the auth context value to prevent unnecessary re-renders
  const authContextValue = useMemo(() => ({
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    isOffline: authState.isOffline,
    initialLoading: authState.initialLoading,
    login,
    signup,
    signInWithGoogle,
    logout,
    clearError,
    updateProfile
  }), [
    authState.user,
    authState.loading,
    authState.error,
    authState.isOffline,
    authState.initialLoading,
    login,
    signup,
    signInWithGoogle,
    logout,
    clearError,
    updateProfile
  ]);
  
  // Don't render children until we know the auth state
  if (authState.initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
          }
        } else {
          // User is signed out
          if (isMounted) {
            setAuthState({
              user: null,
              loading: false,
              initialLoading: false,
              error: null,
              isOffline: false
            });
            
            // If on protected route, redirect to login
            if (location.pathname.startsWith('/interviewer') || 
                location.pathname.startsWith('/interviewee') ||
                location.pathname.startsWith('/dashboard')) {
              navigate('/login', { state: { from: location }, replace: true });
            }
          }
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        if (isMounted) {
          setAuthState({
            user: null,
            loading: false,
            initialLoading: false,
            error: getFirebaseErrorMessage(error.code || 'unknown'),
            isOffline: error.code === 'unavailable' || error.code === 'failed-precondition'
          });
        }
      }
    };
    
    // Set initial loading state
    setAuthState(prev => ({
      ...prev,
      loading: true,
      initialLoading: true
    }));
    
    // Set a timeout to ensure loading state is cleared
    authCheckTimeout = setTimeout(() => {
      if (isMounted) {
        console.warn('Auth state check timeout reached');
        setAuthState(prev => ({
          ...prev,
          loading: false,
          initialLoading: false,
          error: 'Connection timeout. Please check your internet connection.'
        }));
      }
    }, 5000); // 5 second timeout for initial auth check
    
    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(authCheckTimeout);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigate, location, authState.initialLoading]);

  // Login with email/password
  const login = useCallback(async (email, password, rememberMe = false) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      // Set persistence based on remember me
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get user data from Firestore
      let userData = { role: 'interviewee' };
      let isOffline = false;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          userData = userDoc.data();
        }
      } catch (error) {
        console.warn('Error fetching user data:', error);
        isOffline = error.code === 'unavailable';
      }
      
      const currentUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || userData.displayName || user.email?.split('@')[0] || 'User',
        photoURL: user.photoURL || userData.photoURL || '',
        role: userData.role || 'interviewee',
        isOffline,
        ...userData
      };
      
      setAuthState({
        user: currentUser,
        loading: false,
        error: null,
        isOffline
      });
      
      return { success: true, user: currentUser };
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  // Memoize the auth context value to prevent unnecessary re-renders
  const authContextValue = useMemo(() => ({
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    isOffline: authState.isOffline,
    initialLoading: authState.initialLoading,
    login,
    signup: () => {},
    signInWithGoogle: () => {},
    logout: () => {},
    clearError: () => {},
    updateProfile: () => {}
  }), [
    authState.user,
    authState.loading,
    authState.error,
    authState.isOffline,
    authState.initialLoading,
    login
  ]);

  // Don't render children until we know the auth state
  if (authState.initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Sign up with email/password
  const signup = useCallback(async ({ email, password, fullName, role, phoneNumber }) => {
      try {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));
        
        // Create user with email/password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update profile with display name
        await updateProfile(userCredential.user, { displayName: fullName });
        
        // Prepare user data for Firestore
        const userData = {
          email,
          displayName: fullName,
          role: role || 'interviewee',
          phoneNumber: phoneNumber || '',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        // Save to Firestore
        try {
          await updateUserData(userCredential.user, userData);
        } catch (error) {
          console.warn('Error saving user data to Firestore:', error);
          // Continue even if Firestore save fails (offline mode)
        }
        
        const currentUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: fullName,
          photoURL: userCredential.user.photoURL || '',
          role: role || 'interviewee',
          isOffline: false,
          ...userData
        };
        
        setAuthState(prev => ({
          ...prev,
          user: currentUser,
          loading: false,
          error: null,
          isOffline: false
        }));
        
        return { success: true, user: currentUser };
      } catch (error) {
        const errorMessage = getFirebaseErrorMessage(error.code);
        setAuthState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false
        }));
        return { success: false, error: errorMessage };
      }
    },
    
  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Prepare user data for Firestore
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString()
      };
        
        // Save to Firestore
        try {
          await updateUserData(user, userData);
        } catch (error) {
          console.warn('Error saving Google user data to Firestore:', error);
          // Continue even if Firestore save fails (offline mode)
        }
        
        const currentUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL || '',
          role: 'interviewee', // Default role for Google sign-in
          isOffline: false,
          ...userData
        };
        
        setAuthState(prev => ({
          ...prev,
          user: currentUser,
          loading: false,
          error: null,
          isOffline: false
        }));
        
        return { success: true, user: currentUser };
      } catch (error) {
        const errorMessage = getFirebaseErrorMessage(error.code);
        setAuthState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false
        }));
        return { success: false, error: errorMessage };
      }
    },
    
    // Logout
    logout: async () => {
      try {
        await firebaseSignOut(auth);
        setAuthState({
          user: null,
          loading: false,
          error: null,
          initialLoading: false,
          isOffline: false
        });
        return { success: true };
      } catch (error) {
        const errorMessage = getFirebaseErrorMessage(error.code);
        setAuthState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false
        }));
        return { success: false, error: errorMessage };
      }
    },
    
    // Clear error
    clearError: () => setAuthState(prev => ({ ...prev, error: null })),
    
    // Update user profile
    updateProfile: async (updates) => {
      try {
        if (!authState.user) {
          throw new Error('No user is currently logged in');
        }
        
        // Update in Firebase Auth
        if (updates.displayName || updates.photoURL) {
          await updateProfile(auth.currentUser, {
            displayName: updates.displayName,
            photoURL: updates.photoURL
          });
        }
        
        // Update in Firestore
        try {
          await updateUserData(auth.currentUser, updates);
        } catch (error) {
          console.warn('Error updating user data in Firestore:', error);
          // Continue even if Firestore update fails (offline mode)
        }
        
        // Update local state
        const updatedUser = {
          ...authState.user,
          ...updates,
          displayName: updates.displayName || authState.user.displayName,
          photoURL: updates.photoURL || authState.user.photoURL
        };
        
        setAuthState(prev => ({
          ...prev,
          user: updatedUser
        }));
        
        return { success: true, user: updatedUser };
      } catch (error) {
        const errorMessage = error.message || 'Failed to update profile';
        setAuthState(prev => ({
          ...prev,
          error: errorMessage
        }));
        return { success: false, error: errorMessage };
      }
    }
  }), [authState.user, authState.loading, authState.error, authState.initialLoading, authState.isOffline]);

  // Don't render children until we know the auth state
  if (authState.initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  auth, 
  signInWithEmail, 
  signUpWithEmail, 
  resetPassword,
  signInWithGoogle 
} from '../firebase/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

export const FirebaseContext = createContext({});

export function FirebaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, error: error.message };
    }
  };

  // Email/Password Authentication
  const loginWithEmail = useCallback(async (email, password) => {
    return await signInWithEmail(email, password);
  }, []);

  const registerWithEmail = useCallback(async (email, password) => {
    return await signUpWithEmail(email, password);
  }, []);

  const resetUserPassword = useCallback(async (email) => {
    return await resetPassword(email);
  }, []);

  // Google sign-in function
  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithGoogle();
      return { user: result.user, error: null };
    } catch (error) {
      console.error('Error signing in with Google:', error);
      return { user: null, error: error.message };
    }
  }, []);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    // Authentication methods
    signOut,
    loginWithEmail,
    registerWithEmail,
    resetUserPassword,
    loginWithGoogle
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default FirebaseContext;

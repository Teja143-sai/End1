import { createContext, useContext, useState, useCallback } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const RecoveryContext = createContext(null);

export const RecoveryProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Update recovery email
  const updateRecoveryEmail = useCallback(async (newRecoveryEmail) => {
    try {
      if (!auth.currentUser) {
        throw new Error('User not authenticated');
      }
      
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      
      // Update in Firestore
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        recoveryEmail: newRecoveryEmail,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      setSuccess('Recovery email updated successfully');
      return { success: true };
    } catch (error) {
      console.error('Error updating recovery email:', error);
      const errorMessage = error.message || 'Failed to update recovery email';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Update phone number
  const updatePhoneNumber = useCallback(async (newPhoneNumber) => {
    try {
      if (!auth.currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Format phone number if needed
      const formattedPhoneNumber = newPhoneNumber.startsWith('+') ? newPhoneNumber : `+${newPhoneNumber}`;
      
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      
      // Update in Firestore
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        phoneNumber: formattedPhoneNumber,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      setSuccess('Phone number updated successfully');
      return { success: true };
    } catch (error) {
      console.error('Error updating phone number:', error);
      const errorMessage = error.message || 'Failed to update phone number';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear messages
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return (
    <RecoveryContext.Provider
      value={{
        updateRecoveryEmail,
        updatePhoneNumber,
        isLoading,
        error,
        success,
        clearMessages
      }}
    >
      {children}
    </RecoveryContext.Provider>
  );
};

export const useRecovery = () => {
  const context = useContext(RecoveryContext);
  if (!context) {
    throw new Error('useRecovery must be used within a RecoveryProvider');
  }
  return context;
};

export default RecoveryContext;

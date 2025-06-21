import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  try {
    // Try to read a test document
    const testRef = doc(db, 'test', 'connection');
    const docSnap = await getDoc(testRef);
    
    if (docSnap.exists()) {
      console.log('Firebase connection successful! Document data:', docSnap.data());
    } else {
      console.log('Firebase connection successful! No test document found, but connection is working.');
    }
    return true;
  } catch (error) {
    console.error('Firebase connection error:', error);
    return false;
  }
};

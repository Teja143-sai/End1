import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  updateDoc,
  addDoc,
  serverTimestamp,
  enableIndexedDbPersistence,
  initializeFirestore
} from 'firebase/firestore';
import firebaseConfig from './config';

// Debug log the config (without sensitive data)
console.log('Initializing Firebase with config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '***' : 'MISSING',
  databaseURL: firebaseConfig.databaseURL || 'MISSING',
  projectId: firebaseConfig.projectId || 'MISSING'
});

// Validate required Firebase config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('Missing required Firebase configuration. Please check your config.js file.');
  throw new Error('Missing required Firebase configuration');
}

// Initialize Firebase
let app;
let auth;
let db;
let isOffline = false;

// Initialize Firebase app
if (!getApps().length) {
  try {
    console.log('Initializing Firebase app...');
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized');

    // Initialize Auth
    auth = getAuth(app);
    
    // Initialize Firestore with enhanced settings
    try {
      db = initializeFirestore(app, {
        experimentalForceLongPolling: true,
        useFetchStreams: false,
        experimentalAutoDetectLongPolling: true,
        ignoreUndefinedProperties: true,
        cacheSizeBytes: 40 * 1024 * 1024 // 40MB cache size
      });

      // Set up offline persistence with better error handling
      if (typeof window !== 'undefined') {
        const persistencePromise = enableIndexedDbPersistence(db, {
          forceOwnership: false
        });
        
        persistencePromise.catch((err) => {
          if (err.code === 'failed-precondition') {
            console.warn('Offline persistence failed: Multiple tabs open. Only one tab can have persistence enabled at a time.');
          } else if (err.code === 'unimplemented') {
            console.warn('Offline persistence not supported in this browser.');
          } else {
            console.error('Error enabling offline persistence:', err);
          }
        });
      }
      console.log('Firestore initialized with persistence');
    } catch (firestoreError) {
      console.error('Error initializing Firestore:', firestoreError);
      // Fallback to default Firestore initialization
      db = getFirestore(app);
      console.log('Using default Firestore initialization');
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error; // Rethrow to prevent app from starting with broken Firebase
  }
} else {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('Using existing Firebase app instance');
}

// Set up connection state listener
const onConnectionChange = (isConnected) => {
  isOffline = !isConnected;
  console.log(`Network status: ${isConnected ? 'online' : 'offline'}`);
};

// Set up connection state listener
if (typeof window !== 'undefined') {
  // Initial connection state
  onConnectionChange(navigator.onLine);
  
  // Listen for connection changes
  window.addEventListener('online', () => onConnectionChange(true));
  window.addEventListener('offline', () => onConnectionChange(false));
}

// Configure Google Sign-In
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Google Sign-In
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return { success: false, error: error.message };
  }
};

// Email/Password Authentication
const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Firestore helper functions
const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding document:', error);
    return { success: false, error: error.message };
  }
};

const updateDocument = async (collectionName, id, data) => {
  try {
    await updateDoc(doc(db, collectionName, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating document:', error);
    return { success: false, error: error.message };
  }
};

const getDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};

const getDocuments = async (collectionName, conditions = []) => {
  try {
    let q = query(collection(db, collectionName));
    
    // Apply conditions if any
    if (conditions.length > 0) {
      q = query(q, ...conditions);
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
};

// Export the services
export { 
  app,
  auth,
  db,
  isOffline,
  googleProvider,
  signInWithEmail,
  signInWithGoogle, // Export the new function
  signUpWithEmail,
  resetPassword,
  addDocument,
  updateDocument,
  getDocument,
  getDocuments,
  serverTimestamp,
  signInWithPopup,
  GoogleAuthProvider
};

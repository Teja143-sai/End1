// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATlNEyCJxC2HWyxQ26YXh_W3Bz7Whcwpc",
  authDomain: "ri-interviews-5901d.firebaseapp.com",
  databaseURL: "https://ri-interviews-5901d.firebaseio.com",
  projectId: "ri-interviews-5901d",
  storageBucket: "ri-interviews-5901d.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "89486500258",
  appId: "1:89486500258:web:e6f6f57b4121e647b212fb",
  measurementId: "G-26WQVXZKF8"
};

// Validate configuration
if (!firebaseConfig.projectId) {
  console.error('Firebase configuration is missing projectId');
}

if (!firebaseConfig.apiKey) {
  console.error('Firebase configuration is missing apiKey');
}

export default firebaseConfig;

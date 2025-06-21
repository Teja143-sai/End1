import { useEffect, useState } from 'react';
import { testFirebaseConnection } from '../firebase/testConnection';

const FirebaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [authStatus, setAuthStatus] = useState('Checking...');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Test Firestore connection
    const testConnection = async () => {
      try {
        const isConnected = await testFirebaseConnection();
        setConnectionStatus(isConnected ? '✅ Connected to Firebase' : '❌ Connection failed');
      } catch (err) {
        setConnectionStatus('❌ Connection error');
        setError(err.message);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Firebase Connection Test</h1>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Firestore Connection:</h2>
            <p className={connectionStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}>
              {connectionStatus}
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h2 className="font-semibold text-red-700 mb-2">Error Details:</h2>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="p-4 border rounded-lg bg-gray-50 mt-4">
            <h2 className="font-semibold mb-2">Firebase Configuration:</h2>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify({
                apiKey: "AIzaSyATlNEyCJxC2HWyxQ26YXh_W3Bz7Whcwpc",
                authDomain: "ri-interviews-5901d.firebaseapp.com",
                projectId: "ri-interviews-5901d"
              }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseTest;

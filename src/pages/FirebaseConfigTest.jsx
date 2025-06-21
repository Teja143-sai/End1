import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

const FirebaseConfigTest = () => {
  const [config, setConfig] = useState(null);
  const [authConfig, setAuthConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get Firebase config
    try {
      const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'Not set in .env',
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'Not set in .env',
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Not set in .env',
      };
      setConfig(config);

      // Get Auth config
      if (auth) {
        setAuthConfig({
          currentUser: auth.currentUser ? 'Authenticated' : 'Not authenticated',
          tenantId: auth.tenantId || 'Not set',
          config: auth.config || 'Not available',
        });
      }
    } catch (err) {
      console.error('Error getting config:', err);
      setError(err.message);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Firebase Configuration Test</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>Error: {error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Firebase Config</h2>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Auth State</h2>
            <div className="bg-gray-100 p-4 rounded">
              {authConfig ? (
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(authConfig, null, 2)}
                </pre>
              ) : (
                <p>Loading auth state...</p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Troubleshooting Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>Check if the Firebase project ID matches in your config and console</li>
              <li>Verify that Email/Password authentication is enabled in Firebase Console</li>
              <li>Ensure your domain is in the authorized domains list in Firebase Console</li>
              <li>Check browser console for any additional error messages</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseConfigTest;

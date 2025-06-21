import { useState, useEffect, useCallback, lazy, Suspense, useMemo } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { RecoveryProvider } from './contexts/RecoveryContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './firebase/firebase'; // Initialize Firebase
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import SplashScreen from './components/SplashScreen';
// Using a simple test page for debugging
import TestPage from './components/TestPage';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const Features = lazy(() => import('./pages/Features'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Pricing = lazy(() => import('./pages/Pricing'));
const SettingsPage = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./components/NotFound'));
const Profile = lazy(() => import('./components/Profile'));

// Lazy load the ColorSwatch component for development
const ColorSwatch = lazy(() => import('./components/ColorSwatch'));

// Main App component with AuthProvider
function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <FirebaseProvider>
        <AuthProvider>
          <RecoveryProvider>
            <LanguageProvider>
              <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
                {showSplash ? <SplashScreen /> : <AppContent />}
              </div>
            </LanguageProvider>
          </RecoveryProvider>
        </AuthProvider>
      </FirebaseProvider>
    </ThemeProvider>
  );
}

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading application...</p>
    </div>
  </div>
);

// Separate component that uses hooks with error boundary
function AppContent() {
  // State hooks
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  
  // Navigation and auth hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    isInitialLoading, 
    user, 
    logout, 
    loading, 
    error: authError 
  } = useAuth();
  
  // Handle retry
  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);
  
  // Show error if authentication fails
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu on window resize (if resized to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Check if current page is an auth page
  const isAuthPage = useMemo(() => 
    ['/login', '/signup', '/forgot-password'].includes(location.pathname),
    [location.pathname]
  );
  
  // Check if current page is a dashboard page
  const isDashboardPage = useMemo(() => {
    const path = location.pathname;
    return path.startsWith('/interviewer') || 
           path.startsWith('/interviewee') ||
           path.startsWith('/dashboard') ||
           path === '/profile' ||
           path === '/settings';
  }, [location.pathname]);
  
  // Debug: Log current path and user info
  useEffect(() => {
    console.log('Current path:', location.pathname);
    if (user) {
      console.log('User:', user);
    }
  }, [location.pathname, user]);
  
  // Show loading states
  if (isInitialLoading || loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error || 'An unexpected error occurred'}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDashboardPage ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-900'} transition-colors duration-200`}>
      {!isAuthPage && !isDashboardPage && (
        <Navbar 
          isMobileMenuOpen={isMobileMenuOpen} 
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      )}
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <Routes location={location} key={location.pathname}>
              {/* Public routes with restricted access */}
              <Route path="/login" element={
                <PublicRoute restricted>
                  <Login />
                </PublicRoute>
              } />
              
              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />
              
              <Route path="/forgot-password" element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              } />
              
              {/* Public Routes */}
              <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
              <Route path="/features" element={<PublicRoute><Features /></PublicRoute>} />
              <Route path="/how-it-works" element={<PublicRoute><HowItWorks /></PublicRoute>} />
              <Route path="/pricing" element={<PublicRoute><Pricing /></PublicRoute>} />
              
              {/* Settings Page */}
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              
              {/* Protected routes */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Not Found */}
              <Route path="*" element={
                <PublicRoute>
                  <NotFound />
                </PublicRoute>
              } />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      
      {!isAuthPage && !isDashboardPage && location.pathname !== '/settings' && <Footer />}
      
      {/* Toast Notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;

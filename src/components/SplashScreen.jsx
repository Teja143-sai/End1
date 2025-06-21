import { motion, AnimatePresence } from 'framer-motion';
import RILogo from '../assets/RILogo';
import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Error fallback component for error boundary
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="text-center p-4 bg-red-500/10 rounded-lg">
    <p className="text-red-400 font-medium">Something went wrong</p>
    <pre className="text-sm text-red-300">{error.message}</pre>
    <button 
      onClick={resetErrorBoundary}
      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
    >
      Try again
    </button>
  </div>
);

const SplashScreen = () => {
  const [showSkip, setShowSkip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    let timer;
    let redirectTimer;

    const handleNavigation = () => {
      try {
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Navigation error:', error);
      }
    };

    // Simulate loading of assets
    const loadAssets = async () => {
      try {
        // Add any asset preloading here if needed
        // Show skip button after 2 seconds
        timer = setTimeout(() => isMounted && setShowSkip(true), 2000);
        // Navigate after 5 seconds (allows all animations to complete)
        redirectTimer = setTimeout(handleNavigation, 5000);
      } catch (error) {
        console.error('Error loading assets:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadAssets();
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const textVariants = (delay = 0) => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay,
        type: 'spring',
        stiffness: 100,
      },
    },
  });

  // Optimized background animation using CSS
  const BackgroundAnimation = () => (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 1],
            x: `${(Math.random() - 0.5) * 100}px`,
            y: `${(Math.random() - 0.5) * 100}px`,
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );

  // Skip button component
  const SkipButton = () => (
    <AnimatePresence>
      {showSkip && (
        <motion.button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          aria-label="Skip to main content"
        >
          Skip
        </motion.button>
      )}
    </AnimatePresence>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative"
        role="status"
        aria-live="polite"
        aria-label="Loading application"
      >
        <BackgroundAnimation />
        <SkipButton />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 text-center max-w-2xl mx-auto w-full"
          role="region"
          aria-label="Splash screen content"
        >
          <motion.div
            className="flex flex-col items-center justify-center space-y-6 p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl w-full"
            variants={logoVariants}
          >
            <motion.div
              className="relative"
              variants={textVariants(0.2)}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <RILogo size={120} darkMode={true} className="mx-auto" />
            </motion.div>
            
            <motion.p 
              className="text-lg text-gray-300 max-w-md"
              variants={textVariants(0.6)}
            >
              Sharpen Your Interview Skills, Anytime, Anywhere.
            </motion.p>
            
            <motion.div 
              className="w-24 h-1.5 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full my-4"
              variants={textVariants(0.8)}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            
            <motion.div 
              className="mt-6"
              variants={textVariants(1)}
            >
              <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-teal-400 to-purple-400"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {showSkip && (
          <motion.button
            onClick={() => navigate('/')}
            className="absolute bottom-8 right-8 px-6 py-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-md transition-all duration-300 border border-white/20 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Skip introduction"
          >
            Skip Intro
          </motion.button>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default SplashScreen;

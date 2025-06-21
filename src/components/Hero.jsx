import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useState, useEffect } from 'react';

const Hero = () => {
  const { t, language } = useTranslation();
  const [titleKey, setTitleKey] = useState(0);
  
  // Force re-render when language changes
  useEffect(() => {
    console.log('Language changed to:', language);
    // Update the key to force re-render
    setTitleKey(prev => prev + 1);
  }, [language]);
  
  // Debug: Log when component renders
  console.log('Rendering Hero with language:', language);
  
  // Get title parts with proper language handling
  const getTitleParts = () => {
    try {
      const title = t('hero.title', { anytime: 'Anytime', anywhere: 'Anywhere' });
      return title.split(/(Anytime|Anywhere)/);
    } catch (error) {
      console.error('Translation error:', error);
      return ['Interview Prep Platform'];
    }
  };
  
  const titleParts = getTitleParts();
  return (
    <div key={`hero-${titleKey}`}>

    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-garamond font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {titleParts.map((part, index) => {
                if (part === 'Anytime' || part === 'Anywhere') {
                  return <span key={index} className="text-primary">{part}</span>;
                }
                return part;
              })}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400,
                  damping: 17,
                  mass: 0.5
                }}
                className="relative"
              >
                <Link
                  to="/signup"
                  className="relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-primary to-primary/90 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 overflow-hidden group"
                >
                  <span className="relative z-10">{t('hero.ctaPrimary')}</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{ willChange: 'transform' }}
                  />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.97,
                  transition: { duration: 0.1 }
                }}
                className="relative"
              >
                <Link
                  to="/how-it-works"
                  className="relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-primary bg-white border-2 border-primary/20 rounded-lg hover:border-primary/40 hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 group"
                  style={{ willChange: 'transform, border-color, background-color' }}
                >
                  <span className="relative z-10 flex items-center">
                    {t('hero.ctaSecondary')}
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ 
                        x: 4,
                        transition: { 
                          type: 'spring',
                          stiffness: 500,
                          damping: 15
                        } 
                      }}
                      className="ml-2 inline-block"
                      style={{ willChange: 'transform' }}
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative z-10 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700/50 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Live Mock Interviews</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Practice with real people in real-time</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/30 dark:bg-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 dark:opacity-30 animate-blob"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 dark:bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 right-20 w-20 h-20 bg-yellow-100 dark:bg-yellow-200/10 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
          </motion.div>
        </div>
      </div>
      
    </section>
    </div>
  );
}

export default Hero

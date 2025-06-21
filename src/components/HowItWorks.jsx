import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    id: 1,
    title: 'Create Your Profile',
    description: 'Sign up in 30 seconds and set your interview preferences, skills, and availability.',
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Match with Interviewers',
    description: 'Get paired with experienced professionals based on your target role and industry.',
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Practice & Get Feedback',
    description: 'Conduct mock interviews and receive detailed, actionable feedback to improve.',
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Ace Your Interview',
    description: 'Go into your real interviews with confidence and land your dream job!',
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  }
];

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

const iconContainerVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1,
    rotate: [0, -10, 10, -5, 5, 0],
    transition: { 
      duration: 0.6,
      rotate: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
    }
  }
};

const HowItWorks = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center z-10"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <motion.h2 
                className="text-2xl font-bold text-gray-900"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                How It Works
              </motion.h2>
              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6" />
              </motion.button>
            </motion.div>
            
            <div className="p-6 md:p-8 overflow-hidden">
              <AnimatePresence>
                <motion.div 
                  className="space-y-10"
                  initial="hidden"
                  animate="visible"
                >
                  {steps.map((step, index) => (
                    <motion.div 
                      key={step.id} 
                      className="flex group relative"
                      custom={index}
                      variants={stepVariants}
                      layoutId={`step-${step.id}`}
                      whileHover={{ x: 10 }}
                      onHoverStart={() => setActiveStep(index)}
                    >
                      <motion.div 
                        className="flex flex-col items-center"
                        layoutId={`connector-${step.id}`}
                      >
                        <motion.div 
                          className={`flex items-center justify-center w-16 h-16 rounded-full ${activeStep === index ? 'bg-primary/10 scale-110' : 'bg-blue-50'} text-primary transition-all duration-300`}
                          variants={iconContainerVariants}
                          initial="initial"
                          whileHover="hover"
                          animate={activeStep === index ? "hover" : "initial"}
                        >
                          {step.icon}
                        </motion.div>
                        {index < steps.length - 1 && (
                          <motion.div 
                            className="w-0.5 h-full bg-gradient-to-b from-primary/20 to-transparent mt-4"
                            initial={{ scaleY: 0, originY: 0 }}
                            animate={{ 
                              scaleY: 1,
                              transition: { 
                                delay: 0.2 + (index * 0.1),
                                duration: 0.5 
                              } 
                            }}
                          />
                        )}
                      </motion.div>
                      <motion.div 
                        className="ml-6 pb-10"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ 
                          x: 0, 
                          opacity: 1,
                          transition: { 
                            delay: 0.1 + (index * 0.1),
                            duration: 0.5 
                          } 
                        }}
                      >
                        <motion.h3 
                          className={`text-xl font-semibold mb-2 ${activeStep === index ? 'text-primary' : 'text-gray-900'}`}
                          layoutId={`title-${step.id}`}
                        >
                          {step.title}
                        </motion.h3>
                        <motion.p 
                          className="text-gray-600"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            transition: { 
                              delay: 0.2 + (index * 0.1),
                              duration: 0.5 
                            } 
                          }}
                        >
                          {step.description}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
              
              <motion.div 
                className="mt-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.5,
                    duration: 0.5 
                  } 
                }}
              >
                <motion.button
                  onClick={onClose}
                  className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Get Started</span>
                  <motion.span 
                    className="absolute inset-0 bg-white/10 group-hover:bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HowItWorks;

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  UserIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ isMobileMenuOpen = false, toggleMobileMenu = () => {} }) => {
  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  
  // Refs
  const dropdownRef = useRef(null);
  
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout || (() => {});

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'How It Works', to: '/how-it-works' },
    { name: 'Features', to: '/features' },
    { name: 'Pricing', to: '/pricing' },
  ];
  
  // Mobile menu links (same as desktop for now, no dashboard link)
  const mobileLinks = [...navLinks];
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    hover: {
      y: -2,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.97 }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { 
        type: 'spring', 
        stiffness: 400,
        damping: 10
      } 
    },
    tap: { 
      scale: 0.97,
      transition: { 
        type: 'spring', 
        stiffness: 300,
        damping: 15
      } 
    }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center"
              onClick={(e) => {
                // If we're already on the home page, prevent default to avoid unnecessary navigation
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  // Scroll to top with faster speed
                  // Instant scroll to top
                  window.scrollTo({ top: 0, behavior: 'auto' });
                }
              }}
            >
              <span className="text-2xl font-serif font-bold text-primary hover:text-primary/80 transition-colors">
                RI Connect
              </span>
            </Link>
          </div>
          
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                variants={navItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to={link.to}
                  className={`relative text-sm font-medium group transition-colors ${
                    location.pathname === link.to
                      ? 'text-primary font-semibold'
                      : (isScrolled ? 'text-gray-700' : 'text-gray-800') + ' hover:text-primary/90'
                  }`}
                >
                  {link.name}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: location.pathname === link.to ? '100%' : 0,
                      backgroundColor: location.pathname === link.to ? '#0d9488' : '#0d9488'
                    }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'User'} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700 group-hover:text-primary">
                    {user.displayName?.split(' ')[0] || 'Profile'}
                  </span>
                  <ChevronDownIcon 
                    className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} 
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10, transition: { duration: 0.15 } }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm text-gray-900 font-medium">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <UserIcon className="h-4 w-4 mr-3 text-gray-400" />
                          Your Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <ChartBarIcon className="h-4 w-4 mr-3 text-gray-400" />
                          Dashboard
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Cog6ToothIcon className="h-4 w-4 mr-3 text-gray-400" />
                          Settings
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center"
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.div
                  variants={navItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <Link
                    to="/login"
                    className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center border bg-white ${
                      isScrolled 
                        ? 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50' 
                        : 'border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-white/90 shadow-sm'
                    }`}
                  >
                    <span>Sign In</span>
                    <ChevronRightIcon className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </motion.div>
                <motion.div
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative"
                >
                  <Link
                    to="/signup"
                    className="relative px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center"
                  >
                    <span>Sign Up</span>
                    <ChevronRightIcon className="ml-1.5 h-3.5 w-3.5 text-white/90" />
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
          
          <motion.div 
            className="md:hidden flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {user ? (
              <motion.div 
                className="flex items-center"
                variants={navItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.button
                  onClick={handleLogout}
                  className="p-2 text-gray-700 hover:text-red-600 rounded-full"
                  aria-label="Sign out"
                  variants={buttonVariants}
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center space-x-2"
                variants={navItemVariants}
              >
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-primary rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="px-4 py-1.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-teal-600 transition-colors shadow-md"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </motion.div>
            )}
            <motion.button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white`}
      >
        <div className="pt-2 pb-3 space-y-1 px-4">
          {mobileLinks.map((link) => (
            link.name === 'How It Works' ? (
              <button
                key={`mobile-${link.name}`}
                onClick={() => {
                  toggleMobileMenu();
                  setIsHowItWorksOpen(true);
                }}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={`mobile-${link.name}`}
                to={link.to}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={toggleMobileMenu}
              >
                {link.name}
              </Link>
            )
          ))}
          {!user && (
            <>
              <Link
                to="/login"
                className="block w-full text-left px-3 py-2 text-base font-medium text-primary hover:bg-gray-50 rounded-md"
                onClick={toggleMobileMenu}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={`block w-full text-left px-3 py-2 text-base font-medium text-white bg-primary hover:bg-teal-700 rounded-md mt-2 ${!isScrolled ? 'shadow-lg' : ''}`}
                onClick={toggleMobileMenu}
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Navbar

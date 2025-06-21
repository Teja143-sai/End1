import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import RILogo from '../assets/RILogo';

const Navbar = ({ isMobileMenuOpen = false, toggleMobileMenu = () => {} }) => {
  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    // Load notification preference from localStorage or default to true
    const saved = localStorage.getItem('notificationsEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your interview preparation is 75% complete', time: '2h ago', read: false },
    { id: 2, text: 'New practice questions added', time: '1d ago', read: true },
    { id: 3, text: 'Weekly progress report available', time: '3d ago', read: true },
  ]);
  const { theme, toggleTheme } = useTheme();
  
  // Save notification preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);
  
  // Toggle notifications
  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    
    // If turning off notifications, close the notifications panel
    if (!newState) {
      setIsNotificationsOpen(false);
    }
  }; 
  
  // Refs
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth() || {};

  // Theme is now handled by ThemeContext
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Mark notifications as read when dropdown is opened
  const handleNotificationsClick = () => {
    if (!isNotificationsOpen && hasUnread) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setHasUnread(false);
    }
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  }; 
  
  // Close notifications when profile is opened
  useEffect(() => {
    if (isProfileOpen) {
      setIsNotificationsOpen(false);
    }
  }, [isProfileOpen]);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'How It Works', to: '/how-it-works' },
    { name: 'Features', to: '/features' },
    { name: 'Pricing', to: '/pricing' },
  ];
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center group"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="flex items-center">
                <RILogo 
                  size={36} 
                  darkMode={theme === 'dark'} 
                  iconOnly={false}
                  className="transition-all duration-300 group-hover:scale-105"
                  animate={false}
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to 
                    ? 'text-primary font-semibold' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary/90 dark:hover:text-primary/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Notifications and Theme Toggle */}
            {user && (
              <div className="flex items-center space-x-1">
                {/* Theme Toggle with Animation */}
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 relative"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {theme === 'dark' ? (
                      <SunIcon className="h-5 w-5" />
                    ) : (
                      <MoonIcon className="h-5 w-5" />
                    )}
                  </motion.div>
                  {/* Hidden element to maintain button size during animation */}
                  <div className="invisible">
                    <SunIcon className="h-5 w-5" />
                  </div>
                </motion.button>
                
                {/* Notifications Container */}
                <div className="relative" ref={notificationRef}>
                  <div className="flex items-center">
                    <button
                      onClick={handleNotificationsClick}
                      className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 relative"
                      aria-label="Notifications"
                      aria-expanded={isNotificationsOpen}
                    >
                      <BellIcon className="h-5 w-5" />
                      {hasUnread && (
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                      )}
                    </button>
                    {!notificationsEnabled && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-6 h-0.5 bg-gray-400 dark:bg-gray-600 transform rotate-45 origin-center"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Notifications Dropdown */}
                  <AnimatePresence>
                    {isNotificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed right-4 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black dark:ring-white/10 ring-opacity-5 z-50 overflow-hidden"
                        style={{ top: '80px' }}
                      >
                        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Notifications</h3>
                            <button 
                              className="text-sm text-primary hover:text-primary/80"
                              onClick={() => setNotifications([])}
                            >
                              Clear all
                            </button>
                          </div>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div 
                                key={notification.id} 
                                className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 ${
                                  !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                }`}
                              >
                                <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-6 text-center">
                              <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications</p>
                            </div>
                          )}
                        </div>
                        {notifications.length > 0 && (
                          <div className="p-3 border-t border-gray-100 dark:border-gray-700 text-center">
                            <button className="text-sm text-primary hover:text-primary/80">
                              View all notifications
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
            
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
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
                  <ChevronDownIcon 
                    className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${
                      isProfileOpen ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black dark:ring-white/10 ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        {/* User Info Section */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                {user.photoURL ? (
                                  <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                  <UserIcon className="h-5 w-5 text-primary" />
                                )}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {user.displayName || 'User'}
                              </p>
                              <div className="flex items-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {user.email}
                                </p>
                                {user.emailVerified && (
                                  <span className="ml-1.5 inline-flex items-center text-xs text-green-600 dark:text-green-400">
                                    ✓
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center mt-1">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  Free Plan
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">12</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Interviews</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">8</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">2</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming</p>
                            </div>
                          </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="py-1">
                          <Link
                            to="/settings#profile"
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <UserIcon className="h-4 w-4 mr-3 text-gray-400" />
                            My Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Cog6ToothIcon className="h-4 w-4 mr-3 text-gray-400" />
                            Settings
                          </Link>
                          <Link
                            to="/subscription"
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <svg className="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Subscription
                          </Link>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                        
                        {/* Notification Toggle */}
                        <div className="px-4 py-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <BellIcon className={`h-4 w-4 mr-3 ${
                                notificationsEnabled ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
                              }`} />
                              <span className="text-sm text-gray-700 dark:text-gray-200">Notifications</span>
                            </div>
                            <div className="relative inline-flex items-center h-5 w-9 rounded-full transition-colors duration-200 ease-in-out focus:outline-none"
                                 role="switch"
                                 aria-checked={notificationsEnabled}
                                 tabIndex={0}
                                 onClick={toggleNotifications}
                                 onKeyDown={(e) => e.key === ' ' && toggleNotifications()}
                            >
                              <span className={`${
                                notificationsEnabled 
                                  ? 'translate-x-4 bg-primary' 
                                  : 'translate-x-0.5 bg-gray-300 dark:bg-gray-600'
                              } inline-block w-4 h-4 transform rounded-full shadow-sm transition-transform duration-200 ease-in-out`} />
                            </div>
                          </div>
                        </div>

                        {/* Interview Readiness Indicator */}
                        <div className="px-4 py-2.5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-2.5 w-2.5 rounded-full bg-green-500 mr-3"></div>
                            <div className="w-full">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-gray-700 dark:text-gray-200">Interview Ready</span>
                                <span className="text-gray-500">75%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                <div className="bg-green-600 h-1.5 rounded-full" style={{width: '75%'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

                        {/* Support & Help */}
                        <Link
                          to="/help"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg className="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Help & Support
                        </Link>
                        <Link
                          to="/feedback"
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg className="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          Send Feedback
                        </Link>
                        
                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center mt-1"
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3 text-red-400" />
                          Sign out
                        </button>
                        
                        {/* App Version */}
                        <div className="px-4 py-2 text-center">
                          <span className="text-xs text-gray-400">v1.0.0</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary/90 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.to
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50"
                    onClick={toggleMobileMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      toggleTheme();
                      toggleMobileMenu();
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 flex items-center"
                  >
                    {theme === 'dark' ? (
                      <SunIcon className="h-5 w-5 mr-2 text-gray-400" />
                    ) : (
                      <MoonIcon className="h-5 w-5 mr-2 text-gray-400" />
                    )}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  <button
                    onClick={async () => {
                      await handleLogout();
                      toggleMobileMenu();
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={toggleMobileMenu}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90"
                    onClick={toggleMobileMenu}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;

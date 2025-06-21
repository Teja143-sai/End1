import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Combobox, Listbox } from '@headlessui/react';
import { 
  PhotoIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ClockIcon,
  CalendarIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  BellIcon,
  BellSlashIcon,
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  PencilIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  QuestionMarkCircleIcon,
  CpuChipIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
  LanguageIcon,
  ServerStackIcon,
  ClockIcon as ClockIconSolid
} from '@heroicons/react/24/outline'; 

// Simple country and timezone data
const countryList = [
  { code: 'US', name: 'United States', emoji: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', emoji: '🇬🇧' },
  { code: 'IN', name: 'India', emoji: '🇮🇳' },
  { code: 'JP', name: 'Japan', emoji: '🇯🇵' },
  { code: 'DE', name: 'Germany', emoji: '🇩🇪' },
  { code: 'FR', name: 'France', emoji: '🇫🇷' },
  { code: 'BR', name: 'Brazil', emoji: '🇧🇷' },
  { code: 'CA', name: 'Canada', emoji: '🇨🇦' },
  { code: 'AU', name: 'Australia', emoji: '🇦🇺' },
  { code: 'MX', name: 'Mexico', emoji: '🇲🇽' },
];

const timezoneData = {
  'US': [
    { value: 'America/New_York', label: '(UTC-05:00) Eastern Time' },
    { value: 'America/Chicago', label: '(UTC-06:00) Central Time' },
    { value: 'America/Denver', label: '(UTC-07:00) Mountain Time' },
    { value: 'America/Los_Angeles', label: '(UTC-08:00) Pacific Time' },
  ],
  'GB': [
    { value: 'Europe/London', label: '(UTC+00:00) London' },
  ],
  'IN': [
    { value: 'Asia/Kolkata', label: '(UTC+05:30) India' },
  ],
  'JP': [
    { value: 'Asia/Tokyo', label: '(UTC+09:00) Tokyo' },
  ],
  'DE': [
    { value: 'Europe/Berlin', label: '(UTC+01:00) Berlin' },
  ],
  'FR': [
    { value: 'Europe/Paris', label: '(UTC+01:00) Paris' },
  ],
  'BR': [
    { value: 'America/Sao_Paulo', label: '(UTC-03:00) Brasilia' },
  ],
  'CA': [
    { value: 'America/Toronto', label: '(UTC-05:00) Eastern Time' },
    { value: 'America/Vancouver', label: '(UTC-08:00) Pacific Time' },
  ],
  'AU': [
    { value: 'Australia/Sydney', label: '(UTC+10:00) Sydney' },
  ],
  'MX': [
    { value: 'America/Mexico_City', label: '(UTC-06:00) Central Time' },
  ]
};

// Context hooks
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useRecovery } from '../contexts/RecoveryContext';
import { useLanguage } from '../contexts/LanguageContext';

// Image cropper component has been removed as requested

export default function Settings() {
  // Auth context
  const { 
    user, 
    updateProfile, 
    updateEmail, 
    updatePassword,
    deactivateAccount,
    deleteAccount,
    logout
  } = useAuth();
  
  // Theme context
  const { 
    theme, 
    toggleTheme,
    accentColor,
    updateAccentColor,
    fontSize,
    updateFontSize,
    fontSizes,
    uiDensity,
    updateDensity,
    uiDensities
  } = useTheme();
  
  // Language context
  const { 
    language: currentLanguage, 
    languages, 
    changeLanguage, 
    formatDate, 
    formatNumber,
    formatCurrency
  } = useLanguage();
  
  // Recovery context
  const { 
    updateRecoveryEmail,
    updatePhoneNumber,
    isLoading: recoveryLoading,
    error: recoveryError,
    success: recoverySuccess,
    clearMessages
  } = useRecovery();
  
  const navigate = useNavigate();
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('profile');
  
  // Security activity log state
  const [securityActivity, setSecurityActivity] = useState([]);
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);
  
  // Sample security activity data (replace with actual API call in production)
  const loadSecurityActivity = useCallback(async () => {
    try {
      setIsLoadingActivity(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Sample data - in a real app, this would come from your backend
      const sampleActivity = [
        {
          id: '1',
          type: 'login',
          description: 'Successful login from Chrome on Windows',
          timestamp: '2 minutes ago',
          ip: '192.168.1.1',
          location: 'San Francisco, CA',
        },
        {
          id: '2',
          type: 'password_change',
          description: 'Password changed successfully',
          timestamp: '1 hour ago',
          ip: '192.168.1.1',
          location: 'San Francisco, CA',
        },
        {
          id: '3',
          type: 'device_added',
          description: 'New device added: iPhone 13',
          timestamp: '2 days ago',
          ip: '10.0.0.1',
          location: 'New York, NY',
        },
        {
          id: '4',
          type: 'login',
          description: 'Login attempt from new location',
          timestamp: '1 week ago',
          ip: '203.0.113.45',
          location: 'Tokyo, Japan',
        },
      ];
      
      setSecurityActivity(sampleActivity);
    } catch (error) {
      console.error('Error loading security activity:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoadingActivity(false);
    }
  }, []);
  
  // Load security activity when component mounts and when active tab changes to 'account'
  useEffect(() => {
    if (activeTab === 'account') {
      loadSecurityActivity();
    }
  }, [activeTab, loadSecurityActivity]);
  
  // Password visibility state
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  // Region settings state
  const [regionSettings, setRegionSettings] = useState({
    country: 'US',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    firstDayOfWeek: 0, // 0 = Sunday, 1 = Monday
    temperatureUnit: 'celsius',
    measurementSystem: 'metric',
  });
  
  // Available options
  const weekStartsOn = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
  ];
  
  const temperatureUnits = [
    { value: 'celsius', label: '°C (Celsius)' },
    { value: 'fahrenheit', label: '°F (Fahrenheit)' },
  ];
  
  const measurementSystems = [
    { value: 'metric', label: 'Metric (kg, cm, km)' },
    { value: 'imperial', label: 'Imperial (lb, in, mi)' },
  ];
  
  // Get timezones for selected country
  const countryTimezones = useMemo(() => {
    if (!regionSettings.country) return [];
    return timezoneData[regionSettings.country] || [];
  }, [regionSettings.country]);
  
  // Handle region settings change
  const handleRegionChange = (field, value) => {
    setRegionSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Save region settings
  const saveRegionSettings = async () => {
    try {
      // Here you would typically save to your backend
      console.log('Saving region settings:', regionSettings);
      setSuccess('Region settings saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving region settings:', error);
      setError('Failed to save region settings');
      setTimeout(() => setError(''), 3000);
    }
  };
  
  // Profile picture state
  const [profileImage, setProfileImage] = useState(user?.photoURL || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const fileInputRef = useRef(null);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaved(false);
    
    try {
      setIsLoading(true);
      
      // Prepare profile data with basic information
      const profileData = {
        displayName: settings.displayName,
        phoneNumber: settings.phoneNumber || '',
        bio: settings.bio || '',
        role: selectedRole || ''
      };
      
      // Include profile picture if a new one was uploaded
      if (profileImage && profileImage.startsWith('data:image')) {
        // In a real app, you would upload the image here and get a URL
        // For now, we'll store the data URL directly
        profileData.photoURL = profileImage;
      }
      
      // Update profile with the combined data
      await updateProfile(profileData);
      
      // Update email if changed
      if (settings.email && settings.email !== user?.email) {
        await updateEmail(settings.email);
      }
      
      // Update password if new password provided
      if (settings.newPassword) {
        if (settings.newPassword !== settings.confirmPassword) {
          throw new Error('New passwords do not match');
        }
        await updatePassword(settings.newPassword);
      }
      
      // Show success message
      setSuccess('Profile updated successfully!');
      setSaved(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
      // Reset form state if needed
      if (settings.newPassword) {
        setSettings(prev => ({
          ...prev,
          newPassword: '',
          confirmPassword: ''
        }));
      }
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const settingsTabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'account', name: 'Account & Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'accessibility', name: 'Accessibility', icon: AdjustmentsHorizontalIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon },
    { id: 'language', name: 'Language', icon: LanguageIcon },
    { id: 'data', name: 'Data & Storage', icon: ServerStackIcon },
    { id: 'help', name: 'Help & Support', icon: QuestionMarkCircleIcon },
    { id: 'advanced', name: 'Advanced', icon: CpuChipIcon },
    { id: 'account-management', name: 'Account Management', icon: UserGroupIcon },
    { id: 'appearance', name: 'Appearance', icon: MoonIcon }
  ];
  
  // Redirect from old security tab to account tab if needed
  useEffect(() => {
    if (window.location.hash === '#security') {
      setActiveTab('account');
      window.history.replaceState(null, null, ' ');
    }
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [saved, setSaved] = useState(false);
  
  // Role selection state and options
  const [selectedRole, setSelectedRole] = useState(user?.role || '');
  const [queryRole, setQueryRole] = useState('');
  const roles = [
    'Student',
    'High School Student',
    'College Student',
    'Graduate Student',
    'Software Developer',
    'Web Developer',
    'UI/UX Designer',
    'Data Scientist',
    'Teacher',
    'Professor',
    'Researcher',
    'Freelancer',
    'Entrepreneur',
    'Product Manager',
    'Business Owner',
    'Admin',
    'Manager',
    'Developer',
    'Designer',
    'Other'
  ];
  
  // Initialize form fields from user data on component mount
  useEffect(() => {
    if (user) {
      if (user.role) setSelectedRole(user.role);
      if (user.phoneNumber) {
        setSettings(prev => ({
          ...prev,
          phoneNumber: user.phoneNumber
        }));
      }
    }
  }, [user]);
  
  // Update role in settings when selectedRole changes
  useEffect(() => {
    if (selectedRole) {
      setSettings(prev => ({
        ...prev,
        role: selectedRole
      }));
    }
  }, [selectedRole]);
  const [settings, setSettings] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      newsletter: true
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateFormat: 'MM/dd/yyyy',
    timeFormat: '12h',
    numberFormat: '1,234.56',
    language: currentLanguage || 'en'
  });
  
  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(prev => ({
        ...prev,
        ...JSON.parse(savedSettings),
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }
    setIsLoading(false);
  }, []);
  
  // Save settings to localStorage when they change
  useEffect(() => {
    if (!isLoading) {
      const { currentPassword, newPassword, confirmPassword, ...settingsToSave } = settings;
      localStorage.setItem('userSettings', JSON.stringify(settingsToSave));
    }
  }, [settings, isLoading]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle notification toggles
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };
  
  // Form submission logic is handled by the handleSubmit function above
  
  // Handle recovery information updates
  
  // Handle recovery information updates
  const handleRecoveryUpdate = async (type, value) => {
    try {
      if (type === 'email') {
        await updateRecoveryEmail(value);
      } else if (type === 'phone') {
        await updatePhoneNumber(value);
      }
    } catch (err) {
      console.error('Error updating recovery info:', err);
    }
  };
  
  // Update settings when currentLanguage changes
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      language: currentLanguage
    }));
  }, [currentLanguage]);
  
  // Handle language change
  const handleLanguageChange = async (langCode) => {
    try {
      // Update the language in the language context
      await changeLanguage(langCode);
      
      // Update the local state
      setSettings(prev => ({
        ...prev,
        language: langCode
      }));
      
      // Force a page reload to ensure all components update
      window.location.reload();
      
      // Show success message
      setSuccess('Language updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error changing language:', error);
      setError('Failed to update language');
      setTimeout(() => setError(''), 3000);
    }
  };
  
  // Font size options with display names
  const fontSizeOptions = [
    { id: 'small', name: 'Small', size: '0.875rem' },
    { id: 'medium', name: 'Medium', size: '1rem' },
    { id: 'large', name: 'Large', size: '1.125rem' },
    { id: 'xlarge', name: 'Extra Large', size: '1.25rem' }
  ];
  
  // Theme options for the UI
  const themeOptions = [
    { id: 'light', name: 'Light', icon: SunIcon },
    { id: 'dark', name: 'Dark', icon: MoonIcon },
    { id: 'system', name: 'System', icon: ComputerDesktopIcon }
  ];
  
  // Handle theme change from the settings UI
  const handleThemeChange = (themeId) => {
    setSaved(false); // Reset saved state when theme changes
    if (themeId === 'light' || themeId === 'dark') {
      toggleTheme();
    } else if (themeId === 'system') {
      // For system theme, use the system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(systemTheme);
      localStorage.removeItem('theme'); // Clear saved theme to use system
    }
  };
  
  // Handle font size change
  const handleFontSizeChange = useCallback((size) => {
    setSaved(false);
    updateFontSize(size);
  }, [updateFontSize]);
  
  // Handle accent color change
  const handleAccentColorChange = useCallback((color) => {
    setSaved(false);
    updateAccentColor(color);
  }, [updateAccentColor]);
  
  // Handle saving appearance settings
  const handleSaveAppearance = useCallback(() => {
    // Settings are already being saved automatically to localStorage via the ThemeContext
    setSaved(true);
    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match!");
      setTimeout(() => setError(null), 5000);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long!");
      setTimeout(() => setError(null), 5000);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await updatePassword(currentPassword, newPassword);
      
      // Clear password fields on success
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Show success message
      setSuccess('Password updated successfully!');
      setTimeout(() => setSuccess(null), 5000);
    } catch (error) {
      console.error('Error updating password:', error);
      setError(`Failed to update password: ${error.message}`);
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Form states
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Notification states
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    news: false,
    reminders: true,
    marketing: false
  });
  
  // Security states
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [activeSessions, setActiveSessions] = useState([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  
  // Load active sessions
  const loadActiveSessions = useCallback(async () => {
    try {
      setIsLoadingSessions(true);
      // In a real app, you would fetch this from your backend
      // For now, we'll use mock data
      const mockSessions = [
        { 
          id: 'session-1', 
          device: navigator.userAgent,
          browser: getBrowserName(),
          location: 'Current Location',
          lastActive: 'Just now',
          current: true,
          ip: '192.168.1.1',
          os: getOSName(),
          lastUsed: new Date().toISOString()
        },
        { 
          id: 'session-2', 
          device: 'iPhone 13',
          browser: 'Safari',
          location: 'Mumbai, IN',
          lastActive: '1 day ago',
          current: false,
          ip: '203.0.113.1',
          os: 'iOS 15',
          lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setActiveSessions(mockSessions);
    } catch (error) {
      console.error('Error loading active sessions:', error);
      setError('Failed to load active sessions');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoadingSessions(false);
    }
  }, []);
  
  // Helper function to get browser name from user agent
  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) return 'Internet Explorer';
    return 'Unknown Browser';
  };
  
  // Helper function to get OS name from user agent
  const getOSName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS') || /iPad|iPhone|iPod/.test(userAgent)) return 'iOS';
    return 'Unknown OS';
  };
  
  // Sign out of all other sessions
  const handleSignOutAllSessions = useCallback(async () => {
    if (!window.confirm('Are you sure you want to sign out of all other sessions? This will log you out of all devices except this one.')) {
      return;
    }

    try {
      setIsLoadingSessions(true);
      
      // In a real app, you would call your backend API to invalidate other sessions
      // For now, we'll simulate this by filtering out non-current sessions
      setActiveSessions(prevSessions => 
        prevSessions.filter(session => session.current)
      );
      
      setSuccess('Successfully signed out of all other sessions');
      setTimeout(() => setSuccess(null), 5000);
    } catch (error) {
      console.error('Error signing out of all sessions:', error);
      setError('Failed to sign out of all sessions');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoadingSessions(false);
    }
  }, []);

  // Sign out of a specific session
  const handleSignOutSession = useCallback(async (sessionId) => {
    try {
      setIsLoadingSessions(true);
      
      // In a real app, you would call your backend API to invalidate this session
      // For now, we'll simulate this by removing the session
      setActiveSessions(prevSessions => 
        prevSessions.filter(session => session.id !== sessionId)
      );
      
      setSuccess('Successfully signed out of the selected session');
      setTimeout(() => setSuccess(null), 5000);
    } catch (error) {
      console.error('Error signing out of session:', error);
      setError('Failed to sign out of the session');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoadingSessions(false);
    }
  }, []);

  // Load sessions when component mounts
  useEffect(() => {
    loadActiveSessions();
  }, [loadActiveSessions]);
  
  // Accessibility states
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    reduceMotion: false,
    textSize: 'medium', // 'small', 'medium', 'large', 'xlarge'
    keyboardNavigation: true
  });
  
  // Billing states
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'mastercard', last4: '5555', expiry: '06/24', isDefault: false }
  ]);
  
  const [billingHistory, setBillingHistory] = useState([
    { id: 1, date: '2023-05-15', description: 'Premium Plan', amount: 19.99, status: 'Paid' },
    { id: 2, date: '2023-04-15', description: 'Premium Plan', amount: 19.99, status: 'Paid' },
    { id: 3, date: '2023-03-15', description: 'Premium Plan', amount: 19.99, status: 'Paid' },
  ]);
  
  const [subscription, setSubscription] = useState({
    plan: 'Premium',
    status: 'active',
    nextBillingDate: '2023-06-15',
    price: 19.99,
    billingCycle: 'monthly',
    usage: {
      interviews: 12,
      limit: 20,
      resetDate: '2023-06-30'
    }
  });
  
  // Search query for language search
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter languages based on search query (searches in native name, English name, and code)
  const filteredLanguages = searchQuery === ''
    ? languages
    : languages.filter((lang) => {
        const query = searchQuery.toLowerCase();
        return (
          (lang.name && lang.name.toLowerCase().includes(query)) ||
          (lang.enName && lang.enName.toLowerCase().includes(query)) ||
          (lang.code && lang.code.toLowerCase().includes(query))
        );
      });
  
  const timezones = [
    'Pacific/Honolulu',
    'America/Anchorage',
    'America/Los_Angeles',
    'America/Denver',
    'America/Chicago',
    'America/New_York',
    'America/Sao_Paulo',
    'UTC',
    'Europe/London',
    'Europe/Paris',
    'Europe/Moscow',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];
  
  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY', example: '05/15/2023' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY', example: '15/05/2023' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', example: '2023-05-15' },
    { value: 'DD MMM YYYY', label: 'DD MMM YYYY', example: '15 May 2023' },
    { value: 'MMM DD, YYYY', label: 'MMM DD, YYYY', example: 'May 15, 2023' },
  ];
  
  const timeFormats = [
    { value: '12h', label: '12-hour', example: '02:30 PM' },
    { value: '24h', label: '24-hour', example: '14:30' },
  ];
  
  const numberFormats = [
    { value: '1,234.56', label: '1,234.56', example: '1,234.56' },
    { value: '1.234,56', label: '1.234,56', example: '1.234,56' },
    { value: '1 234,56', label: '1 234,56', example: '1 234,56' },
  ];
  
  // Data & Storage states
  const [dataStorage, setDataStorage] = useState({
    cacheSize: '245.8 MB',
    autoClearCache: true,
    autoDownloadUpdates: true,
    syncData: true,
    syncFrequency: '30', // minutes
    dataSaver: false,
    mediaDownloadQuality: 'high', // 'high' | 'medium' | 'low'
    lastBackup: '2023-05-20T14:30:00Z'
  });
  
  const storageUsage = {
    total: 500, // MB
    used: 245.8,
    breakdown: [
      { name: 'Documents', size: 120.5, percentage: 48.9, color: 'bg-blue-500' },
      { name: 'Images', size: 65.2, percentage: 26.4, color: 'bg-green-500' },
      { name: 'Videos', size: 45.8, percentage: 18.6, color: 'bg-purple-500' },
      { name: 'Other', size: 14.3, percentage: 5.8, color: 'bg-gray-400' },
    ]
  };
  
  const mediaQualities = [
    { value: 'high', label: 'High (Recommended)', description: 'Best quality, uses more data' },
    { value: 'medium', label: 'Medium', description: 'Good balance of quality and data usage' },
    { value: 'low', label: 'Low', description: 'Reduced quality, uses less data' }
  ];
  
  // Common states - consolidated at the top of the component
  const [developerMode, setDeveloperMode] = useState(false);
  const [betaFeatures, setBetaFeatures] = useState(false);
  
  // Phone country code selection
  const [selectedCountry, setSelectedCountry] = useState({
    code: '+91',
    flag: '🇮🇳',
    name: 'India'
  });
  
  const countries = [
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  ];
  
  // Recovery state
  const [showRecoveryEmailForm, setShowRecoveryEmailForm] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [recoveryEmailInput, setRecoveryEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  
  // Handle recovery email update
  const handleUpdateRecoveryEmail = async () => {
    if (!recoveryEmailInput) return;
    
    const { success } = await updateRecoveryEmail(recoveryEmailInput);
    if (success) {
      setShowRecoveryEmailForm(false);
    }
  };
  
  // Handle phone number update
  const handleUpdatePhoneNumber = async () => {
    if (!phoneInput) return;
    
    const { success } = await updatePhoneNumber(phoneInput);
    if (success) {
      setShowPhoneForm(false);
    }
  };
  
  // Clear messages when switching tabs
  useEffect(() => {
    if (activeTab !== 'account-management') {
      clearMessages();
      setShowRecoveryEmailForm(false);
      setShowPhoneForm(false);
    }
  }, [activeTab, clearMessages]);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('File size should be less than 2MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, GIF)');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageToCrop(event.target.result);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper function to handle file uploads
  const handleFileUpload = async (file) => {
    if (!file) {
      throw new Error('No file provided');
    }
    
    try {
      const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const storage = getStorage();
      const filename = `${Date.now()}_${file.name || 'profile'}.${file.type.split('/')[1] || 'jpg'}`;
      const storagePath = `profilePictures/${user.uid}/${filename}`;
      const storageRef = ref(storage, storagePath);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get the download URL
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error('Error handling file upload:', error);
      throw new Error('Failed to process the file. Please try again.');
    }
  };

  // Upload file to Firebase Storage and get download URL
  const uploadImageToStorage = async (file) => {
    console.log('Starting file upload:', {
      name: file.name,
      type: file.type,
      size: file.size
    });
    
    try {
      const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const storage = getStorage();
      const filename = `${Date.now()}_${file.name || 'profile'}.${file.type.split('/')[1] || 'jpg'}`;
      const storagePath = `profilePictures/${user.uid}/${filename}`;
      const storageRef = ref(storage, storagePath);
      
      console.log('Uploading to storage path:', storagePath);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Upload completed:', {
        bytesTransferred: snapshot.bytesTransferred,
        totalBytes: snapshot.totalBytes
      });
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Got download URL:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      throw new Error('Failed to upload image. Please try again.');
    }
  };

  // Handle crop completion
  const handleCropComplete = async (croppedImage, file, error) => {
    console.log('Starting handleCropComplete with:', { 
      croppedImage: !!croppedImage, 
      file: file ? {
        name: file.name,
        type: file.type,
        size: file.size
      } : null, 
      error: error?.message 
    });
    
    try {
      // If there was an error in the crop process, throw it
      if (error) {
        console.error('Crop error received:', error);
        throw error;
      }
      
      // If no image data was provided, throw an error
      if (!croppedImage || !file) {
        const errMsg = !croppedImage ? 'No cropped image data' : 'No file object';
        console.error('Validation error:', errMsg);
        throw new Error(errMsg);
      }
      
      // Ensure file is a valid File/Blob object
      if (!(file instanceof Blob) && !(file instanceof File)) {
        console.error('Invalid file object:', file);
        throw new Error('Invalid file object. Please try again.');
      }
      
      setIsUploading(true);
      
      try {
        // Upload the file to Firebase Storage and get the download URL
        console.log('Uploading image to storage...');
        const downloadURL = await uploadImageToStorage(file);
        console.log('Image uploaded successfully, URL:', downloadURL);
        
        // Prepare profile updates
        const profileUpdates = { 
          photoURL: downloadURL,
          displayName: settings.displayName || '',
          phoneNumber: settings.phoneNumber || '',
          bio: settings.bio || '',
          role: selectedRole || 'interviewee'
        };
        
        console.log('Updating profile with:', Object.keys(profileUpdates));
        
        // Update the profile with the download URL
        await updateUserProfile(profileUpdates);
        console.log('Profile update successful');
        
        // Update the local state with the download URL for preview
        setProfileImage(downloadURL);
        
        // Update the form state with the download URL for saving
        setSettings(prev => ({
          ...prev,
          photoURL: downloadURL
        }));
        
        // Show success message
        setSuccess('Profile picture updated successfully');
        setTimeout(() => setSuccess(''), 3000);
        
        setSaved(true);
        
      } catch (profileError) {
        console.error('Error in profile update process:', {
          name: profileError.name,
          message: profileError.message,
          stack: profileError.stack,
          code: profileError.code,
          response: profileError.response
        });
        throw new Error(profileError.message || 'Failed to update profile');
      }
      
    } catch (error) {
      console.error('Error in handleCropComplete:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code
      });
      setError(error.message || 'Failed to update profile picture');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsUploading(false);
      setIsCropping(false);
      setImageToCrop(null);
    }
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('File size should be less than 2MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, GIF)');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageToCrop(event.target.result);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get animations state and toggle from ThemeContext
  const { animationsEnabled, toggleAnimations } = useTheme();
  const [isToggling, setIsToggling] = useState(false);
  
  // Handle animation toggle
  const handleAnimationToggle = useCallback(async () => {
    if (isToggling) return;
    
    setIsToggling(true);
    try {
      await toggleAnimations();
    } finally {
      setIsToggling(false);
    }
  }, [toggleAnimations, isToggling]);
  
  // Handle density change
  const handleDensityChange = useCallback((newDensity) => {
    updateDensity(newDensity);
    // Optional: Add a smooth transition effect
    document.documentElement.style.transition = 'all 0.2s ease-in-out';
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  }, [updateDensity]);
  
  // Available accent colors
  const accentColors = [
    { id: 'primary', name: 'Teal', value: '#0d9488' },
    { id: 'blue', name: 'Blue', value: '#3b82f6' },
    { id: 'indigo', name: 'Indigo', value: '#6366f1' },
    { id: 'purple', name: 'Purple', value: '#8b5cf6' },
    { id: 'pink', name: 'Pink', value: '#ec4899' },
    { id: 'red', name: 'Red', value: '#ef4444' },
    { id: 'orange', name: 'Orange', value: '#f97316' },
    { id: 'green', name: 'Green', value: '#10b981' },
    { id: 'emerald', name: 'Emerald', value: '#10b981' },
    { id: 'cyan', name: 'Cyan', value: '#06b6d4' },
    { id: 'rose', name: 'Rose', value: '#f43f5e' },
    { id: 'amber', name: 'Amber', value: '#f59e0b' }
  ];
  
  // UI densities are now provided by ThemeContext

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 group"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6 text-primary dark:text-primary-300 group-hover:scale-110 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
              Account Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your account preferences and settings
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/60 backdrop-blur-sm">
              <nav className="p-2 space-y-1">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300 shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30 hover:translate-x-1'
                    }`}
                  >
                    <tab.icon className={`h-5 w-5 mr-3 ${activeTab === tab.id ? 'text-primary dark:text-primary-300' : 'text-gray-500 dark:text-gray-400'}`} />
                    <span className="font-medium">{tab.name}</span>
                    {activeTab === tab.id && (
                      <span className="ml-auto w-2 h-2 bg-primary dark:bg-primary-400 rounded-full"></span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6 md:p-8 bg-white/50 dark:bg-gray-800/60 backdrop-blur-sm overflow-y-auto max-h-[calc(100vh-12rem)]">
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-300">
                  {success}
                </div>
              )}

              {activeTab === 'profile' && (
                <motion.form 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="border-b border-gray-100 dark:border-gray-700 pb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent inline-block">
                      Profile Information
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Update your personal details and contact information
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-6">
                        <div className="relative group">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="h-20 w-20 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
                            />
                          ) : (
                            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                              {settings.displayName ? settings.displayName.charAt(0).toUpperCase() : 'U'}
                            </div>
                          )}
                          <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="p-1.5 bg-white rounded-full text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Photo</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            JPG, GIF or PNG. Max size of 2MB
                          </p>
                        </div>
                      </div>
                      
                      {/* Hidden file input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      
                      {/* Drag and drop area */}
                      <div 
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                      >
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <span className="relative cursor-pointer rounded-md font-medium text-primary hover:text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                              Upload a file
                            </span>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, GIF up to 2MB
                          </p>
                        </div>
                      </div>
                      
                      {/* Image upload functionality */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            value={settings.displayName}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              displayName: e.target.value
                            }))}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 dark:focus:ring-primary/30 dark:focus:border-primary/50 transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
                            placeholder="Enter your name"
                            required
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <UserCircleIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      {/* Role Dropdown */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Role
                        </label>
                        <Combobox value={selectedRole} onChange={(role) => {
                          setSelectedRole(role);
                          setQueryRole('');
                        }}>
                          <div className="relative">
                            <div className="relative">
                              <Combobox.Input
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 dark:focus:ring-primary/30 dark:focus:border-primary/50 transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm pr-10"
                                displayValue={(role) => role || ''}
                                onChange={(event) => setQueryRole(event.target.value)}
                                placeholder="Search or select a role..."
                                value={queryRole || selectedRole}
                              />
                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </Combobox.Button>
                            </div>
                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              {roles
                                .filter((role) =>
                                  role.toLowerCase().includes(queryRole.toLowerCase())
                                )
                                .map((role) => (
                                  <Combobox.Option
                                    key={role}
                                    value={role}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                                        active ? 'bg-primary/10 text-primary' : 'text-gray-900 dark:text-gray-100'
                                      }`
                                    }
                                  >
                                    {({ selected }) => (
                                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                        {role}
                                      </span>
                                    )}
                                  </Combobox.Option>
                                ))}
                              {queryRole && !roles.some(role => role.toLowerCase() === queryRole.toLowerCase()) && (
                                <Combobox.Option
                                  value={queryRole}
                                  className="relative cursor-default select-none py-2 pl-4 pr-4 text-primary"
                                >
                                  <span className="font-medium">Add "{queryRole}"</span>
                                </Combobox.Option>
                              )}
                            </Combobox.Options>
                          </div>
                        </Combobox>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            disabled
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-sm"
                            title="Go to Account settings to change email"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      {/* Phone Number with Country Dropdown */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                            <div className="relative w-full sm:w-32">
                              <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white dark:bg-gray-700/50 py-3 pl-3 pr-8 text-left border border-gray-200 dark:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 shadow-sm">
                                <span className="flex items-center">
                                  <span className="mr-1.5 text-lg">{selectedCountry.flag}</span>
                                  <span className="block truncate text-gray-900 dark:text-white">{selectedCountry.code}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5">
                                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </span>
                              </Listbox.Button>
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {countries.map((country, idx) => (
                                  <Listbox.Option
                                    key={idx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                                        active ? 'bg-primary/10 text-primary' : 'text-gray-900 dark:text-gray-100'
                                      }`
                                    }
                                    value={country}
                                  >
                                    {({ selected }) => (
                                      <div className="flex items-center">
                                        <span className="text-lg mr-2">{country.flag}</span>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                          {country.name} ({country.code})
                                        </span>
                                      </div>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
                          </Listbox>
                          <div className="relative flex-1">
                            <input
                              type="tel"
                              id="phone"
                              name="phoneNumber"
                              value={settings.phoneNumber || ''}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 dark:focus:ring-primary/30 dark:focus:border-primary/50 transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
                              placeholder="12345 67890"
                              pattern="[0-9]{5} [0-9]{5}"
                              title="Please enter a 10-digit phone number"
                              onChange={(e) => {
                                // Format phone number as user types (e.g., 12345 67890)
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 5) {
                                  value = value.replace(/^(\d{5})(\d{0,5})/, '$1 $2');
                                }
                                setSettings(prev => ({
                                  ...prev,
                                  phoneNumber: value
                                }));
                              }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          We'll only use this for important account notifications
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Bio
                        </label>
                        <span 
                          className={`text-xs ${
                            settings.bio?.length > 200 
                              ? 'text-red-500' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {settings.bio?.length || 0}/200
                        </span>
                      </div>
                      <div className="relative">
                        <textarea
                          id="bio"
                          rows={4}
                          value={settings.bio || ''}
                          onChange={(e) => {
                            const bioText = e.target.value.substring(0, 200);
                            setSettings(prev => ({
                              ...prev,
                              bio: bioText
                            }));
                          }}
                          className={`w-full px-4 py-3 bg-white dark:bg-gray-700/50 border ${
                            settings.bio?.length > 200 
                              ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500/50' 
                              : 'border-gray-200 dark:border-gray-600 focus:ring-primary/50 focus:border-primary/50 dark:focus:ring-primary/30 dark:focus:border-primary/50'
                          } rounded-xl transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm`}
                          placeholder="Tell us a little bit about yourself..."
                        />
                      </div>
                      <p 
                        className={`mt-1 text-xs ${
                          settings.bio?.length > 200 
                            ? 'text-red-500' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {settings.bio?.length > 200 
                          ? 'Bio exceeds 200 characters. Please shorten it.' 
                          : 'Brief description for your profile. Max 200 characters.'}
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Social Profiles</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                          </div>
                          <div className="ml-3 flex-1">
                            <input
                              type="url"
                              className="w-full px-4 py-2 bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 dark:focus:ring-primary/30 dark:focus:border-primary/50 transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                              placeholder="https://facebook.com/username"
                            />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-400 dark:bg-blue-900/30 flex items-center justify-center">
                            <svg className="h-4 w-4 text-white dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </div>
                          <div className="ml-3 flex-1">
                            <input
                              type="url"
                              className="w-full px-4 py-2 bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 dark:focus:ring-primary/30 dark:focus:border-primary/50 transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                              placeholder="https://twitter.com/username"
                            />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-900/30 flex items-center justify-center">
                            <svg className="h-4 w-4 text-white dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div className="ml-3 flex-1">
                            <input
                              type="url"
                              className="w-full px-4 py-2 bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 dark:focus:ring-primary/30 dark:focus:border-primary/50 transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                              placeholder="https://linkedin.com/in/username"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/20 transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary to-teal-600 rounded-xl hover:from-primary/90 hover:to-teal-600/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-primary/20 flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}

              {activeTab === 'account' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  {/* Security Status Card */}
                  <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security Status</h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review and manage your account security settings</p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <div className="relative">
                              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                              <div className="absolute inset-0 bg-green-500 rounded-full opacity-75 animate-ping"></div>
                            </div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">Secure</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                              <LockClosedIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Password</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                              <ShieldCheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">2FA</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Authenticator app active</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-3">
                              <DevicePhoneMobileIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Recovery</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Phone number added</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Email Section */}
                    <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Email Address</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your email address for account notifications and password resets.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => document.getElementById('email').focus()}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Update
                          </button>
                        </div>
                        
                        <div className="mt-4 max-w-2xl">
                          <div>
                            <label htmlFor="email" className="sr-only">Email Address</label>
                            <div className="mt-1 flex rounded-lg shadow-sm">
                              <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 min-w-0 block w-full px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white sm:text-sm"
                                placeholder="your@email.com"
                              />
                              <button
                                type="button"
                                onClick={() => {}}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                              We'll send a verification link to your new email address.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Password Section */}
                    <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Password & Security</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your password and security settings</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              onClick={() => {
                                const passwordSection = document.getElementById('password-change-form');
                                passwordSection.scrollIntoView({ behavior: 'smooth' });
                                document.getElementById('currentPassword')?.focus();
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Change Password
                            </button>
                          </div>
                        </div>

                        <div id="password-change-form" className="mt-8 space-y-6 max-w-2xl">
                          {/* Password Strength Meter */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Current Password
                              </label>
                              <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({...prev, current: !prev.current}))}
                                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
                              >
                                {showPassword.current ? 'Hide' : 'Show'}
                              </button>
                            </div>
                            <div className="relative rounded-md shadow-sm">
                              <input
                                type={showPassword.current ? 'text' : 'password'}
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white rounded-lg sm:text-sm"
                                placeholder="Enter current password"
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {showPassword.current ? (
                                  <EyeOffIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                ) : (
                                  <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                New Password
                              </label>
                              <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({...prev, new: !prev.new}))}
                                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
                              >
                                {showPassword.new ? 'Hide' : 'Show'}
                              </button>
                            </div>
                            <div className="relative rounded-md shadow-sm">
                              <input
                                type={showPassword.new ? 'text' : 'password'}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white rounded-lg sm:text-sm"
                                placeholder="Enter new password"
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {showPassword.new ? (
                                  <EyeOffIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                ) : (
                                  <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                )}
                              </div>
                            </div>
                            {newPassword && (
                              <div className="mt-2">
                                <div className="grid grid-cols-4 gap-2 h-1.5 mb-2">
                                  {[1, 2, 3, 4].map((i) => (
                                    <div 
                                      key={i}
                                      className={`h-full rounded-full ${
                                        newPassword.length < 4 ? 'bg-red-500' :
                                        newPassword.length < 8 ? 'bg-yellow-500' :
                                        newPassword.length < 12 ? 'bg-blue-500' : 'bg-green-500'
                                      }`}
                                      style={{ opacity: newPassword.length >= (i * 3) ? 1 : 0.2 }}
                                    />
                                  ))}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {newPassword.length < 4 ? 'Weak' :
                                   newPassword.length < 8 ? 'Fair' :
                                   newPassword.length < 12 ? 'Good' : 'Strong'}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Confirm New Password
                              </label>
                              <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({...prev, confirm: !prev.confirm}))}
                                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
                              >
                                {showPassword.confirm ? 'Hide' : 'Show'}
                              </button>
                            </div>
                            <div className="relative rounded-md shadow-sm">
                              <input
                                type={showPassword.confirm ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`block w-full px-4 py-3 border ${
                                  confirmPassword && newPassword !== confirmPassword 
                                    ? 'border-red-300 dark:border-red-700' 
                                    : 'border-gray-300 dark:border-gray-600'
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white rounded-lg sm:text-sm`}
                                placeholder="Confirm new password"
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {showPassword.confirm ? (
                                  <EyeOffIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                ) : (
                                  <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                )}
                              </div>
                            </div>
                            {confirmPassword && newPassword !== confirmPassword && (
                              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                Passwords don't match
                              </p>
                            )}
                          </div>

                          {/* Password Requirements */}
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Password Requirements</h4>
                            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                              <li className={`flex items-center ${newPassword.length >= 8 ? 'text-green-600 dark:text-green-400' : ''}`}>
                                <CheckCircleIcon className={`h-4 w-4 mr-1.5 ${newPassword.length >= 8 ? 'text-green-500' : 'text-gray-400'}`} />
                                At least 8 characters
                              </li>
                              <li className={`flex items-center ${/[A-Z]/.test(newPassword) ? 'text-green-600 dark:text-green-400' : ''}`}>
                                <CheckCircleIcon className={`h-4 w-4 mr-1.5 ${/[A-Z]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'}`} />
                                At least one uppercase letter
                              </li>
                              <li className={`flex items-center ${/[0-9]/.test(newPassword) ? 'text-green-600 dark:text-green-400' : ''}`}>
                                <CheckCircleIcon className={`h-4 w-4 mr-1.5 ${/[0-9]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'}`} />
                                At least one number
                              </li>
                              <li className={`flex items-center ${/[^A-Za-z0-9]/.test(newPassword) ? 'text-green-600 dark:text-green-400' : ''}`}>
                                <CheckCircleIcon className={`h-4 w-4 mr-1.5 ${/[^A-Za-z0-9]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'}`} />
                                At least one special character
                              </li>
                            </ul>
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => {
                                // Generate a strong password
                                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
                                let password = '';
                                for (let i = 0; i < 16; i++) {
                                  password += chars.charAt(Math.floor(Math.random() * chars.length));
                                }
                                setNewPassword(password);
                                setConfirmPassword(password);
                                setShowPassword({ current: false, new: false, confirm: false });
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                            >
                              <KeyIcon className="h-3.5 w-3.5 mr-1" />
                              Generate strong password
                            </button>
                            <button
                              type="button"
                              onClick={handlePasswordUpdate}
                              disabled={isLoading || !currentPassword || !newPassword || newPassword !== confirmPassword || newPassword.length < 8}
                              className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                              {isLoading ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Updating...
                                </>
                              ) : (
                                <>
                                  <LockClosedIcon className="-ml-1 mr-2 h-4 w-4" />
                                  Update Password
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {twoFactorEnabled 
                                ? 'Two-factor authentication is currently enabled.' 
                                : 'Add an extra layer of security to your account.'}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium mr-3 ${
                              twoFactorEnabled 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            }`}>
                              {twoFactorEnabled ? 'Active' : 'Inactive'}
                            </span>
                            <button
                              type="button"
                              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                              role="switch"
                              aria-checked={twoFactorEnabled}
                            >
                              <span className="sr-only">Toggle two-factor authentication</span>
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {twoFactorEnabled ? (
                          <div className="mt-6 space-y-6">
                            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
                              <div className="flex">
                                <div className="flex-shrink-0">
                                  <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Two-factor authentication is enabled</h3>
                                  <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                                    <p>Your account is protected with an extra layer of security.</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-center">
                                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                                    <DevicePhoneMobileIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Authenticator App</h3>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                  Use an authenticator app to get verification codes.
                                </p>
                                <div className="mt-4">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                    <CheckIcon className="-ml-0.5 mr-1.5 h-3 w-3" />
                                    Active
                                  </span>
                                </div>
                              </div>

                              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-center">
                                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-3">
                                    <KeyIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Recovery Codes</h3>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                  Save these codes in a safe place in case you lose access to your device.
                                </p>
                                <div className="mt-4">
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-purple-700 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    View Recovery Codes
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                              <button
                                type="button"
                                onClick={() => setTwoFactorEnabled(false)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                <TrashIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
                                Disable Two-Factor Authentication
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-6 space-y-6">
                            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                              <div className="flex">
                                <div className="flex-shrink-0">
                                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Two-factor authentication is not enabled</h3>
                                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                    <p>Enable two-factor authentication for enhanced security.</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Set up two-factor authentication</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Choose a method to add an extra layer of security to your account.
                              </p>
                              
                              <div className="mt-4 space-y-4">
                                <div className="flex items-start">
                                  <div className="flex items-center h-5">
                                    <input
                                      id="auth-app"
                                      name="two-factor-method"
                                      type="radio"
                                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                      defaultChecked
                                    />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label htmlFor="auth-app" className="font-medium text-gray-700 dark:text-gray-300">Authenticator App</label>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      Use an authenticator app to get verification codes.
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start">
                                  <div className="flex items-center h-5">
                                    <input
                                      id="sms"
                                      name="two-factor-method"
                                      type="radio"
                                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label htmlFor="sms" className="font-medium text-gray-700 dark:text-gray-300">Text Message</label>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      Receive verification codes via SMS.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6">
                                <button
                                  type="button"
                                  onClick={() => setTwoFactorEnabled(true)}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  <ShieldCheckIcon className="-ml-1 mr-2 h-5 w-5" />
                                  Enable Two-Factor Authentication
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {!twoFactorEnabled && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            When you enable two-factor authentication, you'll need to enter a verification code from an authenticator app when signing in.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Active Sessions */}
                    <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active Sessions</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and review your active login sessions</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="relative" data-tooltip="Active sessions">
                              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                <span className="text-sm font-medium">{activeSessions.length}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={loadActiveSessions}
                              disabled={isLoadingSessions}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                              {isLoadingSessions ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-gray-700 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Refreshing...
                                </>
                              ) : (
                                <>
                                  <ArrowPathIcon className="-ml-0.5 mr-1.5 h-3.5 w-3.5" />
                                  Refresh
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="mt-6">
                          {isLoadingSessions ? (
                            <div className="flex flex-col items-center justify-center py-8">
                              <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-500 border-t-transparent mb-3"></div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Loading sessions...</p>
                            </div>
                          ) : activeSessions.length > 0 ? (
                            <div className="space-y-3">
                              {activeSessions.map((session) => (
                                <div 
                                  key={session.id} 
                                  className={`relative flex items-start p-4 rounded-xl border ${
                                    session.current 
                                      ? 'border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10' 
                                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                  } transition-colors duration-200`}
                                >
                                  <div className="flex-shrink-0 pt-0.5">
                                    {session.deviceType === 'mobile' ? (
                                      <DevicePhoneMobileIcon className="h-6 w-6 text-gray-400" />
                                    ) : session.deviceType === 'tablet' ? (
                                      <DeviceTabletIcon className="h-6 w-6 text-gray-400" />
                                    ) : (
                                      <ComputerDesktopIcon className="h-6 w-6 text-gray-400" />
                                    )}
                                  </div>
                                  <div className="ml-4 flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {session.device || 'Unknown Device'}
                                      </p>
                                      {session.current ? (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                          <CheckIcon className="-ml-0.5 mr-1 h-3 w-3" />
                                          This device
                                        </span>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() => handleSignOutSession(session.id)}
                                          className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 inline-flex items-center"
                                        >
                                          <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-1" />
                                          Sign out
                                        </button>
                                      )}
                                    </div>
                                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                      <div className="flex flex-wrap items-center gap-x-2">
                                        <span>{session.browser}</span>
                                        <span className="text-gray-300 dark:text-gray-600">•</span>
                                        <span>{session.os}</span>
                                        {session.location && (
                                          <>
                                            <span className="text-gray-300 dark:text-gray-600">•</span>
                                            <span className="flex items-center">
                                              <MapPinIcon className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                              {session.location}
                                            </span>
                                          </>
                                        )}
                                      </div>
                                      <div className="mt-1.5 flex items-center text-xs text-gray-400 dark:text-gray-500">
                                        <ClockIcon className="h-3.5 w-3.5 mr-1" />
                                        <span>Last active: {session.lastActive}</span>
                                        <span className="mx-2">•</span>
                                        <span>IP: {session.ip}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
                                <UserCircleIcon className="h-6 w-6 text-gray-400" />
                              </div>
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">No active sessions</h3>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                You don't have any active sessions at the moment.
                              </p>
                            </div>
                          )}
                          
                          {activeSessions.length > 1 && (
                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                              <button
                                type="button"
                                onClick={handleSignOutAllSessions}
                                disabled={isLoadingSessions}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                              >
                                <ArrowLeftOnRectangleIcon className="-ml-1 mr-2 h-4 w-4" />
                                Sign out of all other sessions
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Security Activity Log */}
                    <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security Activity</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Recent security events for your account</p>
                          </div>
                          <button
                            type="button"
                            onClick={loadSecurityActivity}
                            disabled={isLoadingActivity}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            <ArrowPathIcon className={`-ml-0.5 mr-1.5 h-3.5 w-3.5 ${isLoadingActivity ? 'animate-spin' : ''}`} />
                            {isLoadingActivity ? 'Refreshing...' : 'Refresh'}
                          </button>
                        </div>

                        <div className="mt-6">
                          {isLoadingActivity ? (
                            <div className="flex flex-col items-center justify-center py-8">
                              <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-500 border-t-transparent mb-3"></div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Loading activity...</p>
                            </div>
                          ) : securityActivity.length > 0 ? (
                            <div className="flow-root">
                              <ul className="-mb-8">
                                {securityActivity.map((activity, index) => (
                                  <li key={activity.id}>
                                    <div className="relative pb-8">
                                      {index !== securityActivity.length - 1 && (
                                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
                                      )}
                                      <div className="relative flex space-x-3">
                                        <div>
                                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${
                                            activity.type === 'login' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            activity.type === 'password_change' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                            activity.type === 'device_added' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                                            'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                                          }`}>
                                            {activity.type === 'login' ? (
                                              <ArrowRightOnRectangleIcon className="h-4 w-4" />
                                            ) : activity.type === 'password_change' ? (
                                              <KeyIcon className="h-4 w-4" />
                                            ) : activity.type === 'device_added' ? (
                                              <DevicePhoneMobileIcon className="h-4 w-4" />
                                            ) : (
                                              <ShieldCheckIcon className="h-4 w-4" />
                                            )}
                                          </span>
                                        </div>
                                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                          <div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                              {activity.description}
                                              {activity.ip && (
                                                <span className="ml-1 text-xs text-gray-500 dark:text-gray-500">
                                                  • {activity.ip}
                                                </span>
                                              )}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                              {activity.timestamp}
                                            </p>
                                          </div>
                                          <div className="whitespace-nowrap text-right text-xs text-gray-500 dark:text-gray-400">
                                            {activity.location && (
                                              <span className="flex items-center">
                                                <MapPinIcon className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                                {activity.location}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
                                <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                              </div>
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">No activity yet</h3>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Your security activity will appear here.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Notification Preferences</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage how you receive notifications.</p>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {key === 'email' ? 'Email Notifications' : 
                             key === 'push' ? 'Push Notifications' : 'Newsletter'}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {key === 'email' ? 'Receive email notifications' : 
                             key === 'push' ? 'Receive push notifications' : 'Subscribe to our newsletter'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNotifications(prev => ({
                            ...prev,
                            [key]: !value
                          }))}
                          className={`${
                            value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                          role="switch"
                          aria-checked={value}
                        >
                          <span className="sr-only">Toggle {key} notifications</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              value ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Security</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account security settings.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {twoFactorEnabled 
                              ? 'Two-factor authentication is enabled' 
                              : 'Add an extra layer of security to your account'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={twoFactorEnabled}
                        >
                          <span className="sr-only">Enable two-factor authentication</span>
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                      {twoFactorEnabled && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm text-blue-700 dark:text-blue-300">
                          Two-factor authentication is now enabled. You'll need to enter a verification code when signing in.
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Active Sessions</h3>
                      <div className="space-y-3">
                        {activeSessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                            <div className="flex items-center space-x-3">
                              <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {session.device} • {session.browser}
                                  {session.current && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                      Current
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {session.location} • {session.lastActive}
                                </p>
                              </div>
                            </div>
                            {!session.current && (
                              <button
                                type="button"
                                className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                              >
                                Sign out
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View all active sessions
                      </button>
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Password</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Last changed 2 months ago
                      </p>
                      <button
                        type="button"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => setActiveTab('account')}
                      >
                        Change password
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'accessibility' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Accessibility</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Customize the app to your needs.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">High Contrast Mode</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Increase color contrast for better visibility
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAccessibility({...accessibility, highContrast: !accessibility.highContrast})}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            accessibility.highContrast ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={accessibility.highContrast}
                        >
                          <span className="sr-only">Toggle high contrast mode</span>
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              accessibility.highContrast ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Reduce Motion</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Minimize animations and transitions
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAccessibility({...accessibility, reduceMotion: !accessibility.reduceMotion})}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            accessibility.reduceMotion ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={accessibility.reduceMotion}
                        >
                          <span className="sr-only">Toggle reduce motion</span>
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              accessibility.reduceMotion ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Text Size</h3>
                      <div className="flex items-center space-x-3">
                        {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setAccessibility({...accessibility, textSize: size.toLowerCase()})}
                            className={`px-3 py-1.5 text-sm rounded-md ${
                              accessibility.textSize === size.toLowerCase() 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Keyboard Navigation</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enable keyboard shortcuts and navigation
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAccessibility({...accessibility, keyboardNavigation: !accessibility.keyboardNavigation})}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            accessibility.keyboardNavigation ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={accessibility.keyboardNavigation}
                        >
                          <span className="sr-only">Toggle keyboard navigation</span>
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              accessibility.keyboardNavigation ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                      {accessibility.keyboardNavigation && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Use <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded">Tab</kbd> to navigate, <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded">Enter</kbd> to select, and <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd> to close dialogs.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'data' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Data & Storage</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your storage, cache, and data usage.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Storage Usage */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Storage Usage</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {storageUsage.used.toFixed(1)} MB of {storageUsage.total} MB used
                            </p>
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Manage Storage
                          </button>
                        </div>
                        
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            {storageUsage.breakdown.map((item, index) => (
                              <div 
                                key={item.name}
                                className={`h-2.5 rounded-full ${item.color}`}
                                style={{ 
                                  width: `${item.percentage}%`,
                                  marginLeft: index > 0 ? '-0.25rem' : '0',
                                  zIndex: storageUsage.breakdown.length - index
                                }}
                                title={`${item.name}: ${item.size} MB (${item.percentage}%)`}
                              />
                            ))}
                          </div>
                          
                          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {storageUsage.breakdown.map((item) => (
                              <div key={item.name} className="flex items-center">
                                <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                                <span className="text-xs text-gray-600 dark:text-gray-300">
                                  {item.name} ({item.percentage}%)
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cache Management */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Cache</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {dataStorage.cacheSize} of cached data
                            </p>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              type="button"
                              onClick={() => setDataStorage({...dataStorage, cacheSize: '0 MB'})}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Clear Cache
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <label htmlFor="auto-clear-cache" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Auto-clear cache
                              </label>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Automatically clear cache when it exceeds 100MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setDataStorage({...dataStorage, autoClearCache: !dataStorage.autoClearCache})}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                dataStorage.autoClearCache ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                              role="switch"
                              aria-checked={dataStorage.autoClearCache}
                            >
                              <span className="sr-only">Auto-clear cache</span>
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  dataStorage.autoClearCache ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <label htmlFor="auto-download-updates" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Auto-download updates
                              </label>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Automatically download updates when on Wi-Fi
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setDataStorage({...dataStorage, autoDownloadUpdates: !dataStorage.autoDownloadUpdates})}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                dataStorage.autoDownloadUpdates ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                              role="switch"
                              aria-checked={dataStorage.autoDownloadUpdates}
                            >
                              <span className="sr-only">Auto-download updates</span>
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  dataStorage.autoDownloadUpdates ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Data Saver */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Data Saver</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Reduce data usage by limiting background data
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDataStorage({...dataStorage, dataSaver: !dataStorage.dataSaver})}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                              dataStorage.dataSaver ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                            role="switch"
                            aria-checked={dataStorage.dataSaver}
                          >
                            <span className="sr-only">Data Saver</span>
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                dataStorage.dataSaver ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                        
                        {dataStorage.dataSaver && (
                          <div className="mt-6 space-y-4">
                            <div>
                              <label htmlFor="sync-frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Sync frequency
                              </label>
                              <select
                                id="sync-frequency"
                                name="sync-frequency"
                                value={dataStorage.syncFrequency}
                                onChange={(e) => setDataStorage({...dataStorage, syncFrequency: e.target.value})}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                              >
                                <option value="15">Every 15 minutes</option>
                                <option value="30">Every 30 minutes</option>
                                <option value="60">Every hour</option>
                                <option value="240">Every 4 hours</option>
                                <option value="720">Every 12 hours</option>
                                <option value="1440">Every 24 hours</option>
                                <option value="0">Manually</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Media download quality
                              </label>
                              <div className="space-y-2">
                                {mediaQualities.map((quality) => (
                                  <div key={quality.value} className="flex items-center">
                                    <input
                                      id={`media-quality-${quality.value}`}
                                      name="media-quality"
                                      type="radio"
                                      checked={dataStorage.mediaDownloadQuality === quality.value}
                                      onChange={() => setDataStorage({...dataStorage, mediaDownloadQuality: quality.value})}
                                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                    />
                                    <label htmlFor={`media-quality-${quality.value}`} className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                                      <div className="font-medium">{quality.label}</div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">{quality.description}</div>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Backup & Restore */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="md:flex md:items-center md:justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Backup & Restore</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Last backup: {new Date(dataStorage.lastBackup).toLocaleString()}
                            </p>
                          </div>
                          <div className="mt-4 flex space-x-3 md:mt-0">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Create Backup
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Restore from Backup
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <label htmlFor="auto-backup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Auto-backup
                              </label>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Automatically back up your data daily
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setDataStorage({...dataStorage, syncData: !dataStorage.syncData})}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                dataStorage.syncData ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                              role="switch"
                              aria-checked={dataStorage.syncData}
                            >
                              <span className="sr-only">Auto-backup</span>
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  dataStorage.syncData ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                          
                          {dataStorage.syncData && (
                            <div className="mt-4">
                              <label htmlFor="backup-frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Backup frequency
                              </label>
                              <select
                                id="backup-frequency"
                                name="backup-frequency"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                              >
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Region & Language */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                        <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-500" />
                        Region & Language
                      </h3>
                      
                      <div className="space-y-6">
                        {/* Language Selection */}
                        <div>
                          <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Language
                          </label>
                          <select
                            id="language"
                            value={currentLanguage}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                          >
                            {languages.map((lang) => (
                              <option key={lang.code} value={lang.code}>
                                {lang.name} ({lang.enName})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Country Selection */}
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Country/Region
                          </label>
                          <select
                            id="country"
                            value={regionSettings.country}
                            onChange={(e) => handleRegionChange('country', e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                          >
                            {countryList.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.emoji} {country.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Timezone Selection */}
                        <div>
                          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Timezone
                          </label>
                          <select
                            id="timezone"
                            value={regionSettings.timezone}
                            onChange={(e) => handleRegionChange('timezone', e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                          >
                            {countryTimezones.length > 0 ? (
                              countryTimezones.map((tz) => (
                                <option key={tz.value} value={tz.value}>
                                  {tz.label}
                                </option>
                              ))
                            ) : (
                              <option value={regionSettings.timezone}>
                                {regionSettings.timezone}
                              </option>
                            )}
                          </select>
                        </div>

                        {/* Date & Time Format */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Date Format
                            </label>
                            <select
                              id="dateFormat"
                              value={regionSettings.dateFormat}
                              onChange={(e) => handleRegionChange('dateFormat', e.target.value)}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                              {dateFormats.map((format) => (
                                <option key={format.value} value={format.value}>
                                  {format.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="timeFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Time Format
                            </label>
                            <select
                              id="timeFormat"
                              value={regionSettings.timeFormat}
                              onChange={(e) => handleRegionChange('timeFormat', e.target.value)}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                              {timeFormats.map((format) => (
                                <option key={format.value} value={format.value}>
                                  {format.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* First Day of Week */}
                        <div>
                          <label htmlFor="firstDayOfWeek" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Day of Week
                          </label>
                          <select
                            id="firstDayOfWeek"
                            value={regionSettings.firstDayOfWeek}
                            onChange={(e) => handleRegionChange('firstDayOfWeek', parseInt(e.target.value))}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                          >
                            {weekStartsOn.map((day) => (
                              <option key={day.value} value={day.value}>
                                {day.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Units */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="temperatureUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Temperature Unit
                            </label>
                            <select
                              id="temperatureUnit"
                              value={regionSettings.temperatureUnit}
                              onChange={(e) => handleRegionChange('temperatureUnit', e.target.value)}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                              {temperatureUnits.map((unit) => (
                                <option key={unit.value} value={unit.value}>
                                  {unit.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="measurementSystem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Measurement System
                            </label>
                            <select
                              id="measurementSystem"
                              value={regionSettings.measurementSystem}
                              onChange={(e) => handleRegionChange('measurementSystem', e.target.value)}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                              {measurementSystems.map((system) => (
                                <option key={system.value} value={system.value}>
                                  {system.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={saveRegionSettings}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Save Region Settings
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Language */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Language</h3>
                        <div className="max-w-md">
                          <Combobox 
                            value={currentLanguage}
                            onChange={handleLanguageChange}
                          >
                            <div className="relative mt-1">
                              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                                <Combobox.Input
                                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-0"
                                  displayValue={(code) => {
                                    const lang = languages.find(l => l.code === code);
                                    return lang ? `${lang.name}${lang.code === 'en' ? ' (Default)' : ''}` : '';
                                  }}
                                  onChange={(event) => setSearchQuery(event.target.value)}
                                  placeholder="Search languages..."
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Combobox.Button>
                              </div>
                              <AnimatePresence>
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                                  {filteredLanguages.length === 0 && searchQuery !== '' ? (
                                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-300">
                                      No languages found.
                                    </div>
                                  ) : (
                                    <AnimatePresence>
                                      {filteredLanguages.map((lang) => (
                                        <Combobox.Option
                                          key={lang.code}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-200'
                                            }`
                                          }
                                          value={lang.code}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <div className="flex flex-col">
                                                <span
                                                  className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                  }`}
                                                >
                                                  {lang.name} {lang.code === 'en' && '(Default)'}
                                                </span>
                                                {lang.enName && lang.enName !== lang.name && (
                                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {lang.enName}
                                                  </span>
                                                )}
                                              </div>
                                              {selected ? (
                                                <span
                                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    active ? 'text-white' : 'text-blue-600'
                                                  }`}
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Combobox.Option>
                                      ))}
                                    </AnimatePresence>
                                  )}
                                </Combobox.Options>
                              </AnimatePresence>
                            </div>
                          </Combobox>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Type to search for a language or select from the dropdown.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timezone */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="md:flex md:items-center md:justify-between">
                          <div className="max-w-xl">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Timezone</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Set your local timezone to see all times in your local time.
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-4">
                            <select
                              id="timezone"
                              name="timezone"
                              value={settings.timezone}
                              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                              {timezones.map((tz) => (
                                <option key={tz} value={tz}>
                                  {tz.replace('_', ' ')} (UTC{new Date().toLocaleTimeString('en', {timeZone: tz, timeZoneName: 'short'}).split(' ')[2]})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time Format */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Date & Time Format</h3>
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          {/* Date Format */}
                          <div>
                            <label htmlFor="date-format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Date format
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {dateFormats.map((format) => (
                                <div key={format.value} className="flex items-center">
                                  <input
                                    id={`date-format-${format.value}`}
                                    name="date-format"
                                    type="radio"
                                    checked={settings.dateFormat === format.value}
                                    onChange={() => setSettings({...settings, dateFormat: format.value})}
                                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                  />
                                  <label htmlFor={`date-format-${format.value}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <div>{format.label}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{format.example}</div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Time Format */}
                          <div>
                            <label htmlFor="time-format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Time format
                            </label>
                            <div className="space-y-2">
                              {timeFormats.map((format) => (
                                <div key={format.value} className="flex items-center">
                                  <input
                                    id={`time-format-${format.value}`}
                                    name="time-format"
                                    type="radio"
                                    checked={settings.timeFormat === format.value}
                                    onChange={() => setSettings({...settings, timeFormat: format.value})}
                                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                  />
                                  <label htmlFor={`time-format-${format.value}`} className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                                    <div className="font-medium">{format.label}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{format.example}</div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'language' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Language & Region</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Customize your language, timezone, and display formats.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Language */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Language</h3>
                        <div className="max-w-md">
                          <Combobox 
                            value={currentLanguage}
                            onChange={handleLanguageChange}
                          >
                            <div className="relative mt-1">
                              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                                <Combobox.Input
                                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-0"
                                  displayValue={(code) => {
                                    const lang = languages.find(l => l.code === code);
                                    return lang ? `${lang.name}${lang.code === 'en' ? ' (Default)' : ''}` : '';
                                  }}
                                  onChange={(event) => setSearchQuery(event.target.value)}
                                  placeholder="Search languages..."
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Combobox.Button>
                              </div>
                              <AnimatePresence>
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                                  {filteredLanguages.length === 0 && searchQuery !== '' ? (
                                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-300">
                                      No languages found.
                                    </div>
                                  ) : (
                                    <AnimatePresence>
                                      {filteredLanguages.map((lang) => (
                                        <Combobox.Option
                                          key={lang.code}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-200'
                                            }`
                                          }
                                          value={lang.code}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <div className="flex flex-col">
                                                <span
                                                  className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                  }`}
                                                >
                                                  {lang.name} {lang.code === 'en' && '(Default)'}
                                                </span>
                                                {lang.enName && lang.enName !== lang.name && (
                                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {lang.enName}
                                                  </span>
                                                )}
                                              </div>
                                              {selected ? (
                                                <span
                                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    active ? 'text-white' : 'text-blue-600'
                                                  }`}
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Combobox.Option>
                                      ))}
                                    </AnimatePresence>
                                  )}
                                </Combobox.Options>
                              </AnimatePresence>
                            </div>
                          </Combobox>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Type to search for a language or select from the dropdown.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timezone */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="md:flex md:items-center md:justify-between">
                          <div className="max-w-xl">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Timezone</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Set your local timezone to see all times in your local time.
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-4">
                            <select
                              id="timezone"
                              name="timezone"
                              value={settings.timezone}
                              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                              {timezones.map((tz) => (
                                <option key={tz} value={tz}>
                                  {tz.replace('_', ' ')} (UTC{new Date().toLocaleTimeString('en', {timeZone: tz, timeZoneName: 'short'}).split(' ')[2]})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time Format */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Date & Time Format</h3>
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          {/* Date Format */}
                          <div>
                            <label htmlFor="date-format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Date format
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {dateFormats.map((format) => (
                                <div key={format.value} className="flex items-center">
                                  <input
                                    id={`date-format-${format.value}`}
                                    name="date-format"
                                    type="radio"
                                    checked={settings.dateFormat === format.value}
                                    onChange={() => setSettings({...settings, dateFormat: format.value})}
                                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                  />
                                  <label htmlFor={`date-format-${format.value}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <div>{format.label}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{format.example}</div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Time Format */}
                          <div>
                            <label htmlFor="time-format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Time format
                            </label>
                            <div className="space-y-2">
                              {timeFormats.map((format) => (
                                <div key={format.value} className="flex items-center">
                                  <input
                                    id={`time-format-${format.value}`}
                                    name="time-format"
                                    type="radio"
                                    checked={settings.timeFormat === format.value}
                                    onChange={() => setSettings({...settings, timeFormat: format.value})}
                                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                  />
                                  <label htmlFor={`time-format-${format.value}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <div>{format.label}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{format.example}</div>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Number Format */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Number Format</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { value: '1,234.56', label: '1,234.56', example: '1,234.56' },
                            { value: '1.234,56', label: '1.234,56', example: '1.234,56' },
                            { value: "1'234.56", label: "1'234.56", example: "1'234.56" }
                          ].map((format) => (
                            <div key={format.value} className="flex items-center">
                              <input
                                id={`number-format-${format.value}`}
                                name="number-format"
                                type="radio"
                                checked={settings.numberFormat === format.value}
                                onChange={() => setSettings({...settings, numberFormat: format.value})}
                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                              />
                              <label htmlFor={`number-format-${format.value}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                <div>{format.label}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Example: {format.example}</div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Preview</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Current date and time</p>
                            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                              {formatDate(new Date(), {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: settings?.timeFormat !== '24h'
                              }) || 'Loading...'}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                              {formatNumber(1234.56, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }) || '1234.56'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'billing' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Billing & Subscriptions</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your subscription and payment methods.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Current Plan</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                              {subscription.plan} Plan • Billed {subscription.billingCycle}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                          <div className="px-4 py-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Next Billing Date</dt>
                            <dd className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                              {new Date(subscription.nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </dd>
                          </div>
                          <div className="px-4 py-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Plan Price</dt>
                            <dd className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                              ${subscription.price.toFixed(2)}<span className="text-base font-normal text-gray-500 dark:text-gray-400">/{subscription.billingCycle}</span>
                            </dd>
                          </div>
                          <div className="px-4 py-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Interviews This Month</dt>
                            <dd className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                              {subscription.usage.interviews} <span className="text-base font-normal text-gray-500 dark:text-gray-400">/ {subscription.usage.limit}</span>
                            </dd>
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${(subscription.usage.interviews / subscription.usage.limit) * 100}%` }}
                                ></div>
                              </div>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                                Resets on {new Date(subscription.usage.resetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex">
                          <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Change Plan
                          </button>
                          <button
                            type="button"
                            className="ml-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Upgrade Plan
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Payment Methods</h3>
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Add Payment Method
                        </button>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                          {paymentMethods.map((method) => (
                            <li key={method.id}>
                              <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {method.type === 'visa' ? (
                                      <svg className="h-8 w-12" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#1A1F71"/>
                                        <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#fff"/>
                                        <path d="M28 12c0-4-2.6-7-7-7s-7 3-7 7 2.6 7 7 7 7-3 7-7zm-12 0c0-2.8 1.8-5 5-5s5 2.2 5 5-1.8 5-5 5-5-2.2-5-5z" fill="#1A1F71"/>
                                      </svg>
                                    ) : (
                                      <svg className="h-8 w-12" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000"/>
                                        <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#fff"/>
                                        <path d="M28 12c0-4-2.6-7-7-7s-7 3-7 7 2.6 7 7 7 7-3 7-7zm-12 0c0-2.8 1.8-5 5-5s5 2.2 5 5-1.8 5-5 5-5-2.2-5-5z" fill="#000"/>
                                      </svg>
                                    )}
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {method.type === 'visa' ? 'Visa' : 'Mastercard'} ending in {method.last4}
                                      </div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Expires {method.expiry}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    {method.isDefault ? (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                                        Default
                                      </span>
                                    ) : (
                                      <button
                                        type="button"
                                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                      >
                                        Set as default
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Billing History */}
                    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Billing History</h3>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Invoice</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {billingHistory.map((item) => (
                                <tr key={item.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    {item.description}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                                    ${item.amount.toFixed(2)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      item.status === 'Paid' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                                    }`}>
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                      View Invoice
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                          <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                            Previous
                          </a>
                          <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                            Next
                          </a>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
                              <span className="font-medium">3</span> results
                            </p>
                          </div>
                          <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                              <a
                                href="#"
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </a>
                              <a
                                href="#"
                                aria-current="page"
                                className="z-10 bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-300 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                1
                              </a>
                              <a
                                href="#"
                                className="bg-white dark:bg-gray-700 border-gray-300 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                2
                              </a>
                              <a
                                href="#"
                                className="bg-white dark:bg-gray-700 border-gray-300 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                3
                              </a>
                              <a
                                href="#"
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </a>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'appearance' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Appearance</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Customize how the app looks on your device.</p>
                  </div>

                  <div className="space-y-8">
                    {/* Theme Selection */}
                    <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {themeOptions.map((option) => {
                          // Determine if this option is active
                          const isActive = 
                            (option.id === 'system' && !localStorage.getItem('theme')) || // System is active when no theme is set
                            (option.id === 'light' && theme === 'light') ||
                            (option.id === 'dark' && theme === 'dark');
                            
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => handleThemeChange(option.id)}
                              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                isActive
                                  ? 'border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                              }`}
                            >
                              <div className="flex items-center">
                                <div className={`h-5 w-5 mr-2 ${
                                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'
                                }`}>
                                  <option.icon className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{option.name}</span>
                              </div>
                              {isActive && (
                                <div className="mt-2 text-xs text-primary-600 dark:text-primary-400">
                                  {option.id === 'system' ? 'Using system theme' : 'Active'}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">Accent Color</h3>
                        {accentColor && (
                          <div 
                            className="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-600"
                            style={{ backgroundColor: accentColor }}
                            title="Current accent color"
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-4">
                        {accentColors.map((color) => {
                          const isSelected = accentColor === color.value;
                          return (
                            <div key={color.id} className="flex flex-col items-center">
                              <button
                                type="button"
                                onClick={() => handleAccentColorChange(color.value)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 transform ${
                                  isSelected 
                                    ? 'ring-2 ring-offset-2 scale-110' 
                                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                                }`}
                                style={{
                                  backgroundColor: color.value,
                                  '--tw-ring-color': color.value,
                                  '--tw-ring-offset-color': 'hsl(var(--color-bg))'
                                }}
                                title={color.name}
                                aria-label={`Select ${color.name} color`}
                                aria-pressed={isSelected}
                              >
                                {isSelected && (
                                  <CheckCircleIcon 
                                    className={`h-5 w-5 ${
                                      ['#000000', '#1e293b', '#0f172a', '#111827', '#1f2937'].includes(color.value.toLowerCase())
                                        ? 'text-white/90' 
                                        : 'text-white'
                                    }`} 
                                  />
                                )}
                              </button>
                              <span 
                                className={`mt-2 text-xs truncate w-full text-center ${
                                  isSelected 
                                    ? 'text-primary-600 dark:text-primary-400 font-medium' 
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}
                              >
                                {color.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        Changes apply immediately across the application.
                      </p>
                    </div>

                    {/* Font Size */}
                    <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">Font Size</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {fontSizeOptions.find(f => f.id === fontSize)?.name}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-3">
                          {fontSizeOptions.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => handleFontSizeChange(option.id)}
                              disabled={saved}
                              className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                                fontSize === option.id
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                  : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                              }`}
                            >
                              <div className="flex items-center justify-center w-12 h-12 mb-2">
                                <div 
                                  className="text-center font-medium text-gray-900 dark:text-white"
                                  style={{ fontSize: option.size }}
                                >
                                  Aa
                                </div>
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-300">
                                {option.name}
                              </span>
                              {fontSize === option.id && (
                                <div className="mt-1">
                                  <CheckCircleIcon className="h-4 w-4 text-primary-500" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Smaller</span>
                            <span>Larger</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max={fontSizeOptions.length - 1}
                            value={fontSizeOptions.findIndex(f => f.id === fontSize)}
                            onChange={(e) => handleFontSizeChange(fontSizeOptions[parseInt(e.target.value)].id)}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* UI Density */}
                    <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Density</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Adjust the spacing and size of UI elements to your preference.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {uiDensities.map((density) => {
                          const isActive = uiDensity === density;
                          const densityInfo = {
                            compact: {
                              name: 'Compact',
                              description: 'Tight spacing, more content on screen',
                              icon: '↘️',
                              style: 'p-1.5 text-xs'
                            },
                            comfortable: {
                              name: 'Comfortable',
                              description: 'Balanced spacing for most users',
                              icon: '↔️',
                              style: 'p-2 text-sm'
                            },
                            spacious: {
                              name: 'Spacious',
                              description: 'More breathing room, easier to read',
                              icon: '↗️',
                              style: 'p-3 text-base'
                            }
                          }[density];
                          
                          return (
                            <button
                              key={density}
                              type="button"
                              onClick={() => handleDensityChange(density)}
                              className={`flex flex-col items-start p-4 rounded-lg border transition-all ${
                                isActive
                                  ? 'border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500/20'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                              }`}
                              aria-pressed={isActive}
                            >
                              <div className={`mb-2 text-2xl ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
                                {densityInfo.icon}
                              </div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                {densityInfo.name}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
                                {densityInfo.description}
                              </p>
                              {isActive && (
                                <div className="mt-2 w-full pt-2 border-t border-gray-100 dark:border-gray-700">
                                  <div className={`bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md ${densityInfo.style} text-center w-full`}>
                                    Preview
                                  </div>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Animation Toggle */}
                    <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Animations</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {animationsEnabled ? 'Animations are enabled' : 'Animations are disabled'}
                          </p>
                        </div>
                        <button
                          type="button"
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                            animationsEnabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                          role="switch"
                          onClick={handleAnimationToggle}
                          aria-checked={animationsEnabled}
                          disabled={isToggling}
                        >
                          <span className="sr-only">Toggle animations</span>
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              animationsEnabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {animationsEnabled 
                          ? 'UI animations and transitions are enabled for a smoother experience.'
                          : 'UI animations are disabled for better performance.'}
                      </p>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleSaveAppearance}
                        className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-teal-600 rounded-xl hover:from-primary-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-primary/20 flex items-center"
                        disabled={saved}
                      >
                        {saved ? (
                          <>
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Settings Saved!
                          </>
                        ) : (
                          'Save Appearance Settings'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Help & Support Tab */}
              {activeTab === 'help' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Help & Support</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get help and support for any issues you encounter.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Contact Options</h3>
                      <div className="space-y-4">
                        <button className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center">
                            <EnvelopeIcon className="h-5 w-5 text-blue-500 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Contact Support</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Get in touch with our support team</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center">
                            <QuestionMarkCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Help Center</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Find answers in our help center</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center">
                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Report a Problem</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Let us know about any issues</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center">
                            <DocumentTextIcon className="h-5 w-5 text-purple-500 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Send Feedback</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Share your thoughts with us</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Advanced Settings Tab */}
              {activeTab === 'advanced' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Advanced Settings</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Configure advanced application settings.</p>
                  </div>

                  <div className="space-y-6">
                    {/* API Keys Section */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-6 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">API Keys</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Manage your API keys for third-party integrations
                            </p>
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Manage Keys
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Webhooks Section */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-6 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Webhooks</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Configure webhook endpoints for real-time updates
                            </p>
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Configure
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Developer Settings */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-6 py-5 sm:p-6">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Developer Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Developer Mode</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Enable additional developer tools and options
                              </p>
                            </div>
                            <button
                              type="button"
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                developerMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                              role="switch"
                              aria-checked="false"
                              onClick={() => setDeveloperMode(!developerMode)}
                            >
                              <span className="sr-only">Enable developer mode</span>
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  developerMode ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Experimental Features */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-6 py-5 sm:p-6">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Experimental Features</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Beta Features</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Try out upcoming features before they're released
                              </p>
                            </div>
                            <button
                              type="button"
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                betaFeatures ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                              role="switch"
                              aria-checked="false"
                              onClick={() => setBetaFeatures(!betaFeatures)}
                            >
                              <span className="sr-only">Enable beta features</span>
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  betaFeatures ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Handle Deactivate/Delete Modals */}
              {showDeactivateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
                    <div className="flex items-center mb-4">
                      <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Deactivate Your Account</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Your account will be deactivated. You can reactivate it by logging in again. All your data will be preserved.
                    </p>
                    <div className="mb-4">
                      <label htmlFor="deactivate-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm your password
                      </label>
                      <input
                        type="password"
                        id="deactivate-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your password"
                      />
                    </div>
                    {error && (
                      <div className="mb-4 text-sm text-red-600 dark:text-red-400">
                        {error}
                      </div>
                    )}
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowDeactivateModal(false);
                          setPassword('');
                          setError('');
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                        disabled={isProcessing}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!password) {
                            setError('Please enter your password');
                            return;
                          }
                          
                          try {
                            setIsProcessing(true);
                            setError('');
                            await deactivateAccount(password);
                            setSuccess('Your account has been deactivated. You can reactivate it by logging in again.');
                            setShowDeactivateModal(false);
                            setPassword('');
                            logout();
                          } catch (err) {
                            setError(err.message || 'Failed to deactivate account. Please try again.');
                          } finally {
                            setIsProcessing(false);
                          }
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Deactivate Account'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
                    <div className="flex items-center mb-4">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Delete Your Account</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <span className="font-semibold text-red-600 dark:text-red-400">Warning:</span> This action is permanent and cannot be undone. All your data will be permanently deleted.
                    </p>
                    <div className="mb-4">
                      <label htmlFor="delete-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm your password
                      </label>
                      <input
                        type="password"
                        id="delete-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your password"
                      />
                    </div>
                    {error && (
                      <div className="mb-4 text-sm text-red-600 dark:text-red-400">
                        {error}
                      </div>
                    )}
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowDeleteModal(false);
                          setPassword('');
                          setError('');
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                        disabled={isProcessing}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!password) {
                            setError('Please enter your password');
                            return;
                          }
                          
                          try {
                            setIsProcessing(true);
                            setError('');
                            await deleteAccount(password);
                            setSuccess('Your account has been permanently deleted. We\'re sorry to see you go.');
                            setShowDeleteModal(false);
                            setPassword('');
                            logout();
                          } catch (err) {
                            setError(err.message || 'Failed to delete account. Please try again.');
                          } finally {
                            setIsProcessing(false);
                          }
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Permanently Delete Account'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg z-50 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  <span>{success}</span>
                </div>
              )}

              {/* Account Management Tab */}
              {activeTab === 'account-management' && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Account Management</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account settings and data.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Deactivate Account */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-yellow-200 dark:border-yellow-900/50">
                      <div className="px-6 py-5 sm:p-6">
                        <div className="md:flex md:items-start md:justify-between">
                          <div className="md:flex-1">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Deactivate Account</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Your account will be deactivated but not permanently deleted. You can reactivate it by logging in again.
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-6">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-800/50"
                              onClick={() => setShowDeactivateModal(true)}
                            >
                              Deactivate Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delete Account */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-red-200 dark:border-red-900/50">
                      <div className="px-6 py-5 sm:p-6">
                        <div className="md:flex md:items-start md:justify-between">
                          <div className="md:flex-1">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Delete Account</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Permanently delete your account and all of your data. This action cannot be undone.
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-6">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              onClick={() => setShowDeleteModal(true)}
                            >
                              Delete Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Export Data */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-6 py-5 sm:p-6">
                        <div className="md:flex md:items-start md:justify-between">
                          <div className="md:flex-1">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Export Data</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Download a copy of all your data in a machine-readable format.
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-6">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                              <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                              Export Data
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Recovery */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="px-6 py-5 sm:p-6">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Account Recovery</h3>
                        <div className="space-y-6">
                          {/* Recovery Email */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Recovery Email</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {user?.recoveryEmail ? (
                                  <span className="text-gray-700 dark:text-gray-300">{user.recoveryEmail}</span>
                                ) : (
                                  <span className="text-gray-400 dark:text-gray-500">No recovery email set</span>
                                )}
                              </p>
                              {showRecoveryEmailForm && (
                                <div className="mt-2">
                                  <input
                                    type="email"
                                    value={recoveryEmailInput}
                                    onChange={(e) => setRecoveryEmailInput(e.target.value)}
                                    placeholder="Enter recovery email"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                  />
                                  <div className="flex justify-end space-x-2 mt-2">
                                    <button
                                      type="button"
                                      onClick={() => setShowRecoveryEmailForm(false)}
                                      className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleUpdateRecoveryEmail}
                                      disabled={!recoveryEmailInput || recoveryLoading}
                                      className={`px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!recoveryEmailInput || recoveryLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                      {recoveryLoading ? 'Saving...' : 'Save'}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                            {!showRecoveryEmailForm && (
                              <button
                                type="button"
                                onClick={() => {
                                  setRecoveryEmailInput(user?.recoveryEmail || '');
                                  setShowRecoveryEmailForm(true);
                                  setShowPhoneForm(false);
                                }}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                              >
                                {user?.recoveryEmail ? 'Change' : 'Add'}
                              </button>
                            )}
                          </div>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700"></div>
                          
                          {/* Phone Number */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Phone Number</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {user?.phoneNumber ? (
                                  <span className="text-gray-700 dark:text-gray-300">{user.phoneNumber}</span>
                                ) : (
                                  <span className="text-gray-400 dark:text-gray-500">No phone number set</span>
                                )}
                              </p>
                              {showPhoneForm && (
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                                      +
                                    </span>
                                    <input
                                      type="tel"
                                      value={phoneInput}
                                      onChange={(e) => setPhoneInput(e.target.value)}
                                      placeholder="Enter phone number"
                                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2 mt-2">
                                    <button
                                      type="button"
                                      onClick={() => setShowPhoneForm(false)}
                                      className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleUpdatePhoneNumber}
                                      disabled={!phoneInput || recoveryLoading}
                                      className={`px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!phoneInput || recoveryLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                      {recoveryLoading ? 'Saving...' : 'Save'}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                            {!showPhoneForm && (
                              <button
                                type="button"
                                onClick={() => {
                                  setPhoneInput(user?.phoneNumber?.replace(/^\+/, '') || '');
                                  setShowPhoneForm(true);
                                  setShowRecoveryEmailForm(false);
                                }}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                              >
                                {user?.phoneNumber ? 'Change' : 'Add'}
                              </button>
                            )}
                          </div>
                          
                          {/* Status Messages */}
                          {recoveryError && (
                            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-100">
                              {recoveryError}
                            </div>
                          )}
                          {recoverySuccess && (
                            <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-100">
                              {recoverySuccess}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

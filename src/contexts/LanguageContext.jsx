import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTranslation } from '../i18n/translations';

// Languages list with English names and native names
const languages = [
  { code: 'ar', name: 'العربية', enName: 'Arabic' },
  { code: 'bn', name: 'বাংলা', enName: 'Bengali' },
  { code: 'zh', name: '中文 (简体)', enName: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: '中文 (繁體)', enName: 'Chinese (Traditional)' },
  { code: 'cs', name: 'Čeština', enName: 'Czech' },
  { code: 'da', name: 'Dansk', enName: 'Danish' },
  { code: 'nl', name: 'Nederlands', enName: 'Dutch' },
  { code: 'en', name: 'English', enName: 'English' },
  { code: 'fil', name: 'Filipino', enName: 'Filipino' },
  { code: 'fi', name: 'Suomi', enName: 'Finnish' },
  { code: 'fr', name: 'Français', enName: 'French' },
  { code: 'de', name: 'Deutsch', enName: 'German' },
  { code: 'el', name: 'Ελληνικά', enName: 'Greek' },
  { code: 'he', name: 'עברית', enName: 'Hebrew' },
  { code: 'hi', name: 'हिंदी', enName: 'Hindi' },
  { code: 'hu', name: 'Magyar', enName: 'Hungarian' },
  { code: 'id', name: 'Bahasa Indonesia', enName: 'Indonesian' },
  { code: 'it', name: 'Italiano', enName: 'Italian' },
  { code: 'ja', name: '日本語', enName: 'Japanese' },
  { code: 'ko', name: '한국어', enName: 'Korean' },
  { code: 'ms', name: 'Bahasa Melayu', enName: 'Malay' },
  { code: 'no', name: 'Norsk', enName: 'Norwegian' },
  { code: 'fa', name: 'فارسی', enName: 'Persian' },
  { code: 'pl', name: 'Polski', enName: 'Polish' },
  { code: 'pt', name: 'Português (Brasil)', enName: 'Portuguese (Brazil)' },
  { code: 'pt-PT', name: 'Português (Portugal)', enName: 'Portuguese (Portugal)' },
  { code: 'ro', name: 'Română', enName: 'Romanian' },
  { code: 'ru', name: 'Русский', enName: 'Russian' },
  { code: 'sr', name: 'Српски', enName: 'Serbian' },
  { code: 'es', name: 'Español', enName: 'Spanish' },
  { code: 'es-419', name: 'Español (Latinoamérica)', enName: 'Spanish (Latin America)' },
  { code: 'sv', name: 'Svenska', enName: 'Swedish' },
  { code: 'ta', name: 'தமிழ்', enName: 'Tamil' },
  { code: 'te', name: 'తెలుగు', enName: 'Telugu' },
  { code: 'th', name: 'ไทย', enName: 'Thai' },
  { code: 'tr', name: 'Türkçe', enName: 'Turkish' },
  { code: 'uk', name: 'Українська', enName: 'Ukrainian' },
  { code: 'ur', name: 'اردو', enName: 'Urdu' },
  { code: 'vi', name: 'Tiếng Việt', enName: 'Vietnamese' },
];

// Default language
const defaultLanguage = 'en';

// Create context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || defaultLanguage;
    setLanguage(savedLanguage);
    setIsLoading(false);
    
    // Listen for storage events to handle language changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'selectedLanguage' && e.newValue !== language) {
        setLanguage(e.newValue || defaultLanguage);
      }
    };
    
    // Add event listener for custom language change event
    const handleLanguageChanged = (e) => {
      if (e.detail?.language && e.detail.language !== language) {
        setLanguage(e.detail.language);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languageChanged', handleLanguageChanged);
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChanged', handleLanguageChanged);
    };
  }, []);

  // Update language in state and localStorage
  const changeLanguage = useCallback((langCode) => {
    console.log('Changing language to:', langCode);
    // Only update if the language is actually changing
    if (language !== langCode) {
      setLanguage(langCode);
      localStorage.setItem('selectedLanguage', langCode);
      
      // Force a state update to ensure re-render
      setLanguage(prev => {
        // If the language is the same as before, force a change by returning a new reference
        return prev === langCode ? `${langCode}-${Date.now()}` : langCode;
      });
      
      // Dispatch a custom event to notify components of the language change
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: langCode } 
      }));
      
      return Promise.resolve();
    }
    return Promise.resolve();
  }, [language]);

  // Get current language info
  const getCurrentLanguage = useCallback(() => {
    return languages.find(lang => lang.code === language) || 
           languages.find(lang => lang.code === defaultLanguage);
  }, [language]);

  // Get valid language code with fallback
  const getValidLanguage = (lang) => {
    const validLang = languages.some(l => l.code === lang) ? lang : defaultLanguage;
    return validLang || 'en'; // Fallback to 'en' if everything else fails
  };

  // Format date based on current language
  const formatDate = (date, options = {}) => {
    try {
      const lang = getValidLanguage(language);
      return new Date(date).toLocaleDateString(lang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return new Date(date).toLocaleDateString('en', options);
    }
  };

  // Format number based on current language
  const formatNumber = (number, options = {}) => {
    try {
      const lang = getValidLanguage(language);
      return new Intl.NumberFormat(lang, {
        style: 'decimal',
        ...options
      }).format(number);
    } catch (error) {
      console.error('Error formatting number:', error);
      return new Intl.NumberFormat('en', options).format(number);
    }
  };

  // Format currency based on current language
  const formatCurrency = (amount, currency = 'USD', options = {}) => {
    try {
      const lang = getValidLanguage(language);
      return new Intl.NumberFormat(lang, {
        style: 'currency',
        currency,
        ...options
      }).format(amount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency,
        ...options
      }).format(amount);
    }
  };

  // Translation function that can be used throughout the app
  const t = useCallback((key, params = {}) => {
    return getTranslation(key, language, params);
  }, [language]);
  
  // Show loading state if needed
  if (isLoading) {
    return <div>Loading language preferences...</div>;
  }

  return (
    <LanguageContext.Provider 
      value={{
        language,
        languages,
        changeLanguage,
        getCurrentLanguage,
        formatDate,
        formatNumber,
        formatCurrency,
        t, // Add translation function to context
        isLoading
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;

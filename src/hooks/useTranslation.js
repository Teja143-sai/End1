import { useContext, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n/translations';

export const useTranslation = () => {
  const { language, t: contextT } = useLanguage();
  
  // Use the context's t function if available, otherwise use the local one
  const t = useCallback((key, params = {}) => {
    if (contextT) {
      return contextT(key, params);
    }
    return getTranslation(key, language, params);
  }, [language, contextT]);
  
  return { t, language };
};

export default useTranslation;

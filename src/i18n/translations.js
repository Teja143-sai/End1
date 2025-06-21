export const translations = {
  en: {
    hero: {
      title: "Sharpen Your Interview Skills, {anytime}, {anywhere}",
      subtitle: "Connect with professionals worldwide to practice interviews, gain confidence, and land your dream job. No experience necessary – just a willingness to learn and grow.",
      ctaPrimary: "Get Started - It's Free",
      ctaSecondary: "How It Works"
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      success: "Success!"
    }
  },
  es: {
    hero: {
      title: "Mejora tus Habilidades de Entrevista, {anytime}, {anywhere}",
      subtitle: "Conéctate con profesionales de todo el mundo para practicar entrevistas, ganar confianza y conseguir el trabajo de tus sueños. No se necesita experiencia, solo ganas de aprender y crecer.",
      ctaPrimary: "Comienza Ahora - Es Gratis",
      ctaSecondary: "Cómo Funciona"
    },
    common: {
      loading: "Cargando...",
      error: "Ocurrió un error",
      success: "¡Éxito!"
    }
  },
  fr: {
    hero: {
      title: "Améliorez vos Compétences d'Entretien, {anytime}, {anywhere}",
      subtitle: "Connectez-vous avec des professionnels du monde entier pour vous entraîner aux entretiens, gagner en confiance et décrocher le poste de vos rêves. Aucune expérience requise, juste l'envie d'apprendre et de progresser.",
      ctaPrimary: "Commencer - C'est Gratuit",
      ctaSecondary: "Comment ça Marche"
    },
    common: {
      loading: "Chargement...",
      error: "Une erreur est survenue",
      success: "Succès !"
    }
  },
  // Add more languages as needed
};

export const getTranslation = (key, language = 'en', params = {}) => {
  const keys = key.split('.');
  let translation = translations[language] || translations['en'];
  
  for (const k of keys) {
    if (translation && translation[k] !== undefined) {
      translation = translation[k];
    } else {
      // Fallback to English if translation not found
      const enTranslation = keys.reduce((obj, k) => (obj && obj[k] !== undefined) ? obj[k] : key, translations['en'] || {});
      return typeof enTranslation === 'string' ? replaceParams(enTranslation, params) : key;
    }
  }
  
  return typeof translation === 'string' ? replaceParams(translation, params) : key;
};

const replaceParams = (str, params) => {
  return Object.keys(params).reduce((result, key) => {
    return result.replace(new RegExp(`{${key}}`, 'g'), params[key]);
  }, str);
};

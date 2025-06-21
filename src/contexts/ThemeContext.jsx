import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

// Default values
const DEFAULT_ACCENT_COLOR = '#0d9488';
const DEFAULT_FONT_SIZE = 'medium'; // 'small' | 'medium' | 'large' | 'xlarge'

// Font size mappings
const FONT_SIZES = {
  small: '0.875rem',
  medium: '1rem',
  large: '1.125rem',
  xlarge: '1.25rem'
};

// Helper function to apply accent color to CSS variables
const applyAccentColor = (color) => {
  const root = document.documentElement;
  
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  
  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };
  
  // Generate color variants in HSL format for better color manipulation
  const { r, g, b } = hexToRgb(color);
  const { h, s, l } = rgbToHsl(r, g, b);
  
  // Set base color in HSL format
  root.style.setProperty('--color-primary-h', h.toString());
  root.style.setProperty('--color-primary-s', `${s}%`);
  root.style.setProperty('--color-primary-l', `${l}%`);
  
  // Set the color as an RGB string for direct usage
  root.style.setProperty('--color-primary-rgb', `${r} ${g} ${b}`);
  
  // Set light variants
  root.style.setProperty('--color-primary-light-h', h.toString());
  root.style.setProperty('--color-primary-light-s', `${s}%`);
  root.style.setProperty('--color-primary-light-l', `${Math.min(95, l + 10)}%`);
  
  // Set dark variants
  root.style.setProperty('--color-primary-dark-h', h.toString());
  root.style.setProperty('--color-primary-dark-s', `${s}%`);
  root.style.setProperty('--color-primary-dark-l', `${Math.max(10, l - 10)}%`);
  
  // Set CSS custom properties for Tailwind
  root.style.setProperty('--color-primary', `hsl(${h}, ${s}%, ${l}%)`);
  root.style.setProperty('--color-primary-light', `hsl(${h}, ${s}%, ${Math.min(95, l + 10)}%)`);
  root.style.setProperty('--color-primary-dark', `hsl(${h}, ${s}%, ${Math.max(10, l - 10)}%)`);
  
  // Save to localStorage
  localStorage.setItem('accentColor', color);
};

// Helper function to apply font size to document
const applyFontSize = (size) => {
  const root = document.documentElement;
  const sizeValue = FONT_SIZES[size] || FONT_SIZES.medium;
  
  console.log('Applying font size:', size, 'Value:', sizeValue);
  
  // Set the base font size
  root.style.setProperty('--font-size-base', sizeValue);
  
  // Update font size variables based on the base size
  const baseSize = parseFloat(sizeValue);
  const scale = baseSize / 16; // 16px is the default browser font size
  
  console.log('Base size:', baseSize, 'Scale:', scale);
  
  // Set CSS custom properties for different text sizes
  const textSizes = {
    '--text-xs': `${0.75 * scale}rem`,
    '--text-sm': `${0.875 * scale}rem`,
    '--text-base': `${1 * scale}rem`,
    '--text-lg': `${1.125 * scale}rem`,
    '--text-xl': `${1.25 * scale}rem`,
    '--text-2xl': `${1.5 * scale}rem`,
    '--text-3xl': `${1.875 * scale}rem`,
    '--text-4xl': `${2.25 * scale}rem`,
    '--text-5xl': `${3 * scale}rem`,
    '--text-6xl': `${3.75 * scale}rem`
  };
  
  // Apply all text sizes
  Object.entries(textSizes).forEach(([key, value]) => {
    root.style.setProperty(key, value);
    console.log(`Set ${key} to ${value}`);
  });
  
  // Log the computed style to verify
  const computedStyle = window.getComputedStyle(root);
  console.log('Computed --font-size-base:', computedStyle.getPropertyValue('--font-size-base'));
  console.log('Computed --text-base:', computedStyle.getPropertyValue('--text-base'));
  
  // Force a reflow to ensure the changes are applied
  // eslint-disable-next-line no-unused-expressions
  root.offsetHeight;
};

// Create the context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT_COLOR);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [uiDensity, setUiDensity] = useState('comfortable');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  // Apply density settings to the document
  const applyDensity = useCallback((density) => {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    
    // Reset all density classes
    root.classList.remove('density-compact', 'density-comfortable', 'density-spacious');
    
    // Add the selected density class
    root.classList.add(`density-${density}`);
    
    // Set CSS custom properties based on density
    const densityValues = {
      compact: {
        '--spacing-1': '0.25rem',
        '--spacing-2': '0.5rem',
        '--spacing-3': '0.75rem',
        '--spacing-4': '1rem',
        '--spacing-5': '1.25rem',
        '--spacing-6': '1.5rem',
        '--spacing-8': '2rem',
        '--spacing-10': '2.5rem',
        '--spacing-12': '3rem',
        '--spacing-16': '4rem',
        '--spacing-20': '5rem',
        '--spacing-24': '6rem',
      },
      comfortable: {
        '--spacing-1': '0.25rem',
        '--spacing-2': '0.5rem',
        '--spacing-3': '1rem',
        '--spacing-4': '1.25rem',
        '--spacing-5': '1.5rem',
        '--spacing-6': '2rem',
        '--spacing-8': '2.5rem',
        '--spacing-10': '3rem',
        '--spacing-12': '3.5rem',
        '--spacing-16': '4.5rem',
        '--spacing-20': '6rem',
        '--spacing-24': '8rem',
      },
      spacious: {
        '--spacing-1': '0.5rem',
        '--spacing-2': '1rem',
        '--spacing-3': '1.5rem',
        '--spacing-4': '2rem',
        '--spacing-5': '2.5rem',
        '--spacing-6': '3rem',
        '--spacing-8': '4rem',
        '--spacing-10': '5rem',
        '--spacing-12': '6rem',
        '--spacing-16': '8rem',
        '--spacing-20': '10rem',
        '--spacing-24': '12rem',
      },
    };
    
    // Apply the density values
    const selectedDensity = densityValues[density] || densityValues.comfortable;
    Object.entries(selectedDensity).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  // Toggle between light and dark theme
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);
  
  // Toggle animations
  const toggleAnimations = useCallback((enabled) => {
    return new Promise((resolve) => {
      const newValue = enabled !== undefined ? enabled : !animationsEnabled;
      setAnimationsEnabled(newValue);
      localStorage.setItem('animationsEnabled', JSON.stringify(newValue));
      
      // Apply to document
      const root = document.documentElement;
      if (newValue) {
        root.style.setProperty('--animation-duration', '0.2s');
        root.style.setProperty('--animation-timing', 'ease-in-out');
        root.classList.remove('no-animations');
      } else {
        root.style.setProperty('--animation-duration', '0s');
        root.style.setProperty('--animation-timing', 'step-start');
        root.classList.add('no-animations');
      }
      
      // Ensure state is updated before resolving
      setTimeout(() => resolve(newValue), 0);
    });
  }, [animationsEnabled]);

  // Update accent color
  const updateAccentColor = useCallback((newColor) => {
    setAccentColor(newColor);
    applyAccentColor(newColor);
  }, []);

  // Update font size
  const updateFontSize = useCallback((size) => {
    if (!FONT_SIZES[size]) return;
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    applyFontSize(size);
  }, []);

  // Initialize theme, accent color, font size, density, and animations on component mount
  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
    
    // Load saved accent color
    const savedAccentColor = localStorage.getItem('accentColor') || DEFAULT_ACCENT_COLOR;
    setAccentColor(savedAccentColor);
    applyAccentColor(savedAccentColor);
    
    // Load saved font size and apply it immediately
    const savedFontSize = localStorage.getItem('fontSize') || DEFAULT_FONT_SIZE;
    setFontSize(savedFontSize);
    applyFontSize(savedFontSize);
    
    // Load saved UI density and apply it immediately
    const savedDensity = localStorage.getItem('uiDensity') || 'comfortable';
    setUiDensity(savedDensity);
    applyDensity(savedDensity);
    
    // Load saved animations preference
    const savedAnimations = localStorage.getItem('animationsEnabled');
    if (savedAnimations !== null) {
      const animationsEnabled = JSON.parse(savedAnimations);
      setAnimationsEnabled(animationsEnabled);
      toggleAnimations(animationsEnabled);
    }
    
    setIsMounted(true);
  }, [systemPrefersDark, toggleAnimations]);

  // Apply theme class, accent color, and font size to document element
  useEffect(() => {
    if (!isMounted) return;
    
    const root = window.document.documentElement;
    
    // Apply theme class
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply accent color and font size
    applyAccentColor(accentColor);
    applyFontSize(fontSize);
    
  }, [theme, accentColor, fontSize, isMounted]);

  // Update density settings
  const updateDensity = useCallback((density) => {
    setUiDensity(density);
    localStorage.setItem('uiDensity', density);
    applyDensity(density);
  }, [applyDensity]);

  // Don't render until theme is initialized
  if (!isMounted) {
    return <div className={theme} />;
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme,
        accentColor, 
        updateAccentColor,
        fontSize,
        updateFontSize,
        fontSizes: Object.keys(FONT_SIZES),
        uiDensity,
        updateDensity,
        uiDensities: ['compact', 'comfortable', 'spacious'],
        animationsEnabled,
        toggleAnimations
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

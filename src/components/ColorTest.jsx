import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ColorTest = () => {
  const { accentColor } = useTheme();
  const [hslValues, setHslValues] = useState({ h: 0, s: 0, l: 0 });

  useEffect(() => {
    // Get computed styles for HSL values
    const root = getComputedStyle(document.documentElement);
    const h = root.getPropertyValue('--color-primary-h');
    const s = root.getPropertyValue('--color-primary-s');
    const l = root.getPropertyValue('--color-primary-l');
    
    setHslValues({
      h: h.trim(),
      s: s.trim(),
      l: l.trim()
    });
  }, [accentColor]);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-w-xs">
      <h3 className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">Accent Color Test</h3>
      
      <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-center">
            <div 
              className="w-12 h-12 mx-auto rounded-md mb-1 border border-gray-200 dark:border-gray-600"
              style={{ 
                backgroundColor: `hsl(${hslValues.h} ${hslValues.s} ${hslValues.l})`
              }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-300">Base</span>
          </div>
          <div className="text-center">
            <div 
              className="w-12 h-12 mx-auto rounded-md mb-1 border border-gray-200 dark:border-gray-600"
              style={{ 
                backgroundColor: `hsl(${hslValues.h} ${hslValues.s} ${Math.min(95, parseInt(hslValues.l) + 10)}%)`
              }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-300">Light</span>
          </div>
          <div className="text-center">
            <div 
              className="w-12 h-12 mx-auto rounded-md mb-1 border border-gray-200 dark:border-gray-600"
              style={{ 
                backgroundColor: `hsl(${hslValues.h} ${hslValues.s} ${Math.max(10, parseInt(hslValues.l) - 10)}%)`
              }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-300">Dark</span>
          </div>
        </div>
        
        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
          <div className="flex justify-between">
            <span>Hex:</span>
            <span className="font-mono text-gray-800 dark:text-gray-100">{accentColor}</span>
          </div>
          <div className="flex justify-between">
            <span>HSL:</span>
            <span className="font-mono text-gray-800 dark:text-gray-100">
              {Math.round(parseInt(hslValues.h))}° {parseInt(hslValues.s)}% {parseInt(hslValues.l)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 italic">
        <p>Changes apply immediately and are saved automatically.</p>
      </div>
    </div>
  );
};

export default ColorTest;

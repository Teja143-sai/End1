/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'dark',
    'light',
    'text-primary-dark',
    'hover:text-primary-dark'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Brand colors - using CSS variables for dynamic theming
        primary: {
          DEFAULT: 'hsl(var(--color-primary-h) var(--color-primary-s) var(--color-primary-l) / <alpha-value>)',
          50: 'hsl(var(--color-primary-h) var(--color-primary-s) 97% / <alpha-value>)',
          100: 'hsl(var(--color-primary-h) var(--color-primary-s) 94% / <alpha-value>)',
          200: 'hsl(var(--color-primary-h) var(--color-primary-s) 86% / <alpha-value>)',
          300: 'hsl(var(--color-primary-h) var(--color-primary-s) 77% / <alpha-value>)',
          400: 'hsl(var(--color-primary-h) var(--color-primary-s) 65% / <alpha-value>)',
          500: 'hsl(var(--color-primary-h) var(--color-primary-s) 55% / <alpha-value>)',
          600: 'hsl(var(--color-primary-h) var(--color-primary-s) 45% / <alpha-value>)',
          700: 'hsl(var(--color-primary-h) var(--color-primary-s) 35% / <alpha-value>)',
          800: 'hsl(var(--color-primary-h) var(--color-primary-s) 25% / <alpha-value>)',
          900: 'hsl(var(--color-primary-h) var(--color-primary-s) 15% / <alpha-value>)',
        },
        'primary-dark': {
          DEFAULT: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) var(--color-primary-dark-l) / <alpha-value>)',
          50: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) calc(var(--color-primary-dark-l) + 30%) / <alpha-value>)',
          100: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) calc(var(--color-primary-dark-l) + 25%) / <alpha-value>)',
          200: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) calc(var(--color-primary-dark-l) + 15%) / <alpha-value>)',
          300: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) calc(var(--color-primary-dark-l) + 7%) / <alpha-value>)',
          400: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) calc(var(--color-primary-dark-l) + 3%) / <alpha-value>)',
          500: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) var(--color-primary-dark-l) / <alpha-value>)',
          600: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) calc(var(--color-primary-dark-l) - 10%) / <alpha-value>)',
          700: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) calc(var(--color-primary-dark-l) - 20%) / <alpha-value>)',
          800: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) calc(var(--color-primary-dark-l) - 30%) / <alpha-value>)',
          900: 'hsl(var(--color-primary-dark-h) var(--color-primary-dark-s) calc(var(--color-primary-dark-l) - 40%) / <alpha-value>)',
        },
        // Secondary color palette (using lavender tones)
        secondary: {
          50: '#f9f7ff',
          100: '#f1ecff',
          200: '#e4d9ff',
          300: '#d0c0ff',
          400: '#b8a2ff',
          500: '#9b7fff',
          600: '#7f5af0',
          700: '#6b46c1',
          800: '#553c9a',
          900: '#46327d',
          DEFAULT: '#E4D9FF',
        },
        // Lavender color palette
        lavender: {
          50: '#faf9ff',
          100: '#f2f0ff',
          200: '#e4d9ff',
          300: '#d0c0ff',
          400: '#b8a2ff',
          500: '#9b7fff',
          600: '#7f5af0',
          700: '#6b46c1',
          800: '#553c9a',
          900: '#46327d',
          DEFAULT: '#E4D9FF',
        },
        // Status colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Garamond', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        'glow': '0 0 15px rgba(67, 56, 202, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'fade-in-down': 'fadeInDown 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1280px',
          },
          '@screen 2xl': {
            maxWidth: '1400px',
          },
        },
      });
    }),
  ],
  corePlugins: {
    container: false, // Disable default container to use our custom one
  },
}

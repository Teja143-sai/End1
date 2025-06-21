import React, { useEffect, useState } from 'react';

const RILogo = ({ size = 40, darkMode = false, iconOnly = false, className = '', animate = true }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const primaryColor = darkMode ? '#E4D9FF' : '#037971';
  const secondaryColor = darkMode ? '#037971' : '#E4D9FF';
  const bgColor = darkMode ? '#0F172A' : '#F1F5F9';
  
  useEffect(() => {
    if (animate) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [animate]);
  
  const icon = (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-500 ${className} ${isAnimating ? 'scale-110' : 'scale-100'}`}
    >
      {/* Background Circle with subtle gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={darkMode ? '#1E293B' : '#F8FAFC'} />
          <stop offset="100%" stopColor={darkMode ? '#0F172A' : '#E2E8F0'} />
        </linearGradient>
      </defs>
      
      <circle cx="100" cy="100" r="90" fill="url(#logoGradient)" className="transition-colors duration-500" />
      
      {/* Abstract Connection Elements with animation */}
      <g className="transition-all duration-700" style={{
        transformOrigin: 'center',
        transform: isAnimating ? 'rotate(5deg)' : 'rotate(0deg)'
      }}>
        {/* Top arc (Interviewer) */}
        <path 
          d="M60 100C60 77.9086 77.9086 60 100 60C122.091 60 140 77.9086 140 100" 
          stroke={primaryColor} 
          strokeWidth="14" 
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-500"
        >
          {animate && (
            <animate
              attributeName="stroke-dasharray"
              values="0, 251.2; 125.6, 125.6; 251.2, 0"
              dur="1.5s"
              fill="freeze"
              begin="0.2s"
            />
          )}
        </path>
        
        {/* Bottom arc (Interviewee) */}
        <path 
          d="M100 140C77.9086 140 60 122.091 60 100" 
          stroke={secondaryColor} 
          strokeWidth="14" 
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-500"
        >
          {animate && (
            <animate
              attributeName="stroke-dasharray"
              values="0, 125.6; 62.8, 62.8; 125.6, 0"
              dur="1s"
              fill="freeze"
              begin="0.5s"
            />
          )}
        </path>
      </g>
      
      {/* Connection Dots with pulse animation */}
      <g className="transition-opacity duration-700" style={{
        opacity: isAnimating ? 0 : 1
      }}>
        <circle cx="100" cy="100" r="12" fill={primaryColor} className="transition-colors duration-500">
          {animate && (
            <animate
              attributeName="r"
              values="0;12;10;12"
              dur="1s"
              begin="1s"
              fill="freeze"
            />
          )}
        </circle>
        
        <circle cx="100" cy="60" r="8" fill={primaryColor} className="transition-colors duration-500">
          {animate && (
            <animate
              attributeName="r"
              values="0;8;6;8"
              dur="0.8s"
              begin="0.8s"
              fill="freeze"
            />
          )}
        </circle>
        
        <circle cx="100" cy="140" r="8" fill={secondaryColor} className="transition-colors duration-500">
          {animate && (
            <animate
              attributeName="r"
              values="0;8;6;8"
              dur="0.8s"
              begin="1s"
              fill="freeze"
            />
          )}
        </circle>
      </g>
      
      {/* Subtle motion lines with animation */}
      <g className="transition-opacity duration-700" style={{
        opacity: isAnimating ? 0 : 1
      }}>
        <path 
          d="M100 52V40" 
          stroke={primaryColor} 
          strokeWidth="4" 
          strokeLinecap="round"
          strokeDasharray="4 4"
          opacity="0.8"
          className="transition-colors duration-500"
        >
          {animate && (
            <animate
              attributeName="opacity"
              values="0;0.8"
              dur="0.5s"
              begin="1.5s"
              fill="freeze"
            />
          )}
        </path>
        <path 
          d="M100 160V148" 
          stroke={secondaryColor} 
          strokeWidth="4" 
          strokeLinecap="round"
          strokeDasharray="4 4"
          opacity="0.8"
          className="transition-colors duration-500"
        >
          {animate && (
            <animate
              attributeName="opacity"
              values="0;0.8"
              dur="0.5s"
              begin="1.8s"
              fill="freeze"
            />
          )}
        </path>
      </g>
      
      {/* Subtle glow effect */}
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Subtle pulse effect on the center dot */}
      {animate && (
        <circle 
          cx="100" 
          cy="100" 
          r="20" 
          fill={primaryColor} 
          opacity="0.1"
          className="transition-opacity duration-1000"
          style={{
            animation: 'pulse 2s infinite',
            transformOrigin: 'center'
          }}
        >
          <animate
            attributeName="r"
            values="12;20;12"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.1;0.2;0.1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>
  );

  if (iconOnly) return icon;

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        {icon}
      </div>
      <span className={`ml-3 text-2xl font-garamond font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        RI <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500">Connect</span>
      </span>
    </div>
  );
};

export default RILogo;

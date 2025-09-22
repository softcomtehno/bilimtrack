import React from 'react';

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-70" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/3 right-10 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1.5s' }} />
      
      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-1/6 w-16 h-16 border-2 border-blue-200 rounded-lg rotate-45 opacity-20 animate-spin-slow" />
      <div className="absolute bottom-1/4 right-1/6 w-12 h-12 border-2 border-purple-200 rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-1/2 left-3/4 w-8 h-8 bg-gradient-to-r from-cyan-200 to-blue-200 rounded opacity-25 animate-bounce-slow" />
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path
          d="M100,200 Q300,100 500,300 T900,250"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M200,400 Q400,300 600,500 T1000,450"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </svg>
    </div>
  );
};

export default FloatingElements;
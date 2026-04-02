'use client';

import React, { useEffect, useState } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-surface border border-border-subtle animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500
        ${theme === 'light' 
          ? 'bg-slate-100 text-slate-800 hover:bg-amber-50 hover:text-amber-600' 
          : 'bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-sky-400'
        }
        border border-border-subtle group
      `}
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon */}
        <div className={`
          absolute transition-all duration-500 transform
          ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}
        `}>
          <HiOutlineSun size={24} />
        </div>
        
        {/* Moon Icon */}
        <div className={`
          absolute transition-all duration-500 transform
          ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}
        `}>
          <HiOutlineMoon size={22} />
        </div>
      </div>
      
      {/* Tooltip hint */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-text-primary text-text-inverted text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Switch to {theme === 'light' ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}

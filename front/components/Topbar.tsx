'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineChevronDown, 
  HiOutlineArrowRightOnRectangle, 
  HiOutlineCog6Tooth,
  HiOutlineUser
} from 'react-icons/hi2';
import NotificationBell from './dashboard/NotificationBell';
import ThemeToggle from './ThemeToggle';
import { useModal } from '@/context/ModalContext';

const Topbar = () => {
  const { user, logout } = useAuth();
  const { openModal } = useModal();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  return (
    <header className="h-24 bg-surface/70 backdrop-blur-xl border-b border-border-subtle sticky top-0 z-[50] px-8 flex items-center justify-between transition-colors duration-300">
      {/* Dynamic Breadcrumb / Context */}
      <div className="flex-1">
        <h2 className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em] bg-background-subtle inline-block px-4 py-1.5 rounded-full border border-border-subtle">
          Main Dashboard
        </h2>
      </div>

      {/* Action Cluster */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <button 
          onClick={() => openModal('QUICK_SEARCH')}
          className="hidden lg:flex items-center gap-6 bg-background-subtle border border-border-subtle rounded-2xl px-5 py-3 group hover:bg-surface hover:shadow-premium transition-all duration-300"
        >
          <div className="flex items-center gap-3">
             <HiOutlineMagnifyingGlass className="text-text-tertiary group-hover:text-primary transition-colors" size={18} />
             <span className="text-sm font-bold text-text-tertiary group-hover:text-text-primary transition-colors">Search clinical records...</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-surface rounded-lg text-text-tertiary text-[10px] font-black uppercase tracking-widest border border-border-subtle">
             ⌘ K
          </div>
        </button>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Real-time Notifications */}
          <NotificationBell />
        </div>

        <div className="w-px h-10 bg-border-subtle" />

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-4 bg-background-subtle/50 hover:bg-background-subtle p-1.5 pr-5 rounded-2xl border border-border-subtle transition-all group lg:min-w-[190px]"
          >
            <div className="w-11 h-11 rounded-xl bg-surface shadow-sm flex items-center justify-center text-primary font-black border border-border-subtle">
              {user.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-black text-text-primary leading-none">{user.name.split(' ')[0]}</p>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.1em] mt-1.5 opacity-80">{user.role}</p>
            </div>
            <HiOutlineChevronDown className={`ml-auto text-text-tertiary transition-transform duration-500 ${profileOpen ? 'rotate-180' : ''}`} size={14} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-4 w-72 bg-surface rounded-[2.5rem] border border-border-subtle shadow-modal py-4 z-[100] animate-fade-in divide-y divide-border-subtle overflow-hidden">
              <div className="px-8 py-5 border-b border-border-subtle bg-background-subtle/30">
                <p className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em] mb-2">Signed in as</p>
                <p className="font-bold text-text-primary truncate">{user.email}</p>
              </div>
              
              <div className="py-2">
                <Link href="/settings" className="flex items-center gap-4 px-8 py-4 text-sm font-bold text-text-secondary hover:bg-background-subtle hover:text-primary transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-background-subtle flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <HiOutlineCog6Tooth size={18} />
                  </div>
                  System Settings
                </Link>
                
                <Link href="/settings/personal" className="flex items-center gap-4 px-8 py-4 text-sm font-bold text-text-secondary hover:bg-background-subtle hover:text-primary transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-background-subtle flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <HiOutlineUser size={18} />
                  </div>
                  Profile Settings
                </Link>
              </div>

              <div className="py-2">
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-4 px-8 py-4 text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                    <HiOutlineArrowRightOnRectangle size={18} />
                  </div>
                  Terminate Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;

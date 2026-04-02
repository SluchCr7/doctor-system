'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineCalendar, 
  HiOutlineChevronDown, 
  HiOutlineArrowRightOnRectangle, 
  HiOutlineCog6Tooth,
  HiOutlineUser
} from 'react-icons/hi2';
import NotificationBell from './dashboard/NotificationBell';
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
    <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-slate-50 sticky top-0 z-[50] px-8 flex items-center justify-between">
      {/* Dynamic Breadcrumb / Context */}
      <div className="flex-1">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-50 inline-block px-3 py-1 rounded-lg border border-slate-100">
          Main Dashboard
        </h2>
      </div>

      {/* Action Cluster */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <button 
          onClick={() => openModal('QUICK_SEARCH')}
          className="hidden lg:flex items-center gap-6 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 group hover:bg-white hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
             <HiOutlineMagnifyingGlass className="text-slate-400 group-hover:text-primary transition-colors" size={18} />
             <span className="text-sm font-bold text-slate-400">Search clinical records...</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-100">
             ⌘ K
          </div>
        </button>

        {/* Real-time Notifications */}
        <NotificationBell />

        <div className="w-px h-10 bg-slate-100" />

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-4 bg-slate-50/50 hover:bg-slate-50 p-1.5 pr-4 rounded-2xl border border-slate-100 transition-all group lg:min-w-[180px]"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary font-bold border border-slate-100">
              {user.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-slate-800 leading-none">{user.name.split(' ')[0]}</p>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-1">{user.role}</p>
            </div>
            <HiOutlineChevronDown className={`ml-auto text-slate-400 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} size={14} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-4 w-64 bg-white rounded-[2rem] border border-slate-50 shadow-2xl shadow-slate-200/50 py-3 z-[100] animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-slate-50 mb-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                <p className="font-bold text-slate-900 truncate">{user.email}</p>
              </div>
              
              <Link href="/settings" className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                <HiOutlineCog6Tooth size={18} />
                System Settings
              </Link>
              
              <Link href="/settings/personal" className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                <HiOutlineUser size={18} />
                Profile Settings
              </Link>

              <div className="mt-3 pt-3 border-t border-slate-50">
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-6 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <HiOutlineArrowRightOnRectangle size={18} />
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

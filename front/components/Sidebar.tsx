'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  HiOutlineHome, 
  HiOutlineUsers, 
  HiOutlineCalendar, 
  HiOutlineCurrencyDollar, 
  HiOutlineChartBar, 
  HiOutlineCog6Tooth, 
  HiOutlineArrowRightOnRectangle,
  HiChevronDown,
  HiOutlineSquares2X2
} from 'react-icons/hi2';
import { FiActivity } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  if (!user) return null;

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <HiOutlineHome size={20} />,
      roles: ['patient', 'doctor', 'admin']
    },
    {
      title: 'My Appointments',
      path: '/appointments',
      icon: <HiOutlineCalendar size={20} />,
      roles: ['patient']
    },
    {
      title: 'Manage Patients',
      path: '/patients',
      icon: <HiOutlineUsers size={20} />,
      roles: ['doctor', 'admin'],
      submenu: [
        { title: 'All Patients', path: '/patients' },
        { title: 'New Records', path: '/patients/new' }
      ]
    },
    {
      title: 'Clinic Schedule',
      path: '/appointments',
      icon: <HiOutlineCalendar size={20} />,
      roles: ['doctor', 'admin'],
      submenu: [
        { title: 'Calendar View', path: '/appointments/calendar' },
        { title: 'Manage Slots', path: '/appointments' }
      ]
    },
    {
      title: 'Finance & Billing',
      path: '/billing',
      icon: <HiOutlineCurrencyDollar size={20} />,
      roles: ['doctor', 'admin']
    },
    {
      title: 'Analytics',
      path: '/reports',
      icon: <HiOutlineChartBar size={20} />,
      roles: ['doctor', 'admin']
    },
    {
      title: 'Account Settings',
      path: '/settings',
      icon: <HiOutlineCog6Tooth size={20} />,
      roles: ['patient', 'doctor', 'admin']
    }
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-surface border-r border-border-subtle z-[60] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col shadow-subtle ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
      {/* Brand Header */}
      <div className="h-24 flex items-center px-6 relative">
        <Link href="/" className="flex items-center gap-3 group overflow-hidden">
          <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-white shadow-premium group-hover:scale-110 transition-transform duration-300">
            <FiActivity size={24} />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-black text-2xl text-text-primary tracking-tight"
            >
              Doc<span className="text-primary italic">Clinic</span>
            </motion.span>
          )}
        </Link>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-9 w-8 h-8 bg-surface border border-border-subtle rounded-xl flex items-center justify-center text-text-tertiary hover:text-primary hover:shadow-premium transition-all z-10"
        >
          <HiOutlineSquares2X2 size={16} />
        </button>
      </div>

      {/* User Information */}
      {!isCollapsed && (
        <div className="mx-6 mb-6 p-4 rounded-3xl bg-background-subtle border border-border-subtle backdrop-blur-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-surface flex items-center justify-center text-primary font-black shadow-sm border border-border-subtle">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-text-primary truncate">{user.name}</p>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.1em] mt-1 opacity-80">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 custom-scrollbar">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          const hasSubmenu = !!item.submenu;
          const isSubmenuOpen = openSubmenu === item.title;

          return (
            <div key={item.title}>
              {hasSubmenu ? (
                <div>
                  <button
                    onClick={() => !isCollapsed && toggleSubmenu(item.title)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-background-subtle hover:text-text-primary'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'group-hover:text-primary group-hover:scale-110'}`}>
                        {item.icon}
                      </span>
                      {!isCollapsed && <span className="text-sm font-bold tracking-tight">{item.title}</span>}
                    </div>
                    {!isCollapsed && (
                      <HiChevronDown className={`transition-transform duration-500 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  <AnimatePresence>
                    {isSubmenuOpen && !isCollapsed && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-background-subtle/40 rounded-2xl mt-1 mx-2 divide-y divide-border-subtle/20"
                      >
                        {item.submenu!.map(sub => (
                          <Link 
                            key={sub.path} 
                            href={sub.path}
                            className={`block py-3.5 px-10 text-sm font-bold transition-all duration-200 ${pathname === sub.path ? 'text-primary bg-primary/5' : 'text-text-tertiary hover:text-primary hover:bg-primary/5'}`}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-primary text-text-inverted shadow-premium' : 'text-text-secondary hover:bg-background-subtle hover:text-text-primary'}`}
                >
                  <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:text-primary'}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="text-sm font-bold tracking-tight">{item.title}</span>}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-5 border-t border-border-subtle space-y-3">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all group"
        >
          <div className={`w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
            <HiOutlineArrowRightOnRectangle size={20} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          {!isCollapsed && <span className="text-sm font-black tracking-tight">Logout Session</span>}
        </button>
        {!isCollapsed && (
          <div className="py-2 text-center">
            <p className="text-[10px] text-text-tertiary font-black uppercase tracking-[0.2em] opacity-50">
              ClinicDoc v2.5.0
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

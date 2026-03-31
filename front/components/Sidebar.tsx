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
      className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-100 z-[60] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)] ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
      {/* Brand Header */}
      <div className="h-24 flex items-center px-6 relative">
        <Link href="/" className="flex items-center gap-3 group overflow-hidden">
          <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            <FiActivity size={24} />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-black text-2xl text-slate-900 tracking-tight"
            >
              Doc<span className="text-primary italic">Clinic</span>
            </motion.span>
          )}
        </Link>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-9 w-8 h-8 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-lg transition-all z-10"
        >
          <HiOutlineSquares2X2 size={16} />
        </button>
      </div>

      {/* User Information */}
      {!isCollapsed && (
        <div className="mx-6 mb-6 p-4 rounded-3xl bg-slate-50/80 border border-slate-100/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary font-bold shadow-sm border border-slate-100/50">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-0.5">{user.role}</p>
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
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-primary/5 text-primary' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`}>
                        {item.icon}
                      </span>
                      {!isCollapsed && <span className="text-sm font-bold">{item.title}</span>}
                    </div>
                    {!isCollapsed && (
                      <HiChevronDown className={`transition-transform duration-300 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  <AnimatePresence>
                    {isSubmenuOpen && !isCollapsed && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-50/50 rounded-2xl mt-1 mx-2"
                      >
                        {item.submenu!.map(sub => (
                          <Link 
                            key={sub.path} 
                            href={sub.path}
                            className={`block py-3 px-10 text-sm font-bold transition-colors ${pathname === sub.path ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
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
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <span className={`transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="text-sm font-bold">{item.title}</span>}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-50 space-y-2">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all group"
        >
          <HiOutlineArrowRightOnRectangle size={20} className="group-hover:-translate-x-1 transition-transform" />
          {!isCollapsed && <span className="text-sm font-bold">Logout Session</span>}
        </button>
        {!isCollapsed && (
          <p className="text-[10px] text-slate-300 font-bold text-center uppercase tracking-widest py-2">
            HealthCore v2.1.0
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

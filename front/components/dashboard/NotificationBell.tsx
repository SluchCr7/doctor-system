"use client";
import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineBell, HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi2';
import { useNotifications } from '@/context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

const NotificationBell = () => {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'appointment': return '🗓️';
            case 'medical_record': return '🏥';
            case 'invoice': return '💰';
            default: return '🔔';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 rounded-2xl bg-white border border-slate-100 text-slate-500 hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all active:scale-95"
            >
                <HiOutlineBell size={22} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full ring-4 ring-white animate-bounce-slow">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-4 w-[380px] bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-50 overflow-hidden z-[100] animate-in slide-in-from-top-2 duration-300">
                    <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black italic">Alert Center</h3>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                                {unreadCount} unread notifications
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <button 
                                onClick={markAllAsRead}
                                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                            >
                                Mark All Read
                            </button>
                        )}
                    </div>

                    <div className="max-h-[450px] overflow-y-auto divide-y divide-slate-50">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <div 
                                    key={notif._id}
                                    onClick={() => !notif.isRead && markAsRead(notif._id)}
                                    className={`p-6 hover:bg-slate-50 transition-all cursor-pointer group ${!notif.isRead ? 'bg-primary/5' : ''}`}
                                >
                                    <div className="flex gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-sm border ${!notif.isRead ? 'bg-white border-primary/20' : 'bg-slate-100 border-slate-200'}`}>
                                            {getTypeIcon(notif.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className={`text-sm font-black truncate ${!notif.isRead ? 'text-slate-900' : 'text-slate-500'}`}>
                                                    {notif.title}
                                                </p>
                                                {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0 ml-2" />}
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed mb-3">
                                                {notif.message}
                                            </p>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-tighter">
                                                <HiOutlineClock size={12} />
                                                {formatDistanceToNow(new Date(notif.createdAt))} ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-20 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                                    <HiOutlineCheckCircle size={32} />
                                </div>
                                <p className="text-slate-400 font-bold italic">No alerts found. You're all caught up!</p>
                            </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
                            <button className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">
                                View Activity Log
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;

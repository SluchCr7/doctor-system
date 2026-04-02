'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { HiOutlineSun, HiOutlineMoon, HiOutlineDesktopComputer } from 'react-icons/hi';
import { FiCheckCircle } from 'react-icons/fi';

export default function AppearanceSettings() {
    const { theme, setTheme } = useTheme();

    const themes = [
        {
            id: 'light',
            name: 'Light Mode',
            description: 'Clean and professional medical interface.',
            icon: HiOutlineSun,
            preview: 'bg-slate-50',
            accent: 'bg-primary'
        },
        {
            id: 'dark',
            name: 'Dark Mode',
            description: 'Reduced eye strain for clinical usage.',
            icon: HiOutlineMoon,
            preview: 'bg-slate-900',
            accent: 'bg-sky-400'
        }
    ];

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-2xl font-black text-text-primary tracking-tight mb-2">Appearance Settings</h2>
                <p className="text-text-secondary text-sm font-medium">Customize how ClinicDoc looks on your device.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themes.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id as 'light' | 'dark')}
                        className={`
                            relative text-left p-6 rounded-[2rem] border-2 transition-all duration-300 group
                            ${theme === t.id 
                                ? 'border-primary bg-primary/5 ring-4 ring-primary/10' 
                                : 'border-border-subtle bg-surface hover:border-text-tertiary shadow-subtle'
                            }
                        `}
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                                ${theme === t.id ? 'bg-primary text-white' : 'bg-background-subtle text-text-tertiary group-hover:bg-primary/10 group-hover:text-primary'}
                            `}>
                                <t.icon size={24} />
                            </div>
                            {theme === t.id && (
                                <FiCheckCircle className="text-primary w-6 h-6 animate-scale-in" />
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-black text-text-primary leading-tight">{t.name}</h3>
                                <p className="text-[10px] font-bold text-text-tertiary mt-1">{t.description}</p>
                            </div>

                            {/* Mini Preview Widget */}
                            <div className={`w-full h-24 rounded-2xl ${t.preview} p-3 border border-border-subtle/20 overflow-hidden relative`}>
                                <div className="flex gap-2 mb-2">
                                    <div className={`w-1/3 h-2 rounded-full ${t.accent} opacity-50`}></div>
                                    <div className="w-1/4 h-2 rounded-full bg-white/20"></div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="w-full h-1.5 rounded-full bg-white/10"></div>
                                    <div className="w-4/5 h-1.5 rounded-full bg-white/10"></div>
                                    <div className="w-2/3 h-1.5 rounded-full bg-white/10"></div>
                                </div>
                                
                                {t.id === 'dark' && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 to-transparent pointer-events-none"></div>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="p-8 rounded-[2rem] bg-background-subtle border border-border-subtle flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary shadow-sm">
                    <HiOutlineDesktopComputer size={20} />
                </div>
                <div>
                    <h4 className="font-black text-sm text-text-primary mb-1">System Preference Detection</h4>
                    <p className="text-xs font-bold text-text-tertiary leading-relaxed">
                        ClinicDoc automatically detects your operating system theme upon first visit. 
                        Changing the theme manually will persist your preference across all your devices.
                    </p>
                </div>
            </div>
        </div>
    );
}

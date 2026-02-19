"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FiGlobe,
    FiClock,
    FiBell,
    FiLock,
    FiUser,
    FiSave
} from "react-icons/fi";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { label: "Clinic Profile", icon: FiGlobe, path: "/settings/clinic" },
        { label: "Working Hours", icon: FiClock, path: "/settings/hours" },
        { label: "Notifications", icon: FiBell, path: "/settings/notifications" },
        { label: "Security & 2FA", icon: FiLock, path: "/settings/security" },
        { label: "Account", icon: FiUser, path: "/settings/account" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Settings</h1>
                    <p className="text-slate-500 text-sm font-medium">Configure clinic details, notifications, and security protocols</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2 space-y-1">
                        {navItems.map(item => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-500 hover:bg-slate-50"
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

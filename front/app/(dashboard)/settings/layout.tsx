"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    FiUser, FiGlobe, FiClock, FiBell, FiLock, FiSave,
    FiShield, FiCreditCard, FiHeart, FiCalendar, FiEye,
    FiSmartphone, FiActivity
} from "react-icons/fi";
import { HiOutlineChevronRight } from "react-icons/hi2";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();

    const doctorNav = [
        {
            group: "Practice Management",
            items: [
                { label: "Clinic Information", icon: FiGlobe, path: "/settings/clinic", desc: "Clinic name, address & contact" },
                { label: "Working Hours", icon: FiClock, path: "/settings/hours", desc: "Schedule & availability" },
                { label: "Doctor Profile", icon: FiUser, path: "/settings/doctor", desc: "Credentials & specialization" },
            ]
        },
        {
            group: "Operations",
            items: [
                { label: "Notifications", icon: FiBell, path: "/settings/notifications", desc: "Alerts & reminders" },
                { label: "User Roles & Access", icon: FiShield, path: "/settings/roles", desc: "Staff permissions" },
                { label: "Billing & Subscriptions", icon: FiCreditCard, path: "/settings/billing-plan", desc: "Plan & invoices" },
            ]
        },
        {
            group: "System",
            items: [
                { label: "Security & 2FA", icon: FiLock, path: "/settings/security", desc: "Password & authentication" },
                { label: "Data Backup", icon: FiSave, path: "/settings/backup", desc: "Export & restore data" },
            ]
        }
    ];

    const patientNav = [
        {
            group: "Personal",
            items: [
                { label: "Personal Info", icon: FiUser, path: "/settings/personal", desc: "Name, DOB & address" },
                { label: "Medical History", icon: FiHeart, path: "/settings/medical", desc: "Conditions & medications" },
                { label: "Insurance & Privacy", icon: FiEye, path: "/settings/insurance", desc: "Coverage & data consent" },
            ]
        },
        {
            group: "Appointments",
            items: [
                { label: "Appointment Preferences", icon: FiCalendar, path: "/settings/appointment-prefs", desc: "Visit type & reminders" },
                { label: "Notifications", icon: FiBell, path: "/settings/notifications", desc: "Alerts & follow-ups" },
            ]
        },
        {
            group: "Account",
            items: [
                { label: "Security & Password", icon: FiLock, path: "/settings/security", desc: "Login & 2FA" },
                { label: "Connected Devices", icon: FiSmartphone, path: "/settings/devices", desc: "Sessions & wearables" },
            ]
        }
    ];

    const navGroups = user?.role === "patient" ? patientNav : doctorNav;

    return (
        <div className="space-y-6 animate-fade-in px-5">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary via-sky-500 to-secondary p-8 rounded-3xl text-white shadow-xl shadow-primary/20">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
                <div className="relative flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <FiActivity className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white/70 font-semibold text-sm uppercase tracking-widest">
                                {user?.role === "patient" ? "Patient" : "Doctor"} Portal
                            </span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">Settings & Preferences</h1>
                        <p className="text-white/70 text-sm mt-1 font-medium">
                            {user?.role === "patient"
                                ? "Manage your health profile, preferences and account security"
                                : "Configure your clinic, practice protocols and system configuration"
                            }
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm">
                            {user?.name?.charAt(0) ?? "U"}
                        </div>
                        <div>
                            <p className="text-sm font-bold leading-tight">{user?.name ?? "User"}</p>
                            <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {navGroups.map(group => (
                        <div key={group.group} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-50">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{group.group}</span>
                            </div>
                            <div className="p-2 space-y-0.5">
                                {group.items.map(item => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${isActive
                                                ? "bg-primary text-white shadow-md shadow-primary/25"
                                                : "text-slate-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary"
                                                }`}>
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`font-bold text-xs truncate ${isActive ? "text-white" : "text-slate-700"}`}>
                                                    {item.label}
                                                </p>
                                                <p className={`text-[10px] truncate ${isActive ? "text-white/70" : "text-slate-400"}`}>
                                                    {item.desc}
                                                </p>
                                            </div>
                                            <HiOutlineChevronRight className={`w-3.5 h-3.5 shrink-0 transition-all ${isActive ? "text-white/70" : "text-slate-300 group-hover:text-primary group-hover:translate-x-0.5"}`} />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

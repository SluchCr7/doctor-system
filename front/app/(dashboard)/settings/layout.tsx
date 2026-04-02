"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    FiUser, FiGlobe, FiClock, FiLock,
    FiShield, FiCreditCard, FiHeart, FiEye,
    FiActivity, FiLayout
} from "react-icons/fi";
import { HiOutlineChevronRight } from "react-icons/hi2";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();

    const doctorNav = [
        {
            group: "My Profile",
            items: [
                { label: "Personal Info", icon: FiUser, path: "/settings/personal", desc: "Name, photo & biography" },
                { label: "Professional Details", icon: FiGlobe, path: "/settings/clinic", desc: "Credentials & clinical focus" },
                { label: "Practice Schedule", icon: FiClock, path: "/settings/hours", desc: "Working hours & availability" },
            ]
        },
        {
            group: "System & Admin",
            items: [
                { label: "Appearance", icon: FiLayout, path: "/settings/appearance", desc: "Theme & visual preferences" },
                { label: "Finance & Plans", icon: FiCreditCard, path: "/settings/billing-plan", desc: "Revenue & billing stats" },
                { label: "Security & Login", icon: FiLock, path: "/settings/security", desc: "Protection & authentication" },
            ]
        }
    ];
    const patientNav = [
        {
            group: "Identity",
            items: [
                { label: "Personal Profile", icon: FiUser, path: "/settings/personal", desc: "Identity & contact details" },
                { label: "Health Background", icon: FiHeart, path: "/settings/medical", desc: "Medical profile & history" },
            ]
        },
        {
            group: "Preferences",
            items: [
                { label: "Appearance", icon: FiLayout, path: "/settings/appearance", desc: "Theme & visual preferences" },
                { label: "Billing & Plans", icon: FiCreditCard, path: "/settings/billing-plan", desc: "Subscription & payments" },
                { label: "Security & Login", icon: FiLock, path: "/settings/security", desc: "Access & authentication" },
            ]
        }
    ];

    const navGroups = user?.role === "patient" ? patientNav : doctorNav;

    return (
        <div className="space-y-6 animate-fade-in px-5 pb-10">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-accent p-10 rounded-[2.5rem] text-white shadow-premium">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                <FiActivity className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white/80 font-black text-[10px] uppercase tracking-[0.2em]">
                                {user?.role === "patient" ? "Patient" : "Doctor"} Management Suite
                            </span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">Systems Configuration</h1>
                        <p className="text-white/80 text-sm font-bold tracking-tight max-w-xl">
                            {user?.role === "patient"
                                ? "Personalize your experience, manage health identifiers and oversee account security protocols."
                                : "Fine-tune your clinical practice, automate scheduling workflows and manage professional identity."
                            }
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-4">
                    {navGroups.map(group => (
                        <div key={group.group} className="bg-surface rounded-3xl border border-border-subtle shadow-subtle overflow-hidden transition-colors duration-300">
                            <div className="px-6 py-4 border-b border-border-subtle bg-background-subtle/30">
                                <span className="text-[10px] font-black text-text-tertiary uppercase tracking-[0.2em]">{group.group}</span>
                            </div>
                            <div className="p-3 space-y-1">
                                {group.items.map(item => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm transition-all duration-300 group ${isActive
                                                ? "bg-primary text-text-inverted shadow-premium"
                                                : "text-text-secondary hover:bg-background-subtle hover:text-text-primary"
                                                }`}
                                        >
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-background-subtle text-text-tertiary group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110"
                                                }`}>
                                                <item.icon className="w-4.5 h-4.5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`font-black text-xs truncate leading-tight ${isActive ? "text-text-inverted" : "text-text-primary"}`}>
                                                    {item.label}
                                                </p>
                                                <p className={`text-[10px] truncate mt-0.5 font-bold ${isActive ? "text-text-inverted/70" : "text-text-tertiary"}`}>
                                                    {item.desc}
                                                </p>
                                            </div>
                                            <HiOutlineChevronRight className={`w-4 h-4 shrink-0 transition-all ${isActive ? "text-white/70" : "text-text-tertiary group-hover:text-primary group-hover:translate-x-1"}`} />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-surface rounded-[2.5rem] border border-border-subtle shadow-subtle p-8 md:p-10 transition-colors duration-300">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

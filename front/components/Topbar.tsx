"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HiOutlineBell, HiOutlineMagnifyingGlass, HiOutlineCalendar, HiOutlineChevronDown, HiOutlineArrowRightOnRectangle, HiOutlineCog6Tooth } from "react-icons/hi2";
import { clinicDoctor } from "@/data/mockData";

const Topbar = () => {
    const [profileOpen, setProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary w-4 h-4 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search patients, appointments, records…"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {/* Quick Book Button */}
                <Link
                    href="/appointments"
                    className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors border border-primary/10"
                >
                    <HiOutlineCalendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                </Link>

                {/* Notification Bell */}
                <button
                    className="relative p-2.5 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                    aria-label="Notifications"
                >
                    <HiOutlineBell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>

                <div className="h-7 w-px bg-slate-200" />

                {/* Doctor Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-3 pl-2 pr-2 py-1.5 rounded-xl hover:bg-slate-50 transition-all group"
                        aria-label="Doctor profile menu"
                        aria-expanded={profileOpen}
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors leading-tight">
                                {clinicDoctor.name}
                            </p>
                            <p className="text-[11px] text-slate-400 leading-tight">{clinicDoctor.specialty.split(" &")[0]}</p>
                        </div>
                        <div className="relative shrink-0">
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                                <img
                                    src={clinicDoctor.image}
                                    alt={clinicDoctor.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                        </div>
                        <HiOutlineChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {profileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50">
                            <div className="px-4 py-2 border-b border-slate-100 mb-1">
                                <p className="text-sm font-bold text-slate-800">{clinicDoctor.name}</p>
                                <p className="text-xs text-slate-400">{clinicDoctor.email}</p>
                            </div>
                            <Link
                                href="/settings/account"
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                            >
                                <HiOutlineCog6Tooth className="w-4 h-4" />
                                Account Settings
                            </Link>
                            <div className="border-t border-slate-100 mt-1 pt-1">
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                    <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
                                    Sign Out
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

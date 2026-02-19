"use client";
import React from "react";
import { HiOutlineBell, HiOutlineMagnifyingGlass, HiOutlineEnvelope } from "react-icons/hi2";

const Topbar = () => {
    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between transition-all duration-300">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
                <div className="relative group">
                    <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary w-5 h-5 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search patients, doctors, records..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <button className="relative p-2.5 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 group">
                        <HiOutlineBell className="w-6 h-6" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                    </button>

                    <button className="relative p-2.5 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200">
                        <HiOutlineEnvelope className="w-6 h-6" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></span>
                    </button>
                </div>

                <div className="h-8 w-px bg-slate-200 mx-2"></div>

                {/* User Profile */}
                <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-50 transition-all group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">Dr. Alexander</p>
                        <p className="text-xs text-slate-400 font-medium">Chief Physician</p>
                    </div>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm ring-1 ring-slate-100 overflow-hidden">
                            <img
                                src="https://i.pravatar.cc/150?u=admin"
                                alt="Admin"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Topbar;

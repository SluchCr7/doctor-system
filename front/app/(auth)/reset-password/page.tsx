"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiChevronRight } from "react-icons/fi";

const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 p-8 md:p-12">
                    <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                        <FiCheckCircle className="w-8 h-8" />
                    </div>

                    <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Set New Password</h2>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">Your identity has been verified. Please choose a strong, unique password for your medical account.</p>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                            <div className="relative group">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                            <div className="relative group">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 pt-2">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">Password Requirements</h4>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-accent">
                                    <FiCheckCircle className="w-3 h-3" /> Min. 8 characters
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                                    <FiCheckCircle className="w-3 h-3" /> One uppercase letter
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                                    <FiCheckCircle className="w-3 h-3" /> One special character
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary-light transition-all flex items-center justify-center gap-2 group">
                            <span>Update Password</span>
                            <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;

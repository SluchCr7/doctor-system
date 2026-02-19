"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <div className="w-full max-w-[1100px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">

                {/* Left Side: Illustration & Welcome */}
                <div className="w-full md:w-1/2 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full -ml-32 -mb-32 blur-3xl opacity-30" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary font-black text-2xl mb-8 shadow-lg">C</div>
                        <h1 className="text-4xl font-black leading-tight mb-4">Welcome to Your<br />Healthcare Hub</h1>
                        <p className="text-white/70 text-lg font-medium leading-relaxed">Streamline your clinic operations with the next generation of medical management. Secure, efficient, and patient-centered.</p>
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <FiLock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold">Enterprise Security</h4>
                                <p className="text-xs text-white/60 font-medium">HIPAA compliant and end-to-end encrypted.</p>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-slate-200 overflow-hidden shadow-lg">
                                        <img src={`https://i.pravatar.cc/100?u=auth${i}`} alt="" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-white/80">Trusted by 2,000+ Providers</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Login to ClinicDoc</h2>
                        <p className="text-slate-400 font-semibold">Enter your credentials to access your dashboard</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                            <div className="relative group">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@clinic.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                                <Link href="/forgot-password" title="Recover account" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Forgot Password?</Link>
                            </div>
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

                        <div className="flex items-center gap-3 px-1">
                            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                            <label htmlFor="remember" className="text-xs font-bold text-slate-500 cursor-pointer">Stay logged in for 30 days</label>
                        </div>

                        <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary-light transition-all flex items-center justify-center gap-2 group">
                            <span>Authorize & Log In</span>
                            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-slate-400 text-sm font-medium">Don't have an account yet?</p>
                        <button className="mt-2 text-primary font-black text-sm hover:underline">Request Access for Your Clinic</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

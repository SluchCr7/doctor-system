"use client";
import React from "react";
import Link from "next/link";
import { FiMail, FiArrowLeft, FiChevronRight } from "react-icons/fi";

const ForgotPasswordPage = () => {
    return (
        <div className="min-h-screen bg-white md:bg-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <Link href="/login" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold text-sm mb-12">
                    <FiArrowLeft /> Back to Login
                </Link>

                <div className="bg-white rounded-[32px] md:shadow-2xl md:border md:border-slate-100 p-8 md:p-12">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                        <FiMail className="w-8 h-8" />
                    </div>

                    <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Recover Account</h2>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">Enter your registered work email address. We'll send you a recovery link to reset your password and verify your identity.</p>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                            <div className="relative group">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@clinic.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all underline-offset-4"
                                />
                            </div>
                        </div>

                        <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary-light transition-all flex items-center justify-center gap-2 group">
                            <span>Send Reset Link</span>
                            <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-10 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <p className="text-xs text-primary font-bold leading-relaxed text-center">
                            Can't access your email? Please contact your clinic administrator to manually reset your credentials.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

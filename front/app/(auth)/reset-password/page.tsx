'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, ChevronRight, HeartPulse, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Visual Section - Left Side */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex lg:w-1/2 relative bg-slate-900"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-secondary/10 z-10 mix-blend-multiply" />
        <img 
          src="/images/auth/login-bg.png" 
          alt="Medical Center" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-75 scale-105"
        />
        
        {/* Branding Overlay */}
        <div className="relative z-20 flex flex-col justify-between p-16 w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-white/20">
              <HeartPulse className="text-primary w-7 h-7" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight italic">
              Doc<span className="text-secondary not-italic">Sync</span>
            </span>
          </div>

          <div className="max-w-md">
            <h2 className="text-5xl font-black text-white leading-tight mb-6">
              Finalize <br />
              <span className="text-secondary italic">authentication</span> <br />
              reset.
            </h2>
            <p className="text-slate-300 text-lg font-medium leading-relaxed">
              Define your new security keys to regain access to the clinical network.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
             <ShieldCheck size={20} />
             <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Identity Verified</span>
          </div>
        </div>
      </motion.div>

      {/* Form Section - Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-slate-200 border border-slate-100/50">
                <ShieldAlert className="text-primary w-7 h-7" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3 italic">Security <span className="text-primary not-italic underline decoration-slate-200 decoration-8 underline-offset-[-2px]">Finalization</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Set your new encrypted access code</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Terminal Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Key Confirmation</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-[2px] bg-slate-200 rounded-full" />
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Key Requirements</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-wider">
                        <CheckCircle size={12} strokeWidth={3} /> Min. 8 characters
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-wider">
                        <CheckCircle size={12} strokeWidth={3} /> Complex Charset
                    </div>
                </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-primary hover:shadow-primary/40 active:scale-[0.99] transition-all flex items-center justify-center gap-3 group mt-4"
            >
              Update Security Code
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
              Return to access terminal?{' '}
              <Link href="/login" className="text-primary hover:text-secondary underline decoration-primary/20 decoration-2 underline-offset-4">
                Login here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

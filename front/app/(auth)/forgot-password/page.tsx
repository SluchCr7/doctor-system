'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ChevronRight, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react';

export default function ForgotPasswordPage() {
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
              Security <br />
              <span className="text-secondary italic">first</span> protocol.
            </h2>
            <p className="text-slate-300 text-lg font-medium leading-relaxed">
              Retrieve your professional access through our encrypted verification system.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
             <ShieldCheck size={20} />
             <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Advanced Identity Protection</span>
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
          <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-black text-[10px] uppercase tracking-widest mb-12 group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to Terminal
          </Link>

          <div className="mb-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-slate-200 border border-slate-100">
                <Mail className="text-primary w-7 h-7" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3 italic">Identity <span className="text-primary not-italic underline decoration-slate-200 decoration-8 underline-offset-[-2px]">Recovery</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Enter your professional email to proceed</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Registered Channel</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                  placeholder="name@clinic.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-primary hover:shadow-primary/40 active:scale-[0.99] transition-all flex items-center justify-center gap-3 group"
            >
              Verify & Send Link
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-12 p-6 bg-white rounded-[1.5rem] border border-slate-200/60 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Stethoscope size={18} />
                </div>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    Access issues? Please contact clinic administration or dispatch for manual credential reset protocols.
                </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

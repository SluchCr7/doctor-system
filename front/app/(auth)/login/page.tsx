'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

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
        
        {/* Branding/Quote Overlay */}
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
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-black text-white leading-[1.1] tracking-tight mb-6"
            >
              Precision care <br />
              <span className="text-secondary italic">starts with</span> <br />
              smarter systems.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-slate-300 text-lg leading-relaxed font-medium"
            >
              The most advanced physician command center, designed for the modern practitioner.
            </motion.p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="avatar" />
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm font-bold">Trusted by 2,000+ clinicians worldwide</p>
          </div>
        </div>
      </motion.div>

      {/* Form Section - Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-slate-50 relative overflow-hidden">
        {/* Background blobs for flair */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-12">
            <HeartPulse className="text-primary w-8 h-8" />
            <span className="text-xl font-black text-slate-900 italic">Doc<span className="text-primary not-italic">Sync</span></span>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3 italic">Clinical <span className="text-primary not-italic underline decoration-slate-200 decoration-8 underline-offset-[-2px]">Access</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Verify your credentials to proceed</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Terminal</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                  placeholder="name@clinic.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Code</label>
                <Link href="/forgot-password"  className="text-[10px] font-black text-primary hover:text-secondary uppercase tracking-widest">
                  Reset Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-[1.25rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-primary hover:shadow-primary/40 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-3 overflow-hidden group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-200/60">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Session</span>
            </div>
            
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
              New clinician?{' '}
              <Link href="/register" className="text-primary hover:text-secondary underline decoration-primary/20 decoration-2 underline-offset-4">
                Initialize System account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

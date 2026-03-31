'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineHome, HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center select-none overflow-hidden relative">
      {/* Decorative blurred blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-[120px] animate-pulse transition-all duration-1000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="mb-12 relative">
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="inline-flex items-center justify-center w-32 h-32 rounded-[2.5rem] bg-amber-100/50 text-amber-600 shadow-xl shadow-amber-200/20 mb-8 backdrop-blur-sm"
          >
            <HiOutlineExclamationTriangle size={64} />
          </motion.div>
          
          <h1 className="text-9xl font-black text-slate-800 tracking-tighter opacity-10 absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10">404</h1>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Oops! Path Not Found
          </h2>
          <p className="mt-6 text-slate-500 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed">
            The page you are looking for doesn't exist or has been moved to a different medical department.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button
              size="lg"
              className="rounded-2xl px-8 py-6 font-bold shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-[0.97] transition-all bg-primary text-white"
              leftIcon={<HiOutlineHome size={20} />}
            >
              Back to Dashboard
            </Button>
          </Link>
          
          <Link href="javascript:history.back()">
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 py-6 font-bold border-2 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 active:scale-[0.97] transition-all"
              leftIcon={<HiOutlineArrowLeft size={20} />}
            >
              Previous Page
            </Button>
          </Link>
        </div>

        <div className="mt-16 pt-12 border-t border-slate-200 flex flex-wrap items-center justify-center gap-8 opacity-40">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">System Online</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-2 h-2 rounded-full bg-sky-500 group-hover:scale-150 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Secure Protocol</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Verified Access</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

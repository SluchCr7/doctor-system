"use client";
import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 text-white z-[9999] overflow-hidden select-none">
            {/* Elegant glowing background blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-[pulse_6s_infinite] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-[pulse_8s_infinite] pointer-events-none" />

            <div className="relative flex flex-col items-center gap-8 max-w-sm px-6 text-center">
                {/* Advanced pulsing double medical-cross visual */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* Pulsing outer soft aura */}
                    <div className="absolute inset-0 rounded-full bg-sky-500/15 animate-ping duration-1000 opacity-60" />
                    
                    {/* Ring orbit indicator */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-500/30 animate-[spin_20s_linear_infinite]" />
                    <div className="absolute inset-2 rounded-full border border-sky-400/20 animate-[spin_10s_linear_infinite_reverse]" />
                    
                    {/* Elegant spinning progress track */}
                    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle 
                            cx="50" 
                            cy="50" 
                            r="44" 
                            stroke="rgba(14, 165, 233, 0.1)" 
                            strokeWidth="3" 
                            fill="transparent" 
                        />
                        <circle 
                            cx="50" 
                            cy="50" 
                            r="44" 
                            stroke="url(#skyGradient)" 
                            strokeWidth="4" 
                            strokeDasharray="276" 
                            strokeDashoffset="120"
                            strokeLinecap="round"
                            fill="transparent" 
                            className="animate-[spin_2s_ease-in-out_infinite]"
                        />
                        <defs>
                            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0ea5e9" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Premium Heartbeat-pulsing center Medical Icon */}
                    <div className="absolute inset-6 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/30 animate-[pulse_1.5s_infinite_ease-in-out]">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-8 h-8 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]"
                        >
                            <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                        </svg>
                    </div>
                </div>

                {/* Loading Text and Interactive Heartbeat trace */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-black tracking-widest text-sky-400 uppercase">
                            Clinical <span className="text-white">System</span>
                        </h2>
                        <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mt-1 opacity-70">
                            Securing & Syncing Workspace...
                        </p>
                    </div>

                    {/* ECG heartbeat tracker animation */}
                    <div className="w-48 h-8 mx-auto flex items-center justify-center overflow-hidden opacity-60">
                        <svg className="w-full h-full stroke-sky-400 stroke-2 fill-none" viewBox="0 0 100 20">
                            <path 
                                d="M 0 10 L 30 10 L 35 3 L 40 17 L 45 10 L 70 10 L 75 0 L 80 20 L 85 10 L 100 10" 
                                strokeDasharray="100"
                                strokeDashoffset="100"
                                className="animate-[ecg_1.8s_linear_infinite]"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Micro CSS styles directly in React for smooth standalone animations */}
            <style jsx global>{`
                @keyframes ecg {
                    0% {
                        stroke-dashoffset: 100;
                    }
                    50% {
                        stroke-dashoffset: 0;
                    }
                    100% {
                        stroke-dashoffset: -100;
                    }
                }
            `}</style>
        </div>
    );
}

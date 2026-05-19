import React from 'react';
import { FiLoader } from "react-icons/fi";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading System..." }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md z-[9999] transition-all duration-300">
            <div className="flex flex-col items-center gap-6 animate-scale-in">
                <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Outer Glow & Spin */}
                    <div className="absolute inset-0 border-y-4 border-primary/20 rounded-full animate-[spin_3s_linear_infinite]"></div>
                    <div className="absolute inset-0 border-x-4 border-primary border-transparent rounded-full animate-[spin_1.5s_ease-in-out_infinite]"></div>
                    
                    {/* Inner Content */}
                    <div className="absolute inset-2 bg-surface rounded-full shadow-premium flex items-center justify-center">
                        <FiLoader className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                </div>
                
                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent transform tracking-tight">
                        ClinicDoc
                    </h2>
                    <p className="text-text-tertiary text-xs font-semibold tracking-[0.2em] uppercase animate-pulse">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;

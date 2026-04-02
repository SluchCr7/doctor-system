"use client";

import React, { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
    hideHeader?: boolean;
    className?: string;
}

const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full m-4",
};

export const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size = "md",
    hideHeader = false,
    className = "",
}: ModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-all duration-300"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`relative w-full ${sizes[size]} bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-white/20 ring-1 ring-black/5 flex flex-col max-h-[90vh] ${className}`}
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        {!hideHeader && (
                            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white/80 sticky top-0 z-10">
                                <div className="flex-1 min-w-0">
                                    {title && (
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none truncate">
                                            {title}
                                        </h3>
                                    )}
                                    {description && (
                                        <p className="text-sm font-semibold text-slate-400 mt-2 tracking-wide uppercase">
                                            {description}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="ml-4 p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all duration-200 group active:scale-95"
                                >
                                    <HiXMark className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
                                </button>
                            </div>
                        )}

                        {/* Body */}
                        <div className={`overflow-y-auto custom-scrollbar-minimal ${hideHeader ? "" : "px-10 py-10"}`}>
                            <div className="relative">
                                {children}
                            </div>
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="flex items-center justify-end gap-4 px-10 py-8 border-t border-slate-100 bg-slate-50/50">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

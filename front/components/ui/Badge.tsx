import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "success" | "warning" | "error" | "info" | "neutral" | "primary";
}

export const Badge = ({ className = "", variant = "neutral", children, ...props }: BadgeProps) => {
    const variants = {
        success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-500/30",
        warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-500/30",
        error: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 dark:bg-rose-900/20 dark:text-rose-400 dark:ring-rose-500/30",
        info: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-500/30",
        neutral: "bg-slate-50 text-slate-600 ring-1 ring-slate-600/20 dark:bg-slate-800/40 dark:text-slate-400 dark:ring-slate-700/50",
        primary: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20 dark:bg-indigo-900/20 dark:text-indigo-400 dark:ring-indigo-500/30",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

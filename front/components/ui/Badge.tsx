import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "success" | "warning" | "error" | "info" | "neutral" | "primary";
}

export const Badge = ({ className = "", variant = "neutral", children, ...props }: BadgeProps) => {
    const variants = {
        success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
        warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
        error: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20",
        info: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20",
        neutral: "bg-slate-50 text-slate-600 ring-1 ring-slate-600/20",
        primary: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20",
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

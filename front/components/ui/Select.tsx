import React from "react";
import { HiChevronDown } from "react-icons/hi2";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { label: string; value: string | number }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = "", label, error, options, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        className={`w-full appearance-none rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${error
                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                : "border-slate-200 focus:border-primary/50 focus:ring-primary/20"
                            } ${className}`}
                        {...props}
                    >
                        <option value="" disabled>Select an option</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <HiChevronDown className="w-4 h-4" />
                    </div>
                </div>
                {error && <p className="mt-1.5 text-xs text-red-500 font-medium ml-1">{error}</p>}
            </div>
        );
    }
);

Select.displayName = "Select";

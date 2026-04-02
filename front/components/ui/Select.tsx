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
                    <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">
                        {label}
                        {props.required && <span className="text-danger ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        className={`w-full appearance-none rounded-xl border bg-input-bg px-4 py-2.5 text-sm text-text-primary transition-all duration-200 focus:bg-surface focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${error
                                ? "border-danger focus:border-danger focus:ring-danger/20"
                                : "border-border focus:border-primary/50 focus:ring-primary/20"
                            } ${className}`}
                        {...props}
                    >
                        <option value="" disabled className="bg-surface">Select an option</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-surface">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
                        <HiChevronDown className="w-4 h-4" />
                    </div>
                </div>
                {error && <p className="mt-1.5 text-xs text-danger font-medium ml-1">{error}</p>}
            </div>
        );
    }
);

Select.displayName = "Select";

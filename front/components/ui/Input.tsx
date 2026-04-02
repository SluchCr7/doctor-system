import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", label, error, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">
                        {label}
                        {props.required && <span className="text-danger ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`w-full rounded-xl border bg-input-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-all duration-200 focus:bg-surface focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${error
                                ? "border-danger focus:border-danger focus:ring-danger/20"
                                : "border-border focus:border-primary/50 focus:ring-primary/20"
                            } ${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""} ${className}`}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <p className="mt-1.5 text-xs text-danger font-medium ml-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";

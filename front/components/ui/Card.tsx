import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = "", children, noPadding = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`bg-surface rounded-xl border border-border shadow-sm transition-all duration-300 hover:shadow-md ${!noPadding ? "p-6" : ""} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

export const CardHeader = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`p-6 border-b border-border-subtle ${className}`} {...props}>
        {children}
    </div>
);

export const CardTitle = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={`text-lg font-semibold text-text-primary tracking-tight ${className}`} {...props}>
        {children}
    </h3>
);

export const CardContent = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`p-6 ${className}`} {...props}>
        {children}
    </div>
);

export const CardFooter = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`p-6 border-t border-border-subtle bg-background-subtle/50 rounded-b-xl ${className}`} {...props}>
        {children}
    </div>
);

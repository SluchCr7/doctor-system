import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { Button } from "./ui/Button";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: { label: string; href?: string }[];
    action?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, breadcrumbs, action }: PageHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
                {breadcrumbs && (
                    <nav className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <HiOutlineChevronRight className="w-3 h-3 text-text-tertiary" />}
                                <span className={index === breadcrumbs.length - 1 ? "text-text-primary font-medium" : "text-text-secondary"}>
                                    {crumb.label}
                                </span>
                            </React.Fragment>
                        ))}
                    </nav>
                )}
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">{title}</h1>
                {subtitle && <p className="text-text-secondary">{subtitle}</p>}
            </div>

            {action && (
                <div className="flex-shrink-0">
                    {action}
                </div>
            )}
        </div>
    );
};

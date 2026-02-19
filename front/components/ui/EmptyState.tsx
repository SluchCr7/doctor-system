"use client";
import React from "react";
import { FiInbox } from "react-icons/fi";
import { Button } from "./Button";

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    actionText?: string;
    onAction?: () => void;
}

const EmptyState = ({
    icon = <FiInbox className="w-12 h-12" />,
    title,
    description,
    actionText,
    onAction
}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-[32px] flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight">{title}</h3>
            <p className="text-slate-400 text-sm font-medium max-w-sm mb-8 leading-relaxed">
                {description}
            </p>
            {actionText && onAction && (
                <Button onClick={onAction}>
                    {actionText}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;

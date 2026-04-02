"use client";
import React, { createContext, useContext, useState } from "react";

interface TabsContextType {
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs = ({
    defaultValue,
    className = "",
    children,
}: {
    defaultValue: string;
    className?: string;
    children: React.ReactNode;
}) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={`w-full ${className}`}>{children}</div>
        </TabsContext.Provider>
    );
};

export const TabsList = ({
    className = "",
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div className={`inline-flex items-center justify-center rounded-xl bg-background-subtle p-1 text-text-secondary ${className}`}>
            {children}
        </div>
    );
};

export const TabsTrigger = ({
    value,
    className = "",
    children,
}: {
    value: string;
    className?: string;
    children: React.ReactNode;
}) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.activeTab === value;

    return (
        <button
            onClick={() => context.setActiveTab(value)}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive
                    ? "bg-surface text-text-primary shadow-sm"
                    : "hover:bg-surface-hover hover:text-text-primary"
                } ${className}`}
        >
            {children}
        </button>
    );
};

export const TabsContent = ({
    value,
    className = "",
    children,
}: {
    value: string;
    className?: string;
    children: React.ReactNode;
}) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    if (context.activeTab !== value) return null;

    return (
        <div
            className={`mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${className}`}
        >
            {children}
        </div>
    );
};

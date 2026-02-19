"use client";
import React from "react";
import { FiActivity } from "react-icons/fi";
import EmptyState from "@/components/ui/EmptyState";

export default function ActivityLogs() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-2xl font-bold text-slate-800">Activity Logs</h1>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <EmptyState
                    title="Audit Trail"
                    description="View system access logs, user actions, and security events."
                    icon={<FiActivity className="w-12 h-12" />}
                />
            </div>
        </div>
    );
}

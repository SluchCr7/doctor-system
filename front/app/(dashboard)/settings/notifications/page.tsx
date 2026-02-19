"use client";
import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import { FiBell } from "react-icons/fi";

const NotificationsSettings = () => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
            <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4">Notification Preferences</h3>
            <EmptyState
                title="Notification Rules"
                description="Manage email and SMS alerts for appointments, reminders, and system updates."
                icon={<FiBell className="w-12 h-12" />}
            />
        </div>
    );
};

export default NotificationsSettings;

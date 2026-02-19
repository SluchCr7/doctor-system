"use client";
import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import { FiKey } from "react-icons/fi";

const StaffRoles = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-2xl font-bold text-slate-800">Roles & Permissions</h1>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <EmptyState
                    title="Access Control"
                    description="Manage roles (Admin, Doctor, Nurse) and their specific permissions."
                    icon={<FiKey className="w-12 h-12" />}
                />
            </div>
        </div>
    );
};

export default StaffRoles;

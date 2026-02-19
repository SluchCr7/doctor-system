"use client";
import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import { FiUser } from "react-icons/fi";

const AccountSettings = () => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
            <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4">My Account</h3>
            <EmptyState
                title="Profile Management"
                description="Update your personal details, password, and avatar."
                icon={<FiUser className="w-12 h-12" />}
            />
        </div>
    );
};

export default AccountSettings;

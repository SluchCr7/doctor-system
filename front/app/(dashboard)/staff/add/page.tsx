"use client";
import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import { FiUserPlus } from "react-icons/fi";

const AddStaff = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-2xl font-bold text-slate-800">Add New Staff Member</h1>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <EmptyState
                    title="Staff Registration"
                    description="Form to add new doctors, nurses, or receptionists to the system."
                    icon={<FiUserPlus className="w-12 h-12" />}
                />
            </div>
        </div>
    );
};

export default AddStaff;

"use client";
import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import { FiClock } from "react-icons/fi";

const WorkingHours = () => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
            <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4">Working Hours Configuration</h3>
            <EmptyState
                title="Schedule Management"
                description="Configure clinic opening and closing hours, holidays, and break times here."
                icon={<FiClock className="w-12 h-12" />}
            />
        </div>
    );
};

export default WorkingHours;

"use client";
import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import { FiUsers } from "react-icons/fi";

const PatientAnalytics = () => {
    return (
        <div className="space-y-6 p-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-2xl font-bold text-slate-800">Patient Demographics & Trends</h1>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex items-center justify-center">
                <EmptyState
                    title="Patient Data Analysis"
                    description="Age distribution, gender breakdown, and new patient acquisition trends."
                    icon={<FiUsers className="w-12 h-12" />}
                />
            </div>
        </div>
    );
};

export default PatientAnalytics;

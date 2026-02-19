"use client";
import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import { FiClock } from "react-icons/fi";

const WaitingListPage = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-2xl font-bold text-slate-800">Waiting List</h1>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <EmptyState
                    title="No Patients Waiting"
                    description="The waiting list is currently empty. Patients added to the waitlist will appear here."
                    icon={<FiClock className="w-12 h-12" />}
                />
            </div>
        </div>
    );
};

export default WaitingListPage;

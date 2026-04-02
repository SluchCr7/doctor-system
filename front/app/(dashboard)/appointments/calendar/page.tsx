"use client";
import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import { FiCalendar } from "react-icons/fi";

const CalendarPage = () => {
    return (
        <div className="space-y-6 p-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Appointment Calendar</h1>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-[600px] flex items-center justify-center">
                <EmptyState
                    title="Calendar Integration"
                    description="FullCalendar or similar library integration required here."
                    icon={<FiCalendar className="w-12 h-12" />}
                    actionText="Add Appointment"
                    onAction={() => { }}
                />
            </div>
        </div>
    );
};

export default CalendarPage;

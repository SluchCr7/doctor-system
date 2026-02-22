"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { FiClock } from "react-icons/fi";

const WorkingHoursSettings = () => {
    const days = [
        { name: "Monday", hours: "09:00 AM - 06:00 PM", active: true },
        { name: "Tuesday", hours: "09:00 AM - 06:00 PM", active: true },
        { name: "Wednesday", hours: "09:00 AM - 06:00 PM", active: true },
        { name: "Thursday", hours: "09:00 AM - 06:00 PM", active: true },
        { name: "Friday", hours: "09:00 AM - 04:00 PM", active: true },
        { name: "Saturday", hours: "Closed", active: false },
        { name: "Sunday", hours: "Closed", active: false },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
                    <h3 className="text-xl font-bold text-slate-800">Clinic Working Hours</h3>
                    <Button size="sm" variant="outline">Update Default Hours</Button>
                </div>

                <div className="space-y-4">
                    {days.map((day) => (
                        <div key={day.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all">
                            <div className="flex items-center gap-4 mb-2 sm:mb-0">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${day.active ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-400"}`}>
                                    <FiClock className="w-5 h-5" />
                                </div>
                                <span className={`font-bold ${day.active ? "text-slate-800" : "text-slate-400"}`}>{day.name}</span>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className={`text-sm font-medium ${day.active ? "text-slate-600" : "text-slate-400 font-bold"}`}>
                                    {day.hours}
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${day.active ? "bg-primary" : "bg-slate-300"}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${day.active ? "left-7" : "left-1"}`} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase w-10">{day.active ? "Open" : "OFF"}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 p-5 bg-sky-50 rounded-2xl border border-sky-100">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                            <FiClock className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm">Automated Appointment Boundaries</h4>
                            <p className="text-xs text-slate-500 mt-1 max-w-md">Online bookings will automatically be restricted to these hours. Emergency walk-ins can still be registered manually.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkingHoursSettings;

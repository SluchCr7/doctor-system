"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

interface Day {
    name: string;
    active: boolean;
    from: string;
    to: string;
    breakFrom: string;
    breakTo: string;
}

const defaultDays: Day[] = [
    { name: "Monday", active: true, from: "09:00", to: "18:00", breakFrom: "13:00", breakTo: "14:00" },
    { name: "Tuesday", active: true, from: "09:00", to: "18:00", breakFrom: "13:00", breakTo: "14:00" },
    { name: "Wednesday", active: true, from: "09:00", to: "18:00", breakFrom: "13:00", breakTo: "14:00" },
    { name: "Thursday", active: true, from: "09:00", to: "18:00", breakFrom: "13:00", breakTo: "14:00" },
    { name: "Friday", active: true, from: "09:00", to: "16:00", breakFrom: "13:00", breakTo: "14:00" },
    { name: "Saturday", active: false, from: "10:00", to: "13:00", breakFrom: "", breakTo: "" },
    { name: "Sunday", active: false, from: "", to: "", breakFrom: "", breakTo: "" },
];

const WorkingHoursSettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.workingHours || {};

    const [days, setDays] = useState<Day[]>(initData.days || defaultDays);
    const [slotDuration, setSlotDuration] = useState(initData.slotDuration || "30");
    const [bufferTime, setBufferTime] = useState(initData.bufferTime || "10");
    const [maxDaily, setMaxDaily] = useState(initData.maxDaily || "24");
    const [emergency, setEmergency] = useState(initData.emergency ?? true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (user?.profileData?.workingHours) {
            const h = user.profileData.workingHours;
            if (h.days) setDays(h.days);
            if (h.slotDuration) setSlotDuration(h.slotDuration);
            if (h.bufferTime) setBufferTime(h.bufferTime);
            if (h.maxDaily) setMaxDaily(h.maxDaily);
            if (h.emergency !== undefined) setEmergency(h.emergency);
        }
    }, [user]);

    const toggle = (i: number) => setDays((d: Day[]) => d.map((day, idx) => idx === i ? { ...day, active: !day.active } : day));
    const updateDay = (i: number, key: string, val: string) =>
        setDays((d: Day[]) => d.map((day, idx) => idx === i ? { ...day, [key]: val } : day));

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    workingHours: { days, slotDuration, bufferTime, maxDaily, emergency }
                }
            });
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            console.error(error);
        }
    };

    const abbr = (n: string) => n.slice(0, 3).toUpperCase();

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Weekly Schedule */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-base font-black text-slate-800">Weekly Schedule</h3>
                        <p className="text-slate-500 text-xs mt-0.5">Set your clinic's open hours for each day of the week</p>
                    </div>
                    <div className="flex gap-2 text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />Open</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-200 inline-block" />Closed</span>
                    </div>
                </div>

                <div className="space-y-3">
                    {days.map((day, i) => (
                        <div key={day.name} className={`rounded-2xl border transition-all ${day.active ? "border-primary/10 bg-blue-50/30" : "border-slate-100 bg-slate-50/50"}`}>
                            <div className="flex items-center gap-4 p-4">
                                {/* Day Toggle */}
                                <div className="flex items-center gap-3 w-36 shrink-0">
                                    <button
                                        onClick={() => toggle(i)}
                                        className={`w-11 h-6 rounded-full transition-all relative ${day.active ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${day.active ? "left-6" : "left-1"}`} />
                                    </button>
                                    <span className={`font-black text-sm ${day.active ? "text-slate-800" : "text-slate-400"}`}>
                                        {abbr(day.name)}
                                        <span className="hidden sm:inline">{day.name.slice(3)}</span>
                                    </span>
                                </div>

                                {day.active ? (
                                    <div className="flex flex-wrap items-center gap-3 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-400 w-5">From</span>
                                            <input type="time" value={day.from}
                                                onChange={e => updateDay(i, "from", e.target.value)}
                                                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-400 w-3">To</span>
                                            <input type="time" value={day.to}
                                                onChange={e => updateDay(i, "to", e.target.value)}
                                                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                                        </div>
                                        {day.breakFrom && (
                                            <div className="flex items-center gap-2 border-l border-dashed border-slate-200 pl-3">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Break</span>
                                                <input type="time" value={day.breakFrom}
                                                    onChange={e => updateDay(i, "breakFrom", e.target.value)}
                                                    className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 outline-none focus:ring-1 focus:ring-primary/15 transition-all" />
                                                <span className="text-xs text-slate-300">–</span>
                                                <input type="time" value={day.breakTo}
                                                    onChange={e => updateDay(i, "breakTo", e.target.value)}
                                                    className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 outline-none focus:ring-1 focus:ring-primary/15 transition-all" />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-slate-400 text-sm font-bold flex-1 ml-1">Closed — No appointments</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Appointment Slot Configuration */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-5">Appointment Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Slot Duration (min)</label>
                        <select value={slotDuration} onChange={e => setSlotDuration(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            <option value="15">15 minutes</option>
                            <option value="20">20 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Buffer Between Slots (min)</label>
                        <select value={bufferTime} onChange={e => setBufferTime(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            <option value="0">No buffer</option>
                            <option value="5">5 minutes</option>
                            <option value="10">10 minutes</option>
                            <option value="15">15 minutes</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Max Appointments / Day</label>
                        <input type="number" value={maxDaily} onChange={e => setMaxDaily(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                            <FiAlertCircle className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Allow Emergency Walk-ins</p>
                            <p className="text-xs text-slate-500 mt-0.5">Override full schedule for urgent cases registered manually by front desk</p>
                        </div>
                    </div>
                    <button onClick={() => setEmergency((e: boolean) => !e)}
                        className={`w-12 h-6 rounded-full relative transition-all shrink-0 ml-4 ${emergency ? "bg-amber-500" : "bg-slate-200"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${emergency ? "left-7" : "left-1"}`} />
                    </button>
                </div>
            </div>

            {/* Info Banner */}
            <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl flex gap-4 items-start">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                    <FiClock className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm">Online Booking Sync</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-lg">
                        These hours are used to automatically restrict the online booking portal. Changes take effect immediately for new bookings. Existing appointments are not affected.
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Schedule saved successfully
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="outline">Reset to Default</Button>
                    <Button onClick={save}>Save Schedule</Button>
                </div>
            </div>
        </div>
    );
};

export default WorkingHoursSettings;

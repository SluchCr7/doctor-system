"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiClock, FiCheckCircle, FiAlertCircle, FiCoffee, FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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
    const { user, updateAvailability } = useAuth();
    // Availability is attached to user directly by backend getMe
    const availability = (user as any)?.availability || {};

    const [days, setDays] = useState<Day[]>(availability.days || defaultDays);
    const [slotDuration, setSlotDuration] = useState(availability.slotDuration || 30);
    const [bufferTime, setBufferTime] = useState(availability.bufferTime || 10);
    const [maxDaily, setMaxDaily] = useState(availability.maxDaily || 24);
    const [emergency, setEmergency] = useState(availability.emergency ?? true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if ((user as any)?.availability) {
            const h = (user as any).availability;
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
            await updateAvailability({
                days,
                slotDuration: Number(slotDuration),
                bufferTime: Number(bufferTime),
                maxDaily: Number(maxDaily),
                emergency
            });
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            console.error(error);
        }
    };

    const abbr = (n: string) => n.slice(0, 3).toUpperCase();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Weekly Schedule */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 relative z-10">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Practice Time Slots</h3>
                        <p className="text-slate-500 text-sm font-medium mt-1">Configure your clinical availability and break windows.</p>
                    </div>
                    <div className="flex gap-4 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-sm text-[10px] font-black text-slate-600 uppercase tracking-widest">
                            <FiSun className="text-amber-500" /> Morning Start
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <FiMoon className="text-blue-500" /> Night Close
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    {days.map((day, i) => (
                        <motion.div 
                            key={day.name} 
                            layout
                            className={`group rounded-3xl border transition-all duration-300 ${day.active ? "border-primary/20 bg-blue-50/20 shadow-sm" : "border-slate-100 bg-slate-50/50 opacity-60 grayscale-[0.5]"}`}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center gap-6 p-5">
                                {/* Day Toggle */}
                                <div className="flex items-center gap-5 lg:w-48 shrink-0">
                                    <button
                                        onClick={() => toggle(i)}
                                        className={`w-14 h-7 rounded-full transition-all relative ${day.active ? "bg-primary shadow-lg shadow-primary/30" : "bg-slate-300"}`}
                                    >
                                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${day.active ? "left-8" : "left-1"}`} />
                                    </button>
                                    <span className={`font-black text-base tracking-tight ${day.active ? "text-slate-900" : "text-slate-400"}`}>
                                        {day.name}
                                    </span>
                                </div>

                                {day.active ? (
                                    <div className="flex flex-wrap items-center gap-6 flex-1">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Opening</span>
                                                <input type="time" value={day.from}
                                                    onChange={e => updateDay(i, "from", e.target.value)}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" />
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Closing</span>
                                                <input type="time" value={day.to}
                                                    onChange={e => updateDay(i, "to", e.target.value)}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" />
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 bg-white/50 px-6 py-3 rounded-2xl border border-dashed border-slate-200">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <FiCoffee className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Mid-Day Break</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input type="time" value={day.breakFrom}
                                                    onChange={e => updateDay(i, "breakFrom", e.target.value)}
                                                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/15 transition-all text-center" />
                                                <span className="text-slate-300 font-bold">–</span>
                                                <input type="time" value={day.breakTo}
                                                    onChange={e => updateDay(i, "breakTo", e.target.value)}
                                                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/15 transition-all text-center" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 text-slate-400 text-sm font-bold py-2">
                                        <FiMoon className="w-4 h-4" /> Clinic officially closed — No digital bookings available
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Appointment Slot Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium p-8">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6 flex items-center gap-3">
                        <FiClock className="text-primary" /> Session Logic
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Consultation Slot Duration</label>
                            <select value={slotDuration} onChange={e => setSlotDuration(Number(e.target.value))}
                                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer">
                                <option value="15">15 Minutes (Short Checkup)</option>
                                <option value="20">20 Minutes</option>
                                <option value="30">30 Minutes (Standard)</option>
                                <option value="45">45 Minutes (Extended)</option>
                                <option value="60">60 Minutes (Full Analysis)</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Sanitary Buffer (min)</label>
                                <input type="number" value={bufferTime} onChange={e => setBufferTime(Number(e.target.value))}
                                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Daily Capacity</label>
                                <input type="number" value={maxDaily} onChange={e => setMaxDaily(Number(e.target.value))}
                                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 rounded-[2.5rem] border border-amber-100 p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-4 shadow-sm">
                            <FiAlertCircle size={24} />
                        </div>
                        <h3 className="text-lg font-black text-amber-900 tracking-tight">Crisis Management</h3>
                        <p className="text-amber-800/70 text-xs font-medium mt-2 leading-relaxed">
                            Enabling emergency walk-ins allows clinic staff to override digital availability for life-threatening or urgent cases. 
                        </p>
                        <div className="mt-auto pt-8 flex items-center justify-between">
                            <span className="text-sm font-black text-amber-900">Allow Urgent Overrides</span>
                            <button onClick={() => setEmergency((e: boolean) => !e)}
                                className={`w-14 h-7 rounded-full relative transition-all shadow-sm ${emergency ? "bg-amber-500" : "bg-slate-300"}`}>
                                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${emergency ? "left-8" : "left-1"}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-premium p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                        <FiCoffee />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900 tracking-tight">Live Booking Synchronization</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Changes apply instantly to the portal</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <AnimatePresence>
                        {saved && (
                            <motion.span 
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-emerald-600 text-xs font-black italic mr-2"
                            >
                                <FiCheckCircle /> SUCCESS: CLOUD SYNCED
                            </motion.span>
                        )}
                    </AnimatePresence>
                    <button className="flex-1 md:flex-none px-6 py-3.5 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
                        Reset
                    </button>
                    <Button 
                        onClick={save}
                        className="flex-1 md:flex-none px-10 py-3.5 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Publish Schedule
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WorkingHoursSettings;

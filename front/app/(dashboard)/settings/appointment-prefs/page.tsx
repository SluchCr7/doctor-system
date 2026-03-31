"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiCalendar, FiBell, FiCheckCircle, FiClock } from "react-icons/fi";
import { HiOutlineVideoCamera, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";

const AppointmentPrefsSettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.appointmentPrefs || {};

    const [saved, setSaved] = useState(false);
    const [visitType, setVisitType] = useState(initData.visitType || "in-person");
    const [preferredTime, setPreferredTime] = useState(initData.preferredTime || "morning");
    const [preferredDay, setPreferredDay] = useState(initData.preferredDay || "weekday");
    const [reminderChannels, setReminderChannels] = useState(initData.reminderChannels || { email: true, sms: true, push: false });
    const [reminder24h, setReminder24h] = useState(initData.reminder24h ?? true);
    const [reminder2h, setReminder2h] = useState(initData.reminder2h ?? true);
    const [reminderDay7, setReminderDay7] = useState(initData.reminderDay7 ?? false);
    const [followupAuto, setFollowupAuto] = useState(initData.followupAuto ?? true);
    const [followupDays, setFollowupDays] = useState(initData.followupDays || "7");
    const [cancellationNotice, setCancellationNotice] = useState(initData.cancellationNotice || "24");
    const [specialRequirements, setSpecialRequirements] = useState(initData.specialRequirements || "Wheelchair access needed. Prefer female physician when possible.");
    const [language, setLanguage] = useState(initData.language || "English");
    const [interpreter, setInterpreter] = useState(initData.interpreter ?? false);

    useEffect(() => {
        if (user?.profileData?.appointmentPrefs) {
            const p = user.profileData.appointmentPrefs;
            if (p.visitType) setVisitType(p.visitType);
            if (p.preferredTime) setPreferredTime(p.preferredTime);
            if (p.preferredDay) setPreferredDay(p.preferredDay);
            if (p.reminderChannels) setReminderChannels(p.reminderChannels);
            if (p.reminder24h !== undefined) setReminder24h(p.reminder24h);
            if (p.reminder2h !== undefined) setReminder2h(p.reminder2h);
            if (p.reminderDay7 !== undefined) setReminderDay7(p.reminderDay7);
            if (p.followupAuto !== undefined) setFollowupAuto(p.followupAuto);
            if (p.followupDays) setFollowupDays(p.followupDays);
            if (p.cancellationNotice) setCancellationNotice(p.cancellationNotice);
            if (p.specialRequirements !== undefined) setSpecialRequirements(p.specialRequirements);
            if (p.language) setLanguage(p.language);
            if (p.interpreter !== undefined) setInterpreter(p.interpreter);
        }
    }, [user]);

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    appointmentPrefs: {
                        visitType, preferredTime, preferredDay, reminderChannels,
                        reminder24h, reminder2h, reminderDay7,
                        followupAuto, followupDays, cancellationNotice,
                        specialRequirements, language, interpreter
                    }
                }
            });
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            console.error(error);
        }
    };

    const VisitTypeCard = ({ icon: Icon, label, value, desc }: { icon: any; label: string; value: string; desc: string }) => (
        <button onClick={() => setVisitType(value)}
            className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 text-center transition-all ${visitType === value ? "border-primary bg-primary/5 shadow-md shadow-primary/10" : "border-slate-100 hover:border-slate-200"}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${visitType === value ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-slate-100 text-slate-500"}`}>
                <Icon className="w-6 h-6" />
            </div>
            <p className={`text-sm font-black ${visitType === value ? "text-primary" : "text-slate-700"}`}>{label}</p>
            <p className="text-[11px] text-slate-400 font-medium">{desc}</p>
        </button>
    );

    const Toggle = ({ label, desc, state, setState }: { label: string; desc: string; state: boolean; setState: (v: boolean) => void }) => (
        <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <div>
                <p className="text-sm font-bold text-slate-800">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
            </div>
            <button onClick={() => setState(!state)}
                className={`w-12 h-6 rounded-full relative transition-all shrink-0 ml-4 ${state ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${state ? "left-7" : "left-1"}`} />
            </button>
        </div>
    );

    const channelKeys = ["email", "sms", "push"] as const;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Visit Type Preference */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-1">Preferred Visit Type</h3>
                <p className="text-xs text-slate-500 mb-5">Your default appointment mode. Doctors may override based on medical need.</p>
                <div className="grid grid-cols-3 gap-3">
                    <VisitTypeCard icon={HiOutlineMapPin} label="In-Person" value="in-person" desc="Visit the clinic" />
                    <VisitTypeCard icon={HiOutlineVideoCamera} label="Telemedicine" value="video" desc="Video consultation" />
                    <VisitTypeCard icon={HiOutlinePhone} label="Phone Call" value="phone" desc="Phone consultation" />
                </div>
            </div>

            {/* Time & Day Preferences */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-5 flex items-center gap-2">
                    <FiClock className="w-4 h-4 text-primary" /> Scheduling Preferences
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Preferred Time of Day</label>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { value: "morning", label: "Morning", sub: "8am – 12pm" },
                                { value: "afternoon", label: "Afternoon", sub: "12pm – 5pm" },
                                { value: "evening", label: "Evening", sub: "5pm – 8pm" },
                                { value: "flexible", label: "Flexible", sub: "Any time" },
                            ].map(t => (
                                <button key={t.value} onClick={() => setPreferredTime(t.value)}
                                    className={`p-3 rounded-xl border text-left transition-all ${preferredTime === t.value ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-200 bg-slate-50"}`}>
                                    <p className={`text-sm font-bold ${preferredTime === t.value ? "text-primary" : "text-slate-700"}`}>{t.label}</p>
                                    <p className="text-[11px] text-slate-400">{t.sub}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Preferred Days</label>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { value: "weekday", label: "Weekdays", sub: "Mon – Fri" },
                                { value: "weekend", label: "Weekends", sub: "Sat & Sun" },
                                { value: "monday", label: "Early Week", sub: "Mon – Wed" },
                                { value: "flexible", label: "Any Day", sub: "No preference" },
                            ].map(d => (
                                <button key={d.value} onClick={() => setPreferredDay(d.value)}
                                    className={`p-3 rounded-xl border text-left transition-all ${preferredDay === d.value ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-200 bg-slate-50"}`}>
                                    <p className={`text-sm font-bold ${preferredDay === d.value ? "text-primary" : "text-slate-700"}`}>{d.label}</p>
                                    <p className="text-[11px] text-slate-400">{d.sub}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Minimum Cancellation Notice</label>
                        <select value={cancellationNotice} onChange={e => setCancellationNotice(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            <option value="2">2 hours</option>
                            <option value="6">6 hours</option>
                            <option value="12">12 hours</option>
                            <option value="24">24 hours</option>
                            <option value="48">48 hours</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Preferred Language</label>
                        <select value={language} onChange={e => setLanguage(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            {["English", "Spanish", "French", "Arabic", "Mandarin", "Portuguese", "German"].map(l => <option key={l}>{l}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Reminders */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-1 flex items-center gap-2">
                    <FiBell className="w-4 h-4 text-primary" /> Appointment Reminders
                </h3>
                <p className="text-xs text-slate-500 mb-5">Set how and when you want to be reminded about upcoming appointments</p>

                <div className="mb-5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Notification Channels</label>
                    <div className="flex gap-3">
                        {channelKeys.map(c => (
                            <button key={c} onClick={() => setReminderChannels(prev => ({ ...prev, [c]: !prev[c] }))}
                                className={`px-4 py-2 rounded-xl border text-sm font-bold capitalize transition-all ${reminderChannels[c] ? "bg-primary text-white border-primary shadow-sm" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-0 border border-slate-100 rounded-2xl p-4 divide-y divide-slate-50">
                    <Toggle label="Remind 7 days before" desc="Weekly advance notice for upcoming appointments" state={reminderDay7} setState={setReminderDay7} />
                    <Toggle label="Remind 24 hours before" desc="Day-ahead reminder for preparation" state={reminder24h} setState={setReminder24h} />
                    <Toggle label="Remind 2 hours before" desc="Final reminder before your appointment" state={reminder2h} setState={setReminder2h} />
                    <Toggle label="Auto follow-up after visit" desc="Receive a check-in message after your appointment" state={followupAuto} setState={setFollowupAuto} />
                </div>

                {followupAuto && (
                    <div className="mt-4 flex items-center gap-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Follow-up after</label>
                        <select value={followupDays} onChange={e => setFollowupDays(e.target.value)}
                            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            {["3", "5", "7", "14", "30"].map(d => <option key={d} value={d}>{d} days after visit</option>)}
                        </select>
                    </div>
                )}
            </div>

            {/* Special Requirements */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-1">Special Requirements</h3>
                <p className="text-xs text-slate-500 mb-4">Accessibility needs, interpreter or any preferences the clinic should know</p>
                <div className="space-y-4">
                    <textarea value={specialRequirements} onChange={e => setSpecialRequirements(e.target.value)} rows={3}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all resize-none" />
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                            <p className="text-sm font-bold text-slate-800">Requires Language Interpreter</p>
                            <p className="text-xs text-slate-500">Clinic will arrange a certified interpreter for {language} consultations</p>
                        </div>
                        <button onClick={() => setInterpreter(e => !e)}
                            className={`w-12 h-6 rounded-full relative transition-all shrink-0 ml-4 ${interpreter ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${interpreter ? "left-7" : "left-1"}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Appointment preferences saved
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="outline">Discard</Button>
                    <Button onClick={save} leftIcon={<FiCalendar className="w-4 h-4" />}>Save Preferences</Button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentPrefsSettings;

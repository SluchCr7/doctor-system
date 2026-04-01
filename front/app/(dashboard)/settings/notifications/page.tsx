"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiBell, FiMail, FiPhone, FiCheckCircle, FiSmartphone } from "react-icons/fi";

type Channel = "email" | "sms" | "push";

interface Rule {
    label: string;
    desc: string;
    email: boolean;
    sms: boolean;
    push: boolean;
    color: string;
}

const NotificationsSettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.notifications || {};

    const [saved, setSaved] = useState(false);
    const [quietFrom, setQuietFrom] = useState(initData.quietFrom || "22:00");
    const [quietTo, setQuietTo] = useState(initData.quietTo || "07:00");
    const [quietEnabled, setQuietEnabled] = useState(initData.quietEnabled ?? true);
    const [digestEnabled, setDigestEnabled] = useState(initData.digestEnabled ?? true);
    const [digestFreq, setDigestFreq] = useState(initData.digestFreq || "daily");

    const defaultRules: Rule[] = [
        { label: "New Appointment Booking", desc: "Notify when a patient books or requests an appointment", email: true, sms: true, push: true, color: "bg-primary" },
        { label: "Appointment Cancellation", desc: "Alert when a patient cancels or reschedules", email: true, sms: true, push: true, color: "bg-rose-500" },
        { label: "Appointment Reminder (24h)", desc: "Send reminder to staff 24 hours before visit", email: true, sms: false, push: true, color: "bg-amber-500" },
        { label: "Patient Check-In", desc: "Notify when a patient checks in at front desk", email: false, sms: false, push: true, color: "bg-emerald-500" },
        { label: "Lab Results Ready", desc: "Alert when new lab/diagnostic results are uploaded", email: true, sms: true, push: true, color: "bg-indigo-500" },
        { label: "Emergency / Urgent Case", desc: "Immediate notification for urgent or emergency cases", email: true, sms: true, push: true, color: "bg-red-600" },
        { label: "Invoice Paid", desc: "Confirm when a patient payment is processed", email: true, sms: false, push: false, color: "bg-teal-500" },
        { label: "System / Security Alerts", desc: "Login attempts, password changes and system events", email: true, sms: true, push: false, color: "bg-slate-700" },
    ];
    
    const [rules, setRules] = useState<Rule[]>(initData.rules || defaultRules);

    useEffect(() => {
        if (user?.profileData?.notifications) {
            const n = user.profileData.notifications;
            if (n.quietFrom) setQuietFrom(n.quietFrom);
            if (n.quietTo) setQuietTo(n.quietTo);
            if (n.quietEnabled !== undefined) setQuietEnabled(n.quietEnabled);
            if (n.digestEnabled !== undefined) setDigestEnabled(n.digestEnabled);
            if (n.digestFreq) setDigestFreq(n.digestFreq);
            if (n.rules) setRules(n.rules);
        }
    }, [user]);

    const toggle = (i: number, ch: Channel) =>
        setRules((r: Rule[]) => r.map((rule, idx) => idx === i ? { ...rule, [ch]: !rule[ch] } : rule));

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    notifications: { quietFrom, quietTo, quietEnabled, digestEnabled, digestFreq, rules }
                }
            });
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            console.error(error);
        }
    };

    const ChannelToggle = ({ on, onClick, icon: Icon, label }: { on: boolean; onClick: () => void; icon: React.ElementType; label: string }) => (
        <button onClick={onClick}
            title={label}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${on
                ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                : "bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300"}`}>
            <Icon className="w-3 h-3" />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Channel Legend */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-2">Notification Rules</h3>
                <p className="text-xs text-slate-500 mb-6">Choose which channels should be used for each event type.</p>

                <div className="flex gap-3 mb-5 pb-4 border-b border-slate-50">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-xl text-[11px] font-bold"><FiMail className="w-3 h-3" /> Email</span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-[11px] font-bold"><FiPhone className="w-3 h-3" /> SMS</span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-[11px] font-bold"><FiSmartphone className="w-3 h-3" /> Push</span>
                </div>

                <div className="space-y-2">
                    {rules.map((rule, i) => (
                        <div key={rule.label}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-10 sm:h-8 rounded-full ${rule.color} shrink-0`} />
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{rule.label}</p>
                                    <p className="text-xs text-slate-500">{rule.desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <ChannelToggle on={rule.email} onClick={() => toggle(i, "email")} icon={FiMail} label="Email" />
                                <ChannelToggle on={rule.sms} onClick={() => toggle(i, "sms")} icon={FiPhone} label="SMS" />
                                <ChannelToggle on={rule.push} onClick={() => toggle(i, "push")} icon={FiSmartphone} label="Push" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quiet Hours */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-base font-black text-slate-800">Quiet Hours (Do Not Disturb)</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Suppress non-urgent notifications during off-hours</p>
                    </div>
                    <button onClick={() => setQuietEnabled((e: boolean) => !e)}
                        className={`w-12 h-6 rounded-full relative transition-all ${quietEnabled ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${quietEnabled ? "left-7" : "left-1"}`} />
                    </button>
                </div>
                <div className={`flex items-center gap-4 transition-opacity ${quietEnabled ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">From</label>
                        <input type="time" value={quietFrom} onChange={e => setQuietFrom(e.target.value)}
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                    </div>
                    <span className="text-slate-300 text-xl font-black mt-4">→</span>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">To</label>
                        <input type="time" value={quietTo} onChange={e => setQuietTo(e.target.value)}
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                    </div>
                </div>
            </div>

            {/* Daily Digest */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-base font-black text-slate-800">Daily Summary Digest</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Receive a consolidated report of clinic activity</p>
                    </div>
                    <button onClick={() => setDigestEnabled((e: boolean) => !e)}
                        className={`w-12 h-6 rounded-full relative transition-all ${digestEnabled ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${digestEnabled ? "left-7" : "left-1"}`} />
                    </button>
                </div>
                <div className={`transition-opacity ${digestEnabled ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
                    <div className="flex gap-3">
                        {["daily", "weekly"].map(f => (
                            <button key={f} onClick={() => setDigestFreq(f)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all capitalize ${digestFreq === f ? "bg-primary text-white border-primary shadow-sm" : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300"}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Notification preferences saved
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="outline">Reset Defaults</Button>
                    <Button onClick={save} leftIcon={<FiBell className="w-4 h-4" />}>Save Preferences</Button>
                </div>
            </div>
        </div>
    );
};

export default NotificationsSettings;

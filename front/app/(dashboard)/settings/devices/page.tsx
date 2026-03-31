"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiSmartphone, FiMonitor, FiTrash2, FiCheckCircle, FiTablet } from "react-icons/fi";
import { HiOutlineWifi, HiOutlineDevicePhoneMobile } from "react-icons/hi2";

const sessions = [
    { id: 1, device: "iPhone 15 Pro", type: "mobile", browser: "Safari", location: "New York, USA", ip: "192.168.1.14", lastSeen: "Active now", current: true },
    { id: 2, device: "MacBook Pro 14\"", type: "desktop", browser: "Chrome 122", location: "New York, USA", ip: "192.168.1.5", lastSeen: "2 hours ago", current: false },
    { id: 3, device: "iPad Air", type: "tablet", browser: "Safari 17", location: "New York, USA", ip: "192.168.1.22", lastSeen: "Yesterday", current: false },
    { id: 4, device: "Windows PC", type: "desktop", browser: "Edge 121", location: "Boston, USA", ip: "10.0.0.45", lastSeen: "4 days ago", current: false },
];

const wearables = [
    { name: "Apple Watch Series 9", status: "connected", data: ["Heart Rate", "SpO2", "Steps", "Sleep"], icon: "⌚", syncedAt: "5 min ago" },
    { name: "Fitbit Sense 2", status: "disconnected", data: ["Heart Rate", "Steps", "Stress Score"], icon: "📳", syncedAt: "3 days ago" },
];

const ConnectedDevicesSettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.devices || {};

    const [deviceSessions, setDeviceSessions] = useState(initData.sessions || sessions);
    const [showRevokeAll, setShowRevokeAll] = useState(false);
    const [saved, setSaved] = useState(false);
    const [healthSync, setHealthSync] = useState(initData.healthSync ?? true);
    const [autoShare, setAutoShare] = useState(initData.autoShare ?? false);

    useEffect(() => {
        if (user?.profileData?.devices) {
            const d = user.profileData.devices;
            if (d.sessions) setDeviceSessions(d.sessions);
            if (d.healthSync !== undefined) setHealthSync(d.healthSync);
            if (d.autoShare !== undefined) setAutoShare(d.autoShare);
        }
    }, [user]);

    const revokeSession = (id: number) => setDeviceSessions(s => s.filter(d => d.id !== id));

    const DeviceIcon = ({ type }: { type: string }) => {
        if (type === "mobile") return <HiOutlineDevicePhoneMobile className="w-5 h-5" />;
        if (type === "tablet") return <FiTablet className="w-5 h-5" />;
        return <FiMonitor className="w-5 h-5" />;
    };

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    devices: { sessions: deviceSessions, healthSync, autoShare }
                }
            });
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Active Sessions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                            <FiMonitor className="w-4 h-4 text-primary" /> Active Sessions
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">All devices currently logged into your patient account</p>
                    </div>
                    <button onClick={() => setShowRevokeAll(true)}
                        className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors">
                        Sign out all others
                    </button>
                </div>

                <div className="space-y-2">
                    {deviceSessions.map(d => (
                        <div key={d.id}
                            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${d.current ? "border-primary/15 bg-primary/5" : "border-slate-100 hover:border-slate-200"}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d.current ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"}`}>
                                <DeviceIcon type={d.type} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold text-slate-800">{d.device}</p>
                                    {d.current && <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-100">THIS DEVICE</span>}
                                </div>
                                <p className="text-xs text-slate-500">{d.browser} · {d.location} · {d.ip}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className={`text-xs font-bold ${d.current ? "text-emerald-600" : "text-slate-400"}`}>{d.lastSeen}</p>
                                {!d.current && (
                                    <button onClick={() => revokeSession(d.id)}
                                        className="mt-1 flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors ml-auto">
                                        <FiTrash2 className="w-3 h-3" /> Revoke
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Wearables & Health Apps */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                            <HiOutlineWifi className="w-4 h-4 text-primary" /> Health Devices & Wearables
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">Sync health data from smartwatches and fitness trackers</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">Auto-Sync</span>
                        <button onClick={() => setHealthSync(e => !e)}
                            className={`w-12 h-6 rounded-full relative transition-all ${healthSync ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${healthSync ? "left-7" : "left-1"}`} />
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    {wearables.map(w => (
                        <div key={w.name}
                            className={`p-4 rounded-2xl border transition-all ${w.status === "connected" ? "border-primary/15 bg-primary/5" : "border-slate-100 bg-slate-50"}`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{w.icon}</span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{w.name}</p>
                                        <p className="text-xs text-slate-500">Last synced: {w.syncedAt}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2.5 py-1 text-[10px] font-black rounded-full ${w.status === "connected" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-400"}`}>
                                        {w.status === "connected" ? "● Connected" : "○ Disconnected"}
                                    </span>
                                    {w.status === "connected" ? (
                                        <button className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors">Disconnect</button>
                                    ) : (
                                        <button className="text-xs font-bold text-primary hover:underline">Connect</button>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {w.data.map(d => (
                                    <span key={d} className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${w.status === "connected" ? "bg-primary/10 text-primary border-primary/10" : "bg-slate-100 text-slate-400 border-slate-100"}`}>{d}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="mt-4 w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-primary/30 hover:text-primary transition-all text-sm font-bold flex items-center justify-center gap-2">
                    <FiSmartphone className="w-4 h-4" /> Connect a New Device
                </button>
            </div>

            {/* Health Data Sharing */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-5">Health Data Sharing</h3>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                        <p className="text-sm font-bold text-slate-800">Auto-share wearable data with your doctor</p>
                        <p className="text-xs text-slate-500 mt-0.5">Heart rate, sleep and activity data will be visible to your care team</p>
                    </div>
                    <button onClick={() => setAutoShare(e => !e)}
                        className={`w-12 h-6 rounded-full relative transition-all shrink-0 ml-4 ${autoShare ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${autoShare ? "left-7" : "left-1"}`} />
                    </button>
                </div>
                <p className="text-xs text-slate-400 mt-3 px-1">Data is encrypted in transit and at rest. You can revoke access at any time.</p>
            </div>

            {/* Revoke All Modal */}
            {showRevokeAll && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">
                        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                            <FiTrash2 className="w-7 h-7 text-red-500" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-2">Sign Out All Devices?</h3>
                        <p className="text-slate-500 text-sm mb-6">All other sessions will be immediately terminated. You will remain logged in on this device only.</p>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setShowRevokeAll(false)}>Cancel</Button>
                            <Button variant="danger" className="flex-1" onClick={() => {
                                setDeviceSessions(s => s.filter(d => d.current));
                                setShowRevokeAll(false);
                            }}>Sign Out All</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Device settings saved
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="outline">Discard</Button>
                    <Button onClick={save}>Save Device Settings</Button>
                </div>
            </div>
        </div>
    );
};

export default ConnectedDevicesSettings;

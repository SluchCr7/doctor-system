"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiSave, FiDownload, FiCloud, FiClock, FiCheckCircle, FiRefreshCw, FiAlertTriangle } from "react-icons/fi";

const backupHistory = [
    { date: "Mar 31, 2026 – 03:00 AM", size: "148 MB", status: "success", type: "Automated (Cloud)", id: "BCK-2026-0331" },
    { date: "Mar 30, 2026 – 03:00 AM", size: "146 MB", status: "success", type: "Automated (Cloud)", id: "BCK-2026-0330" },
    { date: "Mar 29, 2026 – 11:45 PM", size: "144 MB", status: "success", type: "Manual (Local)", id: "BCK-2026-0329" },
    { date: "Mar 28, 2026 – 03:00 AM", size: "143 MB", status: "failed", type: "Automated (Cloud)", id: "BCK-2026-0328" },
    { date: "Mar 27, 2026 – 03:00 AM", size: "141 MB", status: "success", type: "Automated (Cloud)", id: "BCK-2026-0327" },
];

const BackupSettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.backupSettings || {};

    const [autoBackup, setAutoBackup] = useState(initData.autoBackup ?? true);
    const [backupFreq, setBackupFreq] = useState(initData.backupFreq || "daily");
    const [backupTime, setBackupTime] = useState(initData.backupTime || "03:00");
    const [retention, setRetention] = useState(initData.retention || "30");
    const [encryption, setEncryption] = useState(initData.encryption ?? true);
    const [restoreModal, setRestoreModal] = useState<string | null>(null);
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (user?.profileData?.backupSettings) {
            const b = user.profileData.backupSettings;
            if (b.autoBackup !== undefined) setAutoBackup(b.autoBackup);
            if (b.backupFreq) setBackupFreq(b.backupFreq);
            if (b.backupTime) setBackupTime(b.backupTime);
            if (b.retention) setRetention(b.retention);
            if (b.encryption !== undefined) setEncryption(b.encryption);
        }
    }, [user]);

    const runBackup = () => {
        setIsBackingUp(true);
        setTimeout(() => { setIsBackingUp(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, 2500);
    };

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    backupSettings: { autoBackup, backupFreq, backupTime, retention, encryption }
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
            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Last Backup</p>
                    <p className="text-base font-black text-slate-800">Mar 31, 2026</p>
                    <p className="text-xs text-emerald-600 font-bold mt-1">● Successful · 148 MB</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Next Backup</p>
                    <p className="text-base font-black text-slate-800">Apr 1, 2026</p>
                    <p className="text-xs text-primary font-bold mt-1">● Scheduled · 03:00 AM</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Storage Used</p>
                    <p className="text-base font-black text-slate-800">3.2 GB</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-[32%] bg-primary rounded-full" />
                        </div>
                        <span className="text-xs text-slate-400 font-bold">32% of 10 GB</span>
                    </div>
                </div>
            </div>

            {/* Backup Configuration */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-base font-black text-slate-800">Automated Cloud Backup</h3>
                        <p className="text-xs text-slate-500 mt-0.5">End-to-end encrypted backups to secure remote servers</p>
                    </div>
                    <button onClick={() => setAutoBackup(e => !e)}
                        className={`w-14 h-7 rounded-full relative transition-all ${autoBackup ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}>
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${autoBackup ? "left-8" : "left-1"}`} />
                    </button>
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transition-opacity ${autoBackup ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Frequency</label>
                        <select value={backupFreq} onChange={e => setBackupFreq(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            <option value="hourly">Every Hour</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Run Time</label>
                        <input type="time" value={backupTime} onChange={e => setBackupTime(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Retain For (days)</label>
                        <select value={retention} onChange={e => setRetention(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            <option value="7">7 days</option>
                            <option value="14">14 days</option>
                            <option value="30">30 days</option>
                            <option value="60">60 days</option>
                            <option value="90">90 days</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                            <FiCloud className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">AES-256 Encryption</p>
                            <p className="text-xs text-slate-500">Backup data is encrypted before upload</p>
                        </div>
                    </div>
                    <button onClick={() => setEncryption(e => !e)}
                        className={`w-12 h-6 rounded-full relative transition-all ${encryption ? "bg-emerald-500" : "bg-slate-200"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${encryption ? "left-7" : "left-1"}`} />
                    </button>
                </div>
            </div>

            {/* Manual Export */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-1">Manual Export</h3>
                <p className="text-xs text-slate-500 mb-5">Download a full snapshot of your clinic database. Exports include patients, appointments, billing and medical records.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: "Patients", fmt: "CSV" },
                        { label: "Appointments", fmt: "CSV" },
                        { label: "Billing", fmt: "CSV" },
                        { label: "Full Database", fmt: "JSON" },
                    ].map(e => (
                        <button key={e.label}
                            className="flex flex-col items-center gap-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-primary/30 hover:bg-primary/5 transition-all group">
                            <FiDownload className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                            <p className="text-xs font-bold text-slate-700">{e.label}</p>
                            <span className="text-[10px] font-black text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full">{e.fmt}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Backup History */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-primary" /> Backup History
                    </h3>
                    <Button size="sm" variant="outline" isLoading={isBackingUp} onClick={runBackup}
                        leftIcon={<FiRefreshCw className="w-3.5 h-3.5" />}>
                        {isBackingUp ? "Running…" : "Run Now"}
                    </Button>
                </div>
                <div className="overflow-hidden border border-slate-100 rounded-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                {["ID", "Date & Time", "Type", "Size", "Status", ""].map(h => (
                                    <th key={h} className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {backupHistory.map(b => (
                                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-3 text-xs font-black text-slate-500">{b.id}</td>
                                    <td className="px-5 py-3 text-sm font-semibold text-slate-700">{b.date}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500">{b.type}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500">{b.size}</td>
                                    <td className="px-5 py-3">
                                        {b.status === "success" ? (
                                            <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600">
                                                <FiCheckCircle className="w-3.5 h-3.5" /> SUCCESS
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-[10px] font-black text-red-500">
                                                <FiAlertTriangle className="w-3.5 h-3.5" /> FAILED
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        {b.status === "success" && (
                                            <button onClick={() => setRestoreModal(b.id)}
                                                className="text-xs font-bold text-primary hover:underline">
                                                Restore
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Restore Confirmation Modal */}
            {restoreModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-5 mx-auto">
                            <FiAlertTriangle className="w-7 h-7 text-amber-500" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 text-center mb-2">Confirm Restore</h3>
                        <p className="text-slate-500 text-sm text-center mb-6">
                            You are about to restore backup <span className="font-bold text-slate-700">{restoreModal}</span>.
                            This will overwrite current clinic data. This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setRestoreModal(null)}>Cancel</Button>
                            <Button variant="danger" className="flex-1" onClick={() => { setRestoreModal(null); save(); }}>Restore Now</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Backup settings saved
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="outline">Discard</Button>
                    <Button onClick={save} leftIcon={<FiSave className="w-4 h-4" />}>Save Backup Config</Button>
                </div>
            </div>
        </div>
    );
};

export default BackupSettings;

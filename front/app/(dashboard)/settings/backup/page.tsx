"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { FiSave, FiDownload, FiCloud, FiClock } from "react-icons/fi";

const BackupSettings = () => {
    const backupHistory = [
        { date: "2026-02-21 03:00 AM", size: "124 MB", status: "success", type: "Automated (Cloud)" },
        { date: "2026-02-20 03:00 AM", size: "122 MB", status: "success", type: "Automated (Cloud)" },
        { date: "2026-02-19 11:45 PM", size: "120 MB", status: "success", type: "Manual (Local)" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Data Backup & Restore</h3>
                        <p className="text-sm text-slate-500">Ensure your clinic data is always safe and recoverable.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl flex gap-5 items-start">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0">
                            <FiCloud className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">Automated Cloud Backup</h4>
                            <p className="text-xs text-slate-500 mt-1 mb-4">Your data is backed up every day at 3 AM to our secure encrypted servers.</p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <span className="text-[10px] font-bold text-emerald-600 uppercase">System Status: Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex gap-5 items-start">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-600 shrink-0">
                            <FiSave className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">Manual Export</h4>
                            <p className="text-xs text-slate-500 mt-1 mb-4">Download a full snapshot of your database in JSON or CSV format.</p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-8 text-[10px]" leftIcon={<FiDownload />}>JSON</Button>
                                <Button size="sm" variant="outline" className="h-8 text-[10px]" leftIcon={<FiDownload />}>CSV</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <FiClock className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Recent Backup History</span>
                    </div>

                    <div className="overflow-hidden border border-slate-100 rounded-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Size</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {backupHistory.map((backup, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">{backup.date}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{backup.type}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{backup.size}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded">SUCCESS</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary font-bold text-xs hover:underline">Restore</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackupSettings;

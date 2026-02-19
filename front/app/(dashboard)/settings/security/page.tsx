"use client";
import React from "react";
import { FiShield, FiSmartphone } from "react-icons/fi";

const SecuritySettings = () => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
            <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4">Security Configuration</h3>

            <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl"><FiSmartphone className="w-5 h-5" /></div>
                        <div>
                            <p className="font-bold text-slate-800">Two-Factor Authentication (2FA)</p>
                            <p className="text-xs text-slate-400 font-medium">Add an extra layer of security to your admin account</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:border-primary hover:text-primary transition-all">Enable</button>
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-danger/10 text-danger rounded-xl"><FiShield className="w-5 h-5" /></div>
                        <div>
                            <p className="font-bold text-slate-800">Automatic Session Logout</p>
                            <p className="text-xs text-slate-400 font-medium">Logout after 30 minutes of inactivity</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:border-primary hover:text-primary transition-all">Configure</button>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;

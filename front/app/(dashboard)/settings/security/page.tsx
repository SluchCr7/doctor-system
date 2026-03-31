"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiLock, FiEye, FiEyeOff, FiSmartphone, FiCheckCircle, FiAlertCircle, FiMonitor, FiTrash2 } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi2";

const sessions = [
    { device: "Chrome on Windows 11", location: "New York, USA", ip: "192.168.1.1", time: "Now (current)", current: true },
    { device: "Safari on iPhone 15", location: "New York, USA", ip: "192.168.1.10", time: "2h ago", current: false },
    { device: "Firefox on MacBook", location: "Boston, USA", ip: "10.0.0.8", time: "Yesterday", current: false },
];

const SecuritySettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.security || {};

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [twoFa, setTwoFa] = useState(initData.twoFa ?? true);
    const [loginAlerts, setLoginAlerts] = useState(initData.loginAlerts ?? true);
    const [sessionTimeout, setSessionTimeout] = useState(initData.sessionTimeout || "60");
    const [saved, setSaved] = useState(false);
    const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });

    useEffect(() => {
        if (user?.profileData?.security) {
            const s = user.profileData.security;
            if (s.twoFa !== undefined) setTwoFa(s.twoFa);
            if (s.loginAlerts !== undefined) setLoginAlerts(s.loginAlerts);
            if (s.sessionTimeout) setSessionTimeout(s.sessionTimeout);
        }
    }, [user]);

    const strength = (() => {
        const p = pwForm.newPw;
        if (!p) return 0;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
    const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-sky-400", "bg-emerald-500"][strength];

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    security: { twoFa, loginAlerts, sessionTimeout }
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
            {/* Password Change */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-1 flex items-center gap-2">
                    <FiLock className="w-4 h-4 text-primary" /> Change Password
                </h3>
                <p className="text-xs text-slate-500 mb-6">Use a strong, unique password. We recommend 12+ characters with a mix of letters, numbers and symbols.</p>

                <div className="space-y-4 max-w-md">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                        <div className="relative">
                            <input type={showCurrent ? "text" : "password"} value={pwForm.current}
                                onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))}
                                placeholder="Enter current password"
                                className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                            <button onClick={() => setShowCurrent(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                                {showCurrent ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                        <div className="relative">
                            <input type={showNew ? "text" : "password"} value={pwForm.newPw}
                                onChange={e => setPwForm(f => ({ ...f, newPw: e.target.value }))}
                                placeholder="Min. 12 characters"
                                className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                            <button onClick={() => setShowNew(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                                {showNew ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                            </button>
                        </div>
                        {pwForm.newPw && (
                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex gap-1 flex-1">
                                    {[1, 2, 3, 4].map(l => (
                                        <div key={l} className={`h-1.5 flex-1 rounded-full transition-all ${l <= strength ? strengthColor : "bg-slate-200"}`} />
                                    ))}
                                </div>
                                <span className={`text-[11px] font-black ${["", "text-red-500", "text-amber-500", "text-sky-500", "text-emerald-600"][strength]}`}>{strengthLabel}</span>
                            </div>
                        )}
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm New Password</label>
                        <div className="relative">
                            <input type={showConfirm ? "text" : "password"} value={pwForm.confirm}
                                onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))}
                                placeholder="Re-enter new password"
                                className={`w-full pl-4 pr-12 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 transition-all ${pwForm.confirm && pwForm.confirm !== pwForm.newPw ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-primary/15 focus:border-primary"}`} />
                            <button onClick={() => setShowConfirm(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                                {showConfirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                            </button>
                        </div>
                        {pwForm.confirm && pwForm.confirm !== pwForm.newPw && (
                            <p className="text-xs text-red-500 font-bold flex items-center gap-1.5 mt-1">
                                <FiAlertCircle className="w-3.5 h-3.5" /> Passwords do not match
                            </p>
                        )}
                    </div>
                    <Button onClick={save} leftIcon={<FiLock className="w-4 h-4" />}>Update Password</Button>
                </div>
            </div>

            {/* 2FA */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <FiSmartphone className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-slate-800">Two-Factor Authentication</h3>
                            <p className="text-xs text-slate-500">Require a code from your phone on every login</p>
                        </div>
                    </div>
                    <button onClick={() => setTwoFa(e => !e)}
                        className={`w-14 h-7 rounded-full relative transition-all ${twoFa ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}>
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${twoFa ? "left-8" : "left-1"}`} />
                    </button>
                </div>
                {twoFa && (
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                        <HiOutlineShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                        <p className="text-xs font-bold text-emerald-700">2FA is active. Your account is secured with app-based authentication (Google Authenticator / Authy).</p>
                    </div>
                )}
            </div>

            {/* Login Alerts & Session Timeout */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-5">Advanced Security</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                            <p className="text-sm font-bold text-slate-800">Login Alerts via Email</p>
                            <p className="text-xs text-slate-500">Get notified for every new login to your account</p>
                        </div>
                        <button onClick={() => setLoginAlerts(e => !e)}
                            className={`w-12 h-6 rounded-full relative transition-all ${loginAlerts ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${loginAlerts ? "left-7" : "left-1"}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                            <p className="text-sm font-bold text-slate-800">Session Timeout</p>
                            <p className="text-xs text-slate-500">Auto-logout after inactivity for HIPAA compliance</p>
                        </div>
                        <select value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}
                            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="480">8 hours</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-5 flex items-center gap-2">
                    <FiMonitor className="w-4 h-4 text-primary" /> Active Sessions
                </h3>
                <div className="space-y-2">
                    {sessions.map(s => (
                        <div key={s.device} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${s.current ? "border-primary/15 bg-primary/5" : "border-slate-100 hover:border-slate-200"}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.current ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"}`}>
                                    <FiMonitor className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{s.device}</p>
                                    <p className="text-xs text-slate-500">{s.location} · {s.ip} · {s.time}</p>
                                </div>
                            </div>
                            {s.current ? (
                                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-100">THIS DEVICE</span>
                            ) : (
                                <button className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-xl transition-all">
                                    <FiTrash2 className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button className="mt-4 text-xs font-bold text-red-500 hover:text-red-600 transition-colors">
                    Sign out of all other sessions →
                </button>
            </div>

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Security settings updated
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={save} leftIcon={<FiLock className="w-4 h-4" />}>Save Security Settings</Button>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;

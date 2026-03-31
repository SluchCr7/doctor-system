"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiShield, FiPlus, FiMoreVertical, FiCheckCircle, FiLock, FiUsers, FiTrash2, FiEdit2 } from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const PERMISSIONS = [
    "View Patients", "Edit Patients", "Manage Appointments",
    "View Billing", "Manage Billing", "View Reports",
    "Export Data", "Manage Staff", "System Config"
];

const defaultStaff = [
    { name: "Dr. Alexander Hayes", email: "dr.hayes@clinic.com", role: "Admin / Doctor", status: "active", perms: ["View Patients", "Edit Patients", "Manage Appointments", "View Billing", "Manage Billing", "View Reports", "Export Data", "Manage Staff", "System Config"], color: "from-primary to-sky-400" },
    { name: "Sarah Miller", email: "sarah.m@clinic.com", role: "Receptionist", status: "active", perms: ["View Patients", "Manage Appointments", "View Billing"], color: "from-emerald-500 to-teal-400" },
    { name: "James Cooper", email: "j.cooper@clinic.com", role: "Nurse", status: "active", perms: ["View Patients", "Edit Patients", "Manage Appointments"], color: "from-violet-500 to-purple-400" },
    { name: "Linda Torres", email: "l.torres@clinic.com", role: "Billing Clerk", status: "inactive", perms: ["View Billing", "Manage Billing", "Export Data"], color: "from-amber-500 to-orange-400" },
];

const UserRolesSettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.roles || {};

    const [staff, setStaff] = useState(initData.staff || defaultStaff);
    const [selected, setSelected] = useState<number | null>(0);
    const [saved, setSaved] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [invite, setInvite] = useState({ name: "", email: "", role: "Receptionist" });

    useEffect(() => {
        if (user?.profileData?.roles?.staff) {
            setStaff(user.profileData.roles.staff);
        }
    }, [user]);

    const togglePerm = (perm: string) => {
        if (selected === null) return;
        setStaff(s => s.map((m, i) => i === selected ? {
            ...m,
            perms: m.perms.includes(perm) ? m.perms.filter(p => p !== perm) : [...m.perms, perm]
        } : m));
    };

    const removeStaff = (i: number) => {
        setStaff(s => s.filter((_, idx) => idx !== i));
        setSelected(null);
    };

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    roles: { staff }
                }
            });
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            console.error(error);
        }
    };

    const selectedMember = selected !== null ? staff[selected] : null;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-50">
                    <div>
                        <h3 className="text-base font-black text-slate-800">Staff & Access Management</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Control who can access the clinic system and what they can do</p>
                    </div>
                    <Button size="sm" leftIcon={<FiPlus className="w-3.5 h-3.5" />} onClick={() => setInviteOpen(true)}>
                        Invite Staff
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {/* Staff List */}
                    <div className="md:col-span-2 p-4 space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-3">{staff.length} Team Members</p>
                        {staff.map((member, i) => (
                            <button key={member.email} onClick={() => setSelected(i)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border ${selected === i ? "border-primary/20 bg-primary/5" : "border-transparent hover:bg-slate-50"}`}>
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-black text-sm shrink-0`}>
                                    {member.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 truncate">{member.name}</p>
                                    <p className="text-xs text-slate-500 truncate">{member.role}</p>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${member.status === "active" ? "bg-emerald-500" : "bg-slate-300"}`} />
                            </button>
                        ))}
                    </div>

                    {/* Permission Editor */}
                    <div className="md:col-span-3 p-6">
                        {selectedMember ? (
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedMember.color} flex items-center justify-center text-white font-black text-lg`}>
                                            {selectedMember.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-800">{selectedMember.name}</h4>
                                            <p className="text-xs text-slate-500">{selectedMember.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary">
                                            <FiEdit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => removeStaff(selected!)} className="p-2 hover:bg-red-50 rounded-xl transition-all text-slate-400 hover:text-red-500">
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Role</p>
                                        <select
                                            value={selectedMember.role}
                                            onChange={e => setStaff(s => s.map((m, i) => i === selected ? { ...m, role: e.target.value } : m))}
                                            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                                            {["Admin / Doctor", "Receptionist", "Nurse", "Billing Clerk", "Lab Technician", "Pharmacist", "Support Staff"].map(r => <option key={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Status</p>
                                        <button
                                            onClick={() => setStaff(s => s.map((m, i) => i === selected ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m))}
                                            className={`mt-1 px-3 py-2 rounded-xl text-xs font-black transition-all border ${selectedMember.status === "active" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                                            {selectedMember.status === "active" ? "● Active" : "○ Inactive"}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                        <FiLock className="w-3 h-3" /> Permissions ({selectedMember.perms.length}/{PERMISSIONS.length})
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {PERMISSIONS.map(perm => {
                                            const on = selectedMember.perms.includes(perm);
                                            return (
                                                <button key={perm} onClick={() => togglePerm(perm)}
                                                    className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-bold transition-all border text-left ${on ? "bg-primary/5 border-primary/15 text-primary" : "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200"}`}>
                                                    <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all ${on ? "border-primary bg-primary" : "border-slate-300"}`}>
                                                        {on && <FiCheckCircle className="w-3 h-3 text-white" />}
                                                    </div>
                                                    {perm}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-16">
                                <FiUsers className="w-10 h-10 mb-3" />
                                <p className="font-bold text-slate-500">Select a staff member</p>
                                <p className="text-xs mt-1">to edit their role and permissions</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Security Notice */}
            <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-4 items-start">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                    <FiShield className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm">Security Policy Reminder</h4>
                    <p className="text-xs text-slate-500 mt-1">Ensure every admin-level account has 2FA enabled. Never share login credentials between staff members. Inactive accounts should be deactivated immediately.</p>
                </div>
            </div>

            {/* Invite Modal */}
            {inviteOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
                        <h3 className="text-xl font-black text-slate-800 mb-1">Invite Staff Member</h3>
                        <p className="text-slate-500 text-sm mb-6">They'll receive an email to set up their account.</p>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                                <input value={invite.name} onChange={e => setInvite(i => ({ ...i, name: e.target.value }))} placeholder="Jane Doe"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                <input type="email" value={invite.email} onChange={e => setInvite(i => ({ ...i, email: e.target.value }))} placeholder="jane@clinic.com"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
                                <select value={invite.role} onChange={e => setInvite(i => ({ ...i, role: e.target.value }))}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                                    {["Receptionist", "Nurse", "Billing Clerk", "Lab Technician", "Pharmacist", "Support Staff"].map(r => <option key={r}>{r}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <Button variant="outline" className="flex-1" onClick={() => setInviteOpen(false)}>Cancel</Button>
                            <Button className="flex-1" onClick={() => { setInviteOpen(false); save(); }}>Send Invitation</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Permissions saved successfully
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="outline">Discard</Button>
                    <Button onClick={save} leftIcon={<FiShield className="w-4 h-4" />}>Save Access Rules</Button>
                </div>
            </div>
        </div>
    );
};

export default UserRolesSettings;

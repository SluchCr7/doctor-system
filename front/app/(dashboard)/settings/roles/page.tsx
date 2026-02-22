"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FiShield, FiUser, FiMoreVertical, FiPlus } from "react-icons/fi";

const UserRolesSettings = () => {
    const roles = [
        {
            name: "Dr. Alexander Hayes",
            role: "Admin / Doctor",
            email: "dr.hayes@alexanderclinic.com",
            status: "active",
            permissions: ["Read/Write", "Financials", "System Config"]
        },
        {
            name: "Sarah Miller",
            role: "Receptionist",
            email: "sarah.m@alexanderclinic.com",
            status: "active",
            permissions: ["Appointments", "Patient Registration", "Billing"]
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">User Roles & Access</h3>
                        <p className="text-sm text-slate-500">Manage who can access the clinic system and their permissions.</p>
                    </div>
                    <Button size="sm" leftIcon={<FiPlus className="w-4 h-4" />}>Invite Staff</Button>
                </div>

                <div className="overflow-hidden border border-slate-100 rounded-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Permissions</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {roles.map((user) => (
                                <tr key={user.email} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                                                <p className="text-xs text-slate-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <FiShield className="w-3.5 h-3.5 text-primary" />
                                            <span className="text-sm font-semibold text-slate-600">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {user.permissions.map(p => (
                                                <span key={p} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="success" className="text-[10px]">ACTIVE</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary border border-transparent hover:border-slate-100">
                                            <FiMoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 p-5 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                    <div className="w-10 h-10 shrink-0 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                        <FiShield className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">Security Best Practice</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-lg">
                            Ensure all administrative users have Two-Factor Authentication (2FA) enabled.
                            Never share a single login between multiple staff members.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRolesSettings;

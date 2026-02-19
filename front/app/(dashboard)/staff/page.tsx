"use client";
import React from "react";
import {
    FiTool,
    FiPlus,
    FiShield,
    FiClock,
    FiCheckCircle,
    FiMoreVertical,
    FiUserCheck,
    FiUserMinus
} from "react-icons/fi";

const StaffPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Staff Management</h1>
                    <p className="text-slate-500 text-sm font-medium">Control roles, permissions, and monitor system activity</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all">
                    <FiPlus className="w-5 h-5" /> Add New Staff
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Staff List */}
                <div className="lg:col-span-2 space-y-4">
                    {[
                        { name: "Sarah Smith", role: "Doctor", status: "Active", email: "sarah@clinic.com" },
                        { name: "John Weaver", role: "Nurse", status: "Active", email: "john@clinic.com" },
                        { name: "Emily Blunt", role: "Receptionist", status: "Away", email: "emily@clinic.com" },
                        { name: "Michael Scott", role: "Admin", status: "Active", email: "michael@clinic.com" }
                    ].map((staff, i) => (
                        <div key={i} className="medical-card p-6 flex items-center justify-between hover:border-primary/40 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                    {staff.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{staff.name}</h3>
                                    <p className="text-xs text-slate-400 font-medium">{staff.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <div className="text-center">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Role</div>
                                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${staff.role === 'Admin' ? 'bg-danger/10 text-danger' : staff.role === 'Doctor' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'
                                        }`}>{staff.role}</span>
                                </div>

                                <div className="text-center hidden md:block">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</div>
                                    <div className="flex items-center gap-1.5 justify-center">
                                        <div className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-accent' : 'bg-warning'}`}></div>
                                        <span className="text-xs font-bold text-slate-600">{staff.status}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="p-2 text-slate-300 hover:text-primary transition-colors"><FiShield className="w-4 h-4" /></button>
                                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><FiMoreVertical className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Activity Logs */}
                <div className="space-y-6">
                    <div className="medical-card p-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                            <FiClock className="text-primary" /> Recent Activity Logs
                        </h3>
                        <div className="space-y-6">
                            {[
                                { user: "Michael S.", action: "Updated security policy", time: "2 mins ago", icon: FiShield, color: "text-danger" },
                                { user: "Emily B.", action: "Confirmed appointment #A943", time: "15 mins ago", icon: FiCheckCircle, color: "text-accent" },
                                { user: "Sarah S.", action: "Signed medical record #R22", time: "1 hour ago", icon: FiUserCheck, color: "text-primary" },
                                { user: "John W.", action: "Deleted draft prescription", time: "3 hours ago", icon: FiUserMinus, color: "text-warning" }
                            ].map((log, i) => (
                                <div key={i} className="flex gap-4 items-start relative group">
                                    {i !== 3 && <div className="absolute left-2.5 top-8 bottom-[-24px] w-px bg-slate-100" />}
                                    <div className={`mt-1 p-1 rounded-md bg-slate-50 ${log.color}`}>
                                        <log.icon className="w-3 h-3" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">
                                            {log.user} <span className="font-medium text-slate-500">{log.action}</span>
                                        </p>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{log.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-2.5 border-2 border-dashed border-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                            View All System Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffPage;

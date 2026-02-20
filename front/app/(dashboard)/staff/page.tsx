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
    FiUserMinus,
    FiMail,
    FiPhone
} from "react-icons/fi";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ── Clinic support staff (non-doctor members only — single-doctor system) ─────
const staffMembers = [
    {
        name: "Sarah Mitchell",
        role: "Head Nurse",
        email: "s.mitchell@clinic.com",
        phone: "+1 555-201-4411",
        status: "Active",
        shift: "Morning",
    },
    {
        name: "John Weaver",
        role: "Receptionist",
        email: "j.weaver@clinic.com",
        phone: "+1 555-201-4412",
        status: "Active",
        shift: "Full-Day",
    },
    {
        name: "Emily Blunt",
        role: "Lab Technician",
        email: "e.blunt@clinic.com",
        phone: "+1 555-201-4413",
        status: "Away",
        shift: "Afternoon",
    },
    {
        name: "Michael Torres",
        role: "Office Admin",
        email: "m.torres@clinic.com",
        phone: "+1 555-201-4414",
        status: "Active",
        shift: "Full-Day",
    },
];

const roleColors: Record<string, string> = {
    "Head Nurse": "bg-sky-50 text-sky-700 border-sky-100",
    Receptionist: "bg-slate-100 text-slate-600 border-slate-200",
    "Lab Technician": "bg-teal-50 text-teal-700 border-teal-100",
    "Office Admin": "bg-indigo-50 text-indigo-700 border-indigo-100",
};

const recentActivity = [
    { user: "Michael T.", action: "Updated clinic profile information", time: "5 mins ago", icon: FiShield, color: "text-indigo-500" },
    { user: "Emily B.", action: "Confirmed appointment #A943 at 10:30 AM", time: "20 mins ago", icon: FiCheckCircle, color: "text-sky-500" },
    { user: "John W.", action: "Registered new patient — Jane Cooper", time: "1 hour ago", icon: FiUserCheck, color: "text-emerald-500" },
    { user: "Sarah M.", action: "Updated post-procedure notes for record #R22", time: "3 hours ago", icon: FiUserMinus, color: "text-amber-500" },
];

const StaffPage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Clinic Staff"
                subtitle="Manage your clinical support team — nurses, reception, and admin."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Staff", href: "/staff" },
                ]}
                action={
                    <Button leftIcon={<FiPlus className="w-4 h-4" />}>
                        Add Staff Member
                    </Button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Staff Cards */}
                <div className="lg:col-span-2 space-y-4">
                    {staffMembers.map((staff, i) => (
                        <Card key={i} className="hover:border-primary/20 transition-colors group">
                            <CardContent className="flex items-center justify-between gap-4">
                                {/* Avatar + Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-primary/10 group-hover:text-primary text-slate-400 font-bold text-lg flex items-center justify-center transition-colors shrink-0">
                                        {staff.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">
                                            {staff.name}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-0.5">
                                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${roleColors[staff.role] ?? "bg-slate-50 text-slate-500 border-slate-100"}`}>
                                                {staff.role}
                                            </span>
                                            <span className="text-xs text-slate-400 hidden sm:inline">{staff.shift} shift</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="hidden md:flex flex-col gap-1 text-xs text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <FiMail className="w-3.5 h-3.5 text-slate-300" />
                                        {staff.email}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FiPhone className="w-3.5 h-3.5 text-slate-300" />
                                        {staff.phone}
                                    </div>
                                </div>

                                {/* Status + Actions */}
                                <div className="flex items-center gap-3 shrink-0">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-2 h-2 rounded-full ${staff.status === "Active" ? "bg-emerald-500" : "bg-amber-400"}`} />
                                        <span className="text-xs font-semibold text-slate-600 hidden sm:inline">{staff.status}</span>
                                    </div>
                                    <button className="p-2 text-slate-300 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Permissions">
                                        <FiShield className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all" title="More options">
                                        <FiMoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Activity Log */}
                <div className="space-y-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <FiClock className="text-primary w-4 h-4" /> Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-5">
                            {recentActivity.map((log, i) => (
                                <div key={i} className="flex gap-3 items-start relative">
                                    {i !== recentActivity.length - 1 && (
                                        <div className="absolute left-3.5 top-7 bottom-[-20px] w-px bg-slate-100" />
                                    )}
                                    <div className={`mt-0.5 p-1.5 rounded-lg bg-slate-50 ${log.color} shrink-0`}>
                                        <log.icon className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">
                                            {log.user}{" "}
                                            <span className="font-medium text-slate-500">{log.action}</span>
                                        </p>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                            {log.time}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full mt-2 py-2.5 border-2 border-dashed border-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                                View Full Log
                            </button>
                        </CardContent>
                    </Card>

                    {/* Team Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <FiTool className="text-primary w-4 h-4" /> Team Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                            {[
                                { label: "Total Staff", value: staffMembers.length.toString() },
                                { label: "Currently Active", value: staffMembers.filter(s => s.status === "Active").length.toString() },
                                { label: "Away / Off-shift", value: staffMembers.filter(s => s.status !== "Active").length.toString() },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">{item.label}</span>
                                    <span className="font-bold text-slate-800">{item.value}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StaffPage;

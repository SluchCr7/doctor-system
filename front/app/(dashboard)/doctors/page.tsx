"use client";
import React from "react";
import Link from "next/link";
import {
    FiMail,
    FiPhone,
    FiStar,
    FiCalendar,
    FiUsers,
    FiAward,
    FiMapPin,
    FiEdit2,
    FiClock,
} from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi2";
import { clinicDoctor, appointments, stats } from "@/data/mockData";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const DoctorProfilePage = () => {
    const recentAppts = appointments.slice(0, 5);

    const weeklySchedule = [
        { day: "Monday", hours: "09:00 AM – 06:00 PM", available: true },
        { day: "Tuesday", hours: "09:00 AM – 06:00 PM", available: true },
        { day: "Wednesday", hours: "09:00 AM – 06:00 PM", available: true },
        { day: "Thursday", hours: "09:00 AM – 06:00 PM", available: true },
        { day: "Friday", hours: "09:00 AM – 06:00 PM", available: true },
        { day: "Saturday", hours: "Closed", available: false },
        { day: "Sunday", hours: "Closed", available: false },
    ];

    return (
        <div className="space-y-7">
            <PageHeader
                title="Doctor Profile"
                subtitle="View and manage the clinic's physician details and schedule."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Doctor Profile", href: "/doctors" },
                ]}
                action={
                    <Link href="/settings/account">
                        <Button leftIcon={<FiEdit2 className="w-4 h-4" />}>Edit Profile</Button>
                    </Link>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-primary via-sky-500 to-teal-500 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),_transparent)]" />
                    </div>
                    <CardContent className="-mt-12 relative pb-6">
                        <div className="mb-4">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg mb-3">
                                <img src={clinicDoctor.image} alt={clinicDoctor.name} className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">{clinicDoctor.name}</h2>
                            <p className="text-sm text-primary font-medium">{clinicDoctor.specialty}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{clinicDoctor.qualifications}</p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-5">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <FiStar
                                        key={s}
                                        className={`w-4 h-4 ${s <= Math.round(clinicDoctor.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-slate-700">{clinicDoctor.rating}</span>
                            <span className="text-xs text-slate-400">({clinicDoctor.reviewCount} reviews)</span>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                                <FiMail className="text-primary mt-0.5 shrink-0 w-4 h-4" />
                                <span className="break-all">{clinicDoctor.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <FiPhone className="text-primary shrink-0 w-4 h-4" />
                                <span>{clinicDoctor.phone}</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                                <FiMapPin className="text-primary mt-0.5 shrink-0 w-4 h-4" />
                                <span>{clinicDoctor.address}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <FiClock className="text-primary shrink-0 w-4 h-4" />
                                <span>{clinicDoctor.clinicHours}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <FiAward className="text-primary shrink-0 w-4 h-4" />
                                <span>License: {clinicDoctor.licenseNumber}</span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                                <p className="text-xl font-black text-slate-800">{clinicDoctor.experience}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                                <p className="text-xl font-black text-slate-800">{stats.totalPatients.toLocaleString()}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Patients</p>
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="mt-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Languages</p>
                            <div className="flex flex-wrap gap-2">
                                {clinicDoctor.languagesSpoken.map(lang => (
                                    <span key={lang} className="text-xs font-medium bg-sky-50 text-sky-700 border border-sky-100 px-2.5 py-1 rounded-full">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Bio */}
                    <Card>
                        <CardHeader><CardTitle>About</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-slate-600 leading-relaxed">{clinicDoctor.bio}</p>
                        </CardContent>
                    </Card>

                    {/* Weekly Schedule */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <FiCalendar className="text-primary w-5 h-5" />
                            <CardTitle>Weekly Availability</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {weeklySchedule.map(({ day, hours, available }) => (
                                    <div
                                        key={day}
                                        className={`flex items-center justify-between p-3 rounded-xl border ${available
                                            ? "bg-emerald-50/60 border-emerald-100"
                                            : "bg-slate-50 border-slate-100 opacity-60"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2.5 h-2.5 rounded-full ${available ? "bg-emerald-500" : "bg-slate-300"}`} />
                                            <span className="text-sm font-semibold text-slate-700">{day}</span>
                                        </div>
                                        <span className={`text-xs font-medium ${available ? "text-emerald-700" : "text-slate-400"}`}>
                                            {hours}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Appointments */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <HiOutlineCalendar className="text-primary w-5 h-5" />
                                <CardTitle>Recent Appointments</CardTitle>
                            </div>
                            <Link href="/appointments">
                                <Button variant="ghost" size="sm" className="text-primary">View All</Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {recentAppts.map((appt) => (
                                    <div key={appt.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm shrink-0">
                                                {appt.patientName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{appt.patientName}</p>
                                                <p className="text-xs text-slate-500">{appt.reason}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-slate-600 font-medium">{appt.date}</p>
                                            <Badge
                                                variant={
                                                    appt.status === "Confirmed" ? "success"
                                                        : appt.status === "Pending" ? "warning"
                                                            : appt.status === "Completed" ? "info"
                                                                : "error"
                                                }
                                            >
                                                {appt.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;

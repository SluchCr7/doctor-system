"use client";
import React from "react";
import {
    HiOutlineClock,
    HiCheckCircle,
    HiXCircle,
    HiOutlinePlus,
    HiChevronLeft,
    HiChevronRight,
    HiOutlineFunnel,
    HiOutlineCalendarDays,
    HiOutlineArrowPath,
} from "react-icons/hi2";
import { appointments } from "@/data/mockData";
import { useModal } from "@/context/ModalContext";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

// ── Status Badge Variant Map ───────────────────────────────────────────────────
const statusVariant: Record<string, "success" | "warning" | "error" | "info"> = {
    Confirmed: "success",
    Pending: "warning",
    Completed: "info",
    Cancelled: "error",
};

// ── Month/Day Extraction ───────────────────────────────────────────────────────
const getDateParts = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
        month: d.toLocaleString("en", { month: "short" }).toUpperCase(),
        day: d.getDate(),
    };
};

const AppointmentsPage = () => {
    const { openModal } = useModal();

    const handleBook = () => {
        openModal("ADD_APPOINTMENT");
    };

    const handleReschedule = (appt: typeof appointments[0]) => {
        openModal("RESCHEDULE_APPOINTMENT", {
            initialData: {
                patientName: appt.patientName,
                date: appt.date,
                time: appt.time.replace(" AM", "").replace(" PM", ""),
                notes: appt.reason,
            },
        });
    };

    const handleConfirm = (appt: typeof appointments[0]) => {
        openModal("DELETE_CONFIRMATION", {
            title: "Confirm Appointment",
            description: `Confirm the appointment for ${appt.patientName} on ${appt.date} at ${appt.time}?`,
            onConfirm: () => console.log("Confirmed:", appt.id),
        });
    };

    const handleCancel = (appt: typeof appointments[0]) => {
        openModal("DELETE_CONFIRMATION", {
            title: "Cancel Appointment",
            description: `Are you sure you want to cancel ${appt.patientName}'s appointment? This will notify the patient.`,
            onConfirm: () => console.log("Cancelled:", appt.id),
        });
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Appointments"
                subtitle="Manage patient bookings and doctor schedules."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Appointments", href: "/appointments" },
                ]}
                action={
                    <Button
                        leftIcon={<HiOutlinePlus className="w-5 h-5" />}
                        onClick={handleBook}
                    >
                        Book Appointment
                    </Button>
                }
            />

            <Tabs defaultValue="list" className="space-y-6">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="list">List View</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                    </TabsList>
                </div>

                {/* ── List View ─────────────────────────────────────────────── */}
                <TabsContent value="list" className="space-y-4">
                    {/* Filters */}
                    <Card>
                        <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="flex gap-4 w-full md:w-auto">
                                <Select
                                    options={[
                                        { label: "All Appointments", value: "all" },
                                        { label: "Confirmed", value: "Confirmed" },
                                        { label: "Pending", value: "Pending" },
                                        { label: "Completed", value: "Completed" },
                                    ]}
                                    className="min-w-[180px]"
                                />
                                <Select
                                    options={[
                                        { label: "All Doctors", value: "all" },
                                        { label: "Dr. Sarah Smith", value: "dr-smith" },
                                        { label: "Dr. James Wilson", value: "dr-wilson" },
                                    ]}
                                    className="min-w-[180px]"
                                />
                            </div>
                            <Button variant="ghost" leftIcon={<HiOutlineFunnel className="w-4 h-4" />}>
                                Clear Filters
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Appointment Cards */}
                    <div className="space-y-4">
                        {appointments.map((appt) => {
                            const { month, day } = getDateParts(appt.date);
                            return (
                                <Card key={appt.id} className="hover:border-primary/20 transition-colors group">
                                    <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        {/* Left: Date + Info */}
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col items-center justify-center w-16 h-16 bg-sky-50 rounded-2xl text-sky-600 border border-sky-100 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shrink-0">
                                                <span className="text-[10px] font-bold uppercase tracking-wider mb-0.5">{month}</span>
                                                <span className="text-xl font-bold">{day}</span>
                                            </div>

                                            <div className="h-10 w-px bg-slate-200 hidden md:block" />

                                            <div>
                                                <div className="flex items-center gap-2 mb-1 text-slate-500 text-sm font-medium">
                                                    <HiOutlineClock className="w-4 h-4 text-primary" />
                                                    {appt.time}
                                                </div>
                                                <h3 className="text-base font-bold text-slate-800">{appt.patientName}</h3>
                                                <p className="text-sm text-slate-500">
                                                    with <span className="font-semibold text-slate-700">{appt.doctorName}</span>
                                                    {" • "}
                                                    {appt.reason}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right: Status + Actions */}
                                        <div className="flex items-center gap-4 justify-between md:justify-end w-full md:w-auto mt-4 md:mt-0">
                                            <Badge variant={statusVariant[appt.status] ?? "info"}>
                                                {appt.status}
                                            </Badge>

                                            <div className="flex items-center gap-1.5">
                                                {/* Reschedule */}
                                                <button
                                                    title="Reschedule"
                                                    onClick={() => handleReschedule(appt)}
                                                    className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-sky-600 hover:border-sky-200 hover:bg-sky-50 transition-all"
                                                >
                                                    <HiOutlineArrowPath className="w-4 h-4" />
                                                </button>
                                                {/* Confirm */}
                                                <button
                                                    title="Confirm Appointment"
                                                    onClick={() => handleConfirm(appt)}
                                                    className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all"
                                                >
                                                    <HiCheckCircle className="w-5 h-5" />
                                                </button>
                                                {/* Cancel */}
                                                <button
                                                    title="Cancel Appointment"
                                                    onClick={() => handleCancel(appt)}
                                                    className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all"
                                                >
                                                    <HiXCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </TabsContent>

                {/* ── Calendar View ──────────────────────────────────────────── */}
                <TabsContent value="calendar">
                    <Card>
                        <CardContent>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="sm"><HiChevronLeft className="w-5 h-5" /></Button>
                                    <h3 className="text-lg font-bold text-slate-800">February 2024</h3>
                                    <Button variant="ghost" size="sm"><HiChevronRight className="w-5 h-5" /></Button>
                                </div>
                                <Button
                                    size="sm"
                                    leftIcon={<HiOutlinePlus className="w-4 h-4" />}
                                    onClick={handleBook}
                                >
                                    New Booking
                                </Button>
                            </div>

                            <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                                    <div key={day} className="bg-slate-50 p-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {day}
                                    </div>
                                ))}
                                {Array.from({ length: 35 }).map((_, i) => {
                                    const day = i - 3;
                                    const isCurrentMonth = day > 0 && day <= 29;
                                    const hasAppt = isCurrentMonth && [15, 20, 21, 24].includes(day);
                                    const isToday = day === 20;

                                    return (
                                        <div
                                            key={i}
                                            className={`min-h-[90px] bg-white p-2 transition-colors hover:bg-slate-50 cursor-pointer ${!isCurrentMonth && "bg-slate-50/50 opacity-50"}`}
                                            onClick={() => isCurrentMonth && handleBook()}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? "bg-primary text-white font-bold" : "text-slate-700"}`}>
                                                    {isCurrentMonth ? day : ""}
                                                </span>
                                            </div>
                                            {hasAppt && (
                                                <div className="mt-1.5 space-y-1">
                                                    <div className="px-1.5 py-0.5 bg-sky-50 border border-sky-100 text-sky-700 text-[10px] font-medium rounded truncate">
                                                        {day === 20 ? "John Doe" : day === 21 ? "Jane S." : day === 15 ? "R. Johnson" : "E. Davis"}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AppointmentsPage;

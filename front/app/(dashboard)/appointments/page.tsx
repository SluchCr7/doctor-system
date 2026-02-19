"use client";
import React, { useState } from "react";
import {
    HiOutlineCalendar,
    HiOutlineClock,
    HiOutlineUser,
    HiCheckCircle,
    HiXCircle,
    HiOutlinePlus,
    HiChevronLeft,
    HiChevronRight,
    HiOutlineFunnel
} from "react-icons/hi2";
import { appointments } from "@/data/mockData";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Modal } from "@/components/ui/Modal";

const AppointmentsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <Button leftIcon={<HiOutlinePlus className="w-5 h-5" />} onClick={() => setIsModalOpen(true)}>
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

                <TabsContent value="list" className="space-y-4">
                    {/* Filters */}
                    <Card>
                        <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="flex gap-4 w-full md:w-auto">
                                <Select
                                    options={[
                                        { label: "All Appointments", value: "all" },
                                        { label: "Confirmed", value: "confirmed" },
                                        { label: "Pending", value: "pending" }
                                    ]}
                                    className="min-w-[180px]"
                                />
                                <Select
                                    options={[
                                        { label: "All Doctors", value: "all" },
                                        { label: "Dr. Sarah Smith", value: "sarah" }
                                    ]}
                                    className="min-w-[180px]"
                                />
                            </div>
                            <Button variant="ghost" leftIcon={<HiOutlineFunnel className="w-4 h-4" />}>
                                Clear Filters
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Appointment List */}
                    <div className="space-y-4">
                        {appointments.map((appt) => (
                            <Card key={appt.id} className="hover:border-indigo-200 transition-colors group">
                                <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                            <span className="text-[10px] font-bold uppercase tracking-wider mb-0.5">Feb</span>
                                            <span className="text-xl font-bold">20</span>
                                        </div>

                                        <div className="h-10 w-px bg-slate-200 hidden md:block" />

                                        <div>
                                            <div className="flex items-center gap-2 mb-1 text-slate-500 text-sm font-medium">
                                                <HiOutlineClock className="w-4 h-4 text-indigo-500" />
                                                {appt.time}
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800">{appt.patientName}</h3>
                                            <p className="text-sm text-slate-500">with <span className="font-semibold text-slate-700">{appt.doctorName}</span> • {appt.reason}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 justify-between md:justify-end w-full md:w-auto mt-4 md:mt-0">
                                        <Badge variant={
                                            appt.status === "Confirmed" ? "success" :
                                                appt.status === "Pending" ? "warning" : "error"
                                        }>
                                            {appt.status}
                                        </Badge>

                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" className="w-9 h-9 p-0 text-slate-400 hover:text-emerald-600 hover:border-emerald-200">
                                                <HiCheckCircle className="w-5 h-5" />
                                            </Button>
                                            <Button variant="outline" size="sm" className="w-9 h-9 p-0 text-slate-400 hover:text-rose-600 hover:border-rose-200">
                                                <HiXCircle className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="calendar">
                    <Card>
                        <CardContent>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="sm"><HiChevronLeft className="w-5 h-5" /></Button>
                                    <h3 className="text-lg font-bold text-slate-800">February 2024</h3>
                                    <Button variant="ghost" size="sm"><HiChevronRight className="w-5 h-5" /></Button>
                                </div>
                                <div className="flex bg-slate-100 rounded-lg p-1">
                                    {["Day", "Week", "Month"].map(t => (
                                        <button key={t} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${t === "Month" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-900"}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
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

                                    return (
                                        <div key={i} className={`min-h-[100px] bg-white p-2 transition-colors hover:bg-slate-50 ${!isCurrentMonth && "bg-slate-50/50"}`}>
                                            <div className="flex justify-between items-start">
                                                <span className={`text-xs font-medium ${day === 20 ? "bg-indigo-600 text-white w-6 h-6 flex items-center justify-center rounded-full" : "text-slate-700"}`}>
                                                    {isCurrentMonth ? day : ""}
                                                </span>
                                            </div>
                                            {hasAppt && (
                                                <div className="mt-2 space-y-1">
                                                    <div className="px-1.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-medium rounded truncate">
                                                        Sarah Wilson
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

            {/* Book Appointment Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Book New Appointment"
                description="Fill in the details below to schedule a new patient appointment."
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsModalOpen(false)}>Confirm Booking</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <Select
                        label="Patient"
                        required
                        options={[
                            { label: "Sarah Wilson (ID: P-1024)", value: "sarah" },
                            { label: "James Robertson (ID: P-1025)", value: "james" }
                        ]}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="date" label="Date" required />
                        <Input type="time" label="Time" required />
                    </div>
                    <Select
                        label="Doctor"
                        required
                        options={[
                            { label: "Dr. Alexander", value: "alex" },
                            { label: "Dr. Micheal", value: "mike" }
                        ]}
                    />
                    <Select
                        label="Appointment Type"
                        required
                        options={[
                            { label: "Check-up", value: "checkup" },
                            { label: "Consultation", value: "consult" },
                            { label: "Emergency", value: "emergency" }
                        ]}
                    />
                    <Input label="Notes" placeholder="Additional details..." />
                </div>
            </Modal>
        </div>
    );
};

export default AppointmentsPage;

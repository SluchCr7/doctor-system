"use client";
import React from "react";
import { HiOutlineUsers, HiOutlineCalendar, HiOutlineCurrencyDollar, HiOutlineArrowTrendingUp, HiOutlineClock, HiOutlinePlus, HiOutlineArrowRight, HiOutlineCheckCircle } from "react-icons/hi2";
import { FiActivity } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/PageHeader";
import { clinicDoctor, appointments, stats, patients } from "@/data/mockData";
import Link from "next/link";

const statusVariant: Record<string, "success" | "warning" | "error" | "info"> = {
  Confirmed: "success",
  Pending: "warning",
  Completed: "info",
  Cancelled: "error",
};

export default function Dashboard() {
  const dashboardStats = [
    {
      title: "Total Patients",
      value: stats.totalPatients.toLocaleString(),
      change: "+12%",
      icon: <HiOutlineUsers className="w-5 h-5 text-indigo-600" />,
      color: "bg-indigo-50",
      href: "/patients",
    },
    {
      title: "Today's Appointments",
      value: String(stats.todayAppointments),
      change: "+2 from yesterday",
      icon: <HiOutlineCalendar className="w-5 h-5 text-sky-600" />,
      color: "bg-sky-50",
      href: "/appointments",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      change: "+8% this month",
      icon: <HiOutlineCurrencyDollar className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-50",
      href: "/billing",
    },
    {
      title: "Pending Payments",
      value: `$${stats.pendingPayments.toLocaleString()}`,
      change: "4 invoices",
      icon: <HiOutlineArrowTrendingUp className="w-5 h-5 text-amber-600" />,
      color: "bg-amber-50",
      href: "/billing",
    },
  ];

  const todayAppts = appointments.slice(0, 4);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Dashboard Overview"
        subtitle={`Welcome back, ${clinicDoctor.name}. Here's what's happening today.`}
        action={
          <div className="flex gap-3">
            <Button variant="outline" size="sm" leftIcon={<HiOutlineClock className="w-4 h-4" />}>
              Last 30 Days
            </Button>
            <Link href="/appointments">
              <Button size="sm" leftIcon={<HiOutlinePlus className="w-4 h-4" />}>
                New Appointment
              </Button>
            </Link>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {dashboardStats.map((stat, index) => (
          <Link href={stat.href} key={index}>
            <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
              <CardContent className="flex items-start justify-between p-5">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors">{stat.value}</h3>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                    {stat.change}
                  </span>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} shrink-0`}>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctor Profile Card */}
        <Card className="overflow-hidden">
          <div className="h-28 bg-gradient-to-br from-primary to-sky-600 relative">
            <FiActivity className="absolute right-4 bottom-2 w-24 h-24 text-white/10" />
          </div>
          <CardContent className="-mt-10 relative pb-6">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-lg shrink-0">
                <img src={clinicDoctor.image} alt={clinicDoctor.name} className="w-full h-full object-cover" />
              </div>
              <div className="pb-1">
                <h3 className="text-base font-bold text-slate-800">{clinicDoctor.name}</h3>
                <p className="text-xs text-slate-500">{clinicDoctor.qualifications}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Specialty</span>
                <span className="font-semibold text-slate-700 text-right text-xs max-w-[150px]">{clinicDoctor.specialty}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Experience</span>
                <span className="font-semibold text-slate-700">{clinicDoctor.experience}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Clinic Hours</span>
                <span className="font-semibold text-slate-700 text-xs">{clinicDoctor.clinicHours}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Rating</span>
                <span className="font-bold text-amber-500">★ {clinicDoctor.rating}/5</span>
              </div>
            </div>
            <Link href="/settings/account">
              <Button variant="outline" size="sm" className="w-full mt-4">
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Today's Schedule</CardTitle>
            <Link href="/appointments">
              <Button variant="ghost" size="sm" className="text-primary gap-1">
                View All <HiOutlineArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {todayAppts.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <HiOutlineCalendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p>No appointments scheduled today.</p>
                </div>
              ) : (
                todayAppts.map((apt) => (
                  <div key={apt.id} className="px-5 py-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm shrink-0">
                        {apt.patientName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors">
                          {apt.patientName}
                        </p>
                        <p className="text-xs text-slate-500">{apt.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-600 hidden sm:inline">{apt.time}</span>
                      <Badge variant={statusVariant[apt.status] ?? "info"}>{apt.status}</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-base font-semibold text-slate-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              href: "/patients",
              color: "blue",
              icon: <HiOutlineUsers className="w-6 h-6" />,
              title: "Add New Patient",
              desc: "Register a patient record",
            },
            {
              href: "/appointments",
              color: "purple",
              icon: <HiOutlineCalendar className="w-6 h-6" />,
              title: "Book Appointment",
              desc: "Schedule a new appointment",
            },
            {
              href: "/billing",
              color: "teal",
              icon: <HiOutlineCurrencyDollar className="w-6 h-6" />,
              title: "Create Invoice",
              desc: "Generate a billing invoice",
            },
            {
              href: "/medical-records",
              color: "rose",
              icon: <HiOutlineCheckCircle className="w-6 h-6" />,
              title: "Add Record",
              desc: "Create a medical record",
            },
          ].map((action) => (
            <Link key={action.href} href={action.href}>
              <div className={`p-5 bg-${action.color}-50/60 rounded-2xl border border-${action.color}-100 hover:border-${action.color}-200 hover:shadow-sm transition-all cursor-pointer group`}>
                <div className={`w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-${action.color}-600 mb-3.5 group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h4 className="font-semibold text-slate-800 text-sm mb-0.5">{action.title}</h4>
                <p className="text-xs text-slate-500">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Patients */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Recent Patients</CardTitle>
          <Link href="/patients">
            <Button variant="ghost" size="sm" className="text-primary gap-1">
              View All <HiOutlineArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {patients.slice(0, 5).map((patient) => (
              <Link key={patient.id} href={`/patients/${patient.id}`}>
                <div className="px-5 py-3.5 hover:bg-slate-50 transition-colors flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors truncate">{patient.name}</p>
                    <p className="text-xs text-slate-500">{patient.age} yrs • {patient.gender} • {patient.bloodGroup}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge variant={patient.status === "Regular" ? "info" : patient.status === "New" ? "success" : "error"}>
                      {patient.status}
                    </Badge>
                    <p className="text-[10px] text-slate-400 mt-1">Last: {patient.lastVisit}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

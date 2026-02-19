"use client";
import React from "react";
import { HiOutlineUsers, HiOutlineCalendar, HiOutlineCurrencyDollar, HiOutlineArrowTrendingUp, HiOutlineClock } from "react-icons/hi2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/PageHeader";

export default function Dashboard() {
  const stats = [
    { title: "Total Patients", value: "1,240", change: "+12%", icon: <HiOutlineUsers className="w-6 h-6 text-indigo-600" />, color: "bg-indigo-50" },
    { title: "Appointments", value: "86", change: "+4%", icon: <HiOutlineCalendar className="w-6 h-6 text-green-600" />, color: "bg-green-50" },
    { title: "Revenue", value: "$12,450", change: "+8%", icon: <HiOutlineCurrencyDollar className="w-6 h-6 text-amber-600" />, color: "bg-amber-50" },
    { title: "Growth", value: "24%", change: "+2%", icon: <HiOutlineArrowTrendingUp className="w-6 h-6 text-rose-600" />, color: "bg-rose-50" },
  ];

  const upcomingAppointments = [
    { id: 1, patient: "Sarah Wilson", time: "09:00 AM", type: "Check-up", status: "confirmed", doctor: "Dr. Alexander" },
    { id: 2, patient: "James Robertson", time: "10:30 AM", type: "Consultation", status: "pending", doctor: "Dr. Micheal" },
    { id: 3, patient: "Emily Clark", time: "11:15 AM", type: "Follow-up", status: "cancelled", doctor: "Dr. Sarah" },
    { id: 4, patient: "Michael Brown", time: "02:00 PM", type: "Emergency", status: "confirmed", doctor: "Dr. Alexander" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome back, Dr. Alexander. Here's what's happening today."
        action={
          <div className="flex gap-3">
            <Button variant="outline" size="sm" leftIcon={<HiOutlineClock className="w-4 h-4" />}>
              Last 30 Days
            </Button>
            <Button size="sm" leftIcon={<HiOutlineCalendar className="w-4 h-4" />}>
              New Appointment
            </Button>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-start justify-between p-6">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                  {stat.change} from last month
                </span>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section (Placeholder) */}
        <Card className="lg:col-span-2 min-h-[400px]">
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400">
              <span className="flex items-center gap-2">
                <HiOutlineArrowTrendingUp className="w-5 h-5" />
                Chart Visualization Component
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Appointments</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {apt.patient.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors">{apt.patient}</p>
                      <p className="text-xs text-slate-500">{apt.type} • {apt.doctor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">{apt.time}</p>
                    <Badge variant={
                      apt.status === 'confirmed' ? 'success' :
                        apt.status === 'pending' ? 'warning' : 'error'
                    }>
                      {apt.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <h3 className="text-lg font-semibold text-slate-800 mt-8 mb-4">Quick Access</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-50/50 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors cursor-pointer group">
          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <HiOutlineUsers className="w-6 h-6" />
          </div>
          <h4 className="font-semibold text-slate-800 mb-1">Add New Patient</h4>
          <p className="text-sm text-slate-500">Register a new patient to the system</p>
        </div>

        <div className="p-6 bg-purple-50/50 rounded-xl border border-purple-100 hover:border-purple-200 transition-colors cursor-pointer group">
          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
            <HiOutlineCalendar className="w-6 h-6" />
          </div>
          <h4 className="font-semibold text-slate-800 mb-1">Schedule Appointment</h4>
          <p className="text-sm text-slate-500">Book a new appointment slot</p>
        </div>

        <div className="p-6 bg-teal-50/50 rounded-xl border border-teal-100 hover:border-teal-200 transition-colors cursor-pointer group">
          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform">
            <HiOutlineCurrencyDollar className="w-6 h-6" />
          </div>
          <h4 className="font-semibold text-slate-800 mb-1">Create Invoice</h4>
          <p className="text-sm text-slate-500">Generate a new invoice for billing</p>
        </div>
      </div>
    </div>
  );
}

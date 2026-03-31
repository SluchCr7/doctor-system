'use client';

import React, { useEffect, useState } from 'react';
import api from '@/context/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { HiOutlineUsers, HiOutlineCalendar, HiOutlinePlus, HiOutlineMagnifyingGlass, HiOutlineArrowRight } from 'react-icons/hi2';
import { FiActivity } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function DoctorDashboard({ user }: { user: any }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/doctor/dashboard');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load doctor dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="animate-pulse space-y-6">
    <div className="h-40 bg-slate-200 rounded-3xl" />
    <div className="grid grid-cols-4 gap-4">
      {[1,2,3,4].map(i => <div key={i} className="h-28 bg-slate-200 rounded-2xl" />)}
    </div>
  </div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 leading-tight">Doctor Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your clinic and patients seamlessly.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/appointments">
            <Button size="lg" className="rounded-2xl shadow-lg shadow-primary/20" leftIcon={<HiOutlinePlus />}>
              Add Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-xl shadow-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                <HiOutlineUsers size={24} />
              </div>
              <Badge className="bg-white/20 text-white border-0">+14%</Badge>
            </div>
            <p className="text-indigo-100 font-medium">Total Managed Patients</p>
            <h3 className="text-4xl font-bold mt-2">{stats?.totalPatients || 0}</h3>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-0 shadow-xl shadow-sky-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                <HiOutlineCalendar size={24} />
              </div>
              <Badge className="bg-white/20 text-white border-0">Today</Badge>
            </div>
            <p className="text-sky-100 font-medium">Appointments Today</p>
            <h3 className="text-4xl font-bold mt-2">{stats?.todayAppointments?.length || 0}</h3>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl shadow-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                <FiActivity size={24} />
              </div>
              <Badge className="bg-white/20 text-white border-0">Global</Badge>
            </div>
            <p className="text-emerald-100 font-medium">Total Upcoming</p>
            <h3 className="text-4xl font-bold mt-2">{stats?.upcomingAppointments || 0}</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="overflow-hidden border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="h-32 bg-slate-900 relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>
          <CardContent className="-mt-12 relative flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl bg-white p-1 border-4 border-slate-50 shadow-xl mb-4 transform group-hover:scale-105 transition-all">
              <div className="w-full h-full rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
            <p className="text-primary font-bold text-sm tracking-wide uppercase mt-1">{user.profileData?.specialization || 'General Practitioner'}</p>
            <div className="w-full mt-6 space-y-3">
              <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Experience</span>
                <span className="text-slate-800 font-bold">12+ Years</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Total Cured</span>
                <span className="text-slate-800 font-bold">1,400+</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* List of today's appointments fetched from real DB */}
        <Card className="lg:col-span-2 border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 mx-6 px-0 py-5">
            <CardTitle className="text-lg">Today's List</CardTitle>
            <Link href="/appointments">
              <Button variant="ghost" className="text-primary font-bold text-sm">View Calendar <HiOutlineArrowRight size={16} /></Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {stats?.todayAppointments?.length > 0 ? (
                stats.todayAppointments.map((app: any) => (
                  <div key={app._id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        {app.patientId.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{app.patientId.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • General Checkup</p>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-0 rounded-lg px-3 py-1 font-bold">{app.status}</Badge>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center space-y-3">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <HiOutlineCalendar size={32} />
                  </div>
                  <p className="text-slate-400 font-medium">No sessions scheduled for today</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import api from '@/context/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { HiOutlineUsers, HiOutlineCalendar, HiOutlinePlus, HiOutlineMagnifyingGlass, HiOutlineArrowRight } from 'react-icons/hi2';
import { FiActivity } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';

export default function DoctorDashboard({ user }: { user: any }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

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
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-2xl border-2 border-slate-200"
            onClick={() => openModal('ADD_PATIENT')}
          >
            New Patient
          </Button>
          <Button 
            size="lg" 
            className="rounded-2xl shadow-lg shadow-primary/20" 
            leftIcon={<HiOutlinePlus />}
            onClick={() => openModal('ADD_APPOINTMENT')}
          >
            Add Appointment
          </Button>
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

        {/* Patients List Section */}
        <Card className="lg:col-span-3 border-slate-100 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 mx-6 px-0 py-5">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">My Patients</CardTitle>
              <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Active Directory</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl border-slate-200 text-slate-600 font-bold"
              onClick={() => openModal('ADD_PATIENT')}
            >
              <HiOutlinePlus size={16} className="mr-2" /> Register New
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Contact</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Added Date</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {stats?.patients?.length > 0 ? (
                    stats.patients.map((patient: any) => (
                      <tr key={patient._id} className="group hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary font-black shadow-sm group-hover:scale-110 transition-transform">
                              {patient.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{patient.name}</p>
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{patient.profileData?.gender || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-700">{patient.email}</p>
                          <p className="text-xs text-slate-400 font-medium">{patient.profileData?.phone || 'No phone'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="neutral" className="bg-slate-100 text-slate-500 font-bold rounded-lg border-0">
                            {new Date(patient.createdAt).toLocaleDateString()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-xl text-primary font-bold h-10 px-4"
                              onClick={() => openModal('EDIT_PATIENT', patient)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-xl text-red-500 hover:bg-red-50 font-bold h-10 px-4"
                              onClick={() => {
                                openModal('DELETE_CONFIRMATION', {
                                  title: `Remove ${patient.name}?`,
                                  description: 'This will permanently remove the patient from your directory and cancel all upcoming sessions. This action cannot be revoked.',
                                  onConfirm: async () => {
                                    try {
                                      await api.delete(`/admin/users/${patient._id}`);
                                      // Refresh dashboard stats
                                      const res = await api.get('/doctor/dashboard');
                                      if (res.data.success) setStats(res.data.data);
                                    } catch (err) {
                                      console.error('Failed to remove patient');
                                    }
                                  }
                                });
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center text-slate-400 font-medium italic bg-slate-50/20">
                        No managed patients found in your records.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

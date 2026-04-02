'use client';

import React, { useEffect, useState } from 'react';
import api from '@/context/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  HiOutlineUsers, HiOutlineCalendar, HiOutlinePlus, HiOutlineMagnifyingGlass, 
  HiOutlineArrowRight, HiOutlineCurrencyDollar, HiOutlineCheck, HiOutlineXMark,
  HiOutlineClock, HiOutlineDocumentText
} from 'react-icons/hi2';
import { FiActivity, FiTrendingUp, FiShoppingBag, FiLayers, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import toast from 'react-hot-toast';

export default function DoctorDashboard({ user }: { user: any }) {
  const [data, setData] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  const fetchDashboard = async () => {
    try {
      const [dashRes, patientsRes] = await Promise.all([
        api.get('/doctor/dashboard'),
        api.get('/doctor/patients')
      ]);
      
      if (dashRes.data.success) {
        setData(dashRes.data.data);
      }
      if (patientsRes.data.success) {
        setPatients(patientsRes.data.data);
      }
    } catch (err) {
      console.error('Failed to load doctor dashboard');
      toast.error('Failed to fetch real-time data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAction = async (id: string, action: 'accept' | 'reject') => {
    try {
      const res = await api.patch(`/appointments/${id}/${action}`);
      if (res.data.success) {
        toast.success(`Appointment ${action === 'accept' ? 'accepted' : 'rejected'}`);
        // Refresh data
        fetchDashboard();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || `Failed to ${action} appointment`);
    }
  };

  if (loading) return (
    <div className="space-y-8 animate-pulse p-8">
      <div className="h-10 w-64 bg-background-subtle rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-background-subtle rounded-3xl" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-[500px] bg-background-subtle rounded-3xl" />
        <div className="h-[500px] bg-background-subtle rounded-3xl" />
      </div>
    </div>
  );

  const statsList = [
    { label: 'Confirmed Patients', value: data?.stats?.totalPatients || 0, icon: HiOutlineUsers, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20', trend: '+12% this month' },
    { label: 'Today\'s Agenda', value: data?.stats?.todayCount || 0, icon: HiOutlineCalendar, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-900/20', badge: 'Active' },
    { label: 'Pending Requests', value: data?.stats?.pendingRequests || 0, icon: HiOutlineClock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', badge: 'Urgent' },
    { label: 'Total Sessions', value: data?.stats?.totalAppointments || 0, icon: FiActivity, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', trend: 'Lifetime' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black text-text-primary tracking-tight italic">
            Clinical <span className="text-primary not-italic">Pulse</span>
          </h1>
          <p className="text-text-secondary mt-1 font-bold italic uppercase tracking-widest text-[10px]">
            Physician Command Center — Dr. {user.name.split(' ').pop()}
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="rounded-2xl border-2 border-border font-black h-12 px-6"
            onClick={() => openModal('ADD_PATIENT')}
          >
            New Patient
          </Button>
          <Button 
            className="rounded-2xl shadow-xl shadow-primary/20 font-black h-12 px-6" 
            leftIcon={<HiOutlinePlus strokeWidth={2.5}/>}
            onClick={() => openModal('ADD_APPOINTMENT')}
          >
            Create Slot
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((stat, i) => (
          <Card key={i} className="bg-surface border-border-subtle shadow-premium hover:shadow-2xl transition-all group overflow-hidden border-0">
            <CardContent className="p-6 relative">
              <div className={`absolute -right-4 -top-4 w-20 h-20 ${stat.bg}/30 rounded-full blur-2xl group-hover:${stat.bg} transition-colors`} />
              <div className="flex items-center justify-between mb-4 relative">
                <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                  <stat.icon size={22} />
                </div>
                {stat.label === "Today's Agenda" ? (
                   <button 
                    onClick={() => openModal('BLOCK_TIME')}
                    className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                   >
                     Manage
                   </button>
                ) : stat.label === "Total Sessions" ? (
                   <button 
                    onClick={() => openModal('GENERATE_REPORT')}
                    className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors"
                   >
                     Export
                   </button>
                ) : stat.badge && (
                  <Badge variant="info" className={`${stat.bg} ${stat.color} border-0 text-[10px] font-black uppercase tracking-tighter px-2`}>
                    {stat.badge}
                  </Badge>
                )}
              </div>
              <p className="text-text-tertiary text-[10px] font-black uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-text-primary">{stat.value}</h3>
              {stat.trend && <p className="text-[10px] text-text-tertiary font-bold mt-2">{stat.trend}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Appointments List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-primary rounded-full" />
              <h2 className="text-xl font-black text-text-primary">In-Office Today</h2>
            </div>
            <Link href="/appointments" className="text-xs font-black text-primary hover:underline uppercase tracking-widest">
              View All Schedule
            </Link>
          </div>

          <div className="space-y-4">
            {data?.todayAppointments?.length > 0 ? (
              data.todayAppointments.map((app: any) => (
                <div key={app._id} className="group bg-surface rounded-3xl border border-border-subtle p-5 flex items-center gap-6 shadow-sm hover:shadow-xl hover:border-primary/10 transition-all duration-300">
                  <div className="flex flex-col items-center justify-center bg-background-subtle rounded-2xl p-3 w-20 shrink-0 border border-border-subtle group-hover:bg-primary/5 transition-colors">
                    <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">{new Date(app.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="text-xl font-black text-text-primary">{new Date(app.date).toLocaleDateString('en-US', { day: '2-digit' })}</span>
                    <span className="text-[10px] font-black text-primary italic uppercase">{new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-black text-text-primary truncate">{app.patientId?.name || 'Walk-in Patient'}</h4>
                      <Badge className={`border-0 text-[10px] font-black uppercase ${
                        app.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                        app.status === 'pending' ? 'bg-amber-50 text-amber-600 animate-pulse dark:bg-amber-900/20 dark:text-amber-400' :
                        'bg-background-subtle text-text-tertiary'
                      }`}>
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-text-tertiary font-bold italic truncate max-w-sm">
                      {app.notes || 'Routine check-up and clinical consultation'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {app.status === 'pending' ? (
                      <>
                        <button 
                          onClick={() => handleAction(app._id, 'accept')}
                          className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-md shadow-emerald-200/50"
                        >
                          <HiOutlineCheck size={20} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => handleAction(app._id, 'reject')}
                          className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-md shadow-rose-200/50"
                        >
                          <HiOutlineXMark size={20} strokeWidth={3} />
                        </button>
                      </>
                    ) : (
                      <Link href={`/patients/${app.patientId?._id}`}>
                        <Button variant="ghost" size="sm" className="rounded-xl font-black text-[10px] text-primary bg-primary/5 uppercase tracking-widest hover:bg-primary hover:text-white">
                          Open Profile
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-background-subtle rounded-[2rem] p-16 text-center border border-dashed border-border">
                <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-4 text-text-tertiary shadow-sm">
                  <HiOutlineCalendar size={28} />
                </div>
                <h3 className="text-text-primary font-black italic">No Rounds Today</h3>
                <p className="text-text-tertiary text-xs font-bold mt-1 uppercase tracking-widest leading-loose">
                  Your schedule is clear for the day. <br /> Use the time to review patient histories.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Patients Quick List / Directory Overlay */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-500 rounded-full" />
              <h2 className="text-xl font-black text-text-primary">Patients</h2>
            </div>
          </div>

          <div className="bg-surface rounded-[2rem] border border-border-subtle shadow-premium overflow-hidden sticky top-8">
            <div className="p-6 border-b border-border-subtle bg-background-subtle/30">
              <div className="relative">
                <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input 
                  placeholder="Search directory..."
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-xl text-xs font-bold text-text-primary outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="divide-y divide-border-subtle h-[450px] overflow-y-auto">
              {patients.length > 0 ? (
                patients.map((patient: any) => (
                  <div key={patient._id} className="p-4 hover:bg-background-subtle transition-all flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black shadow-sm overflow-hidden">
                          {patient.profileImage ? (
                            <img src={patient.profileImage} alt={patient.name} className="w-full h-full object-cover" />
                          ) : patient.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-surface rounded-full" title="Active" />
                      </div>
                      <div className="min-w-0 max-w-[120px]">
                        <p className="text-sm font-black text-text-primary truncate">{patient.name}</p>
                        <p className="text-[10px] text-text-tertiary font-bold uppercase tracking-tighter">
                          Last visit: {new Date(patient.lastAppointment).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <Link href={`/patients/${patient._id}`}>
                      <button className="w-8 h-8 rounded-lg bg-background-subtle text-text-tertiary flex items-center justify-center hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100">
                        <HiOutlineArrowRight size={14} />
                      </button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <p className="text-text-tertiary text-xs font-bold italic uppercase tracking-widest leading-loose">
                    No active patients <br/> found in records
                  </p>
                </div>
              )}
            </div>

            <Link href="/patients" className="block p-4 text-center bg-background-subtle border-t border-border-subtle text-[10px] font-black text-text-tertiary hover:text-primary uppercase tracking-widest transition-colors">
              Full Patient Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

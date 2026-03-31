'use client';

import React, { useEffect, useState } from 'react';
import api from '@/context/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { HiOutlineCalendar, HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineArrowRight } from 'react-icons/hi2';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';
import toast from 'react-hot-toast';

export default function PatientDashboard({ user }: { user: any }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await api.get('/patient/dashboard');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load patient dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleCancelAppointment = (id: string) => {
    openModal('DELETE_CONFIRMATION', {
      title: 'Cancel Appointment',
      description: 'Are you sure you want to cancel this appointment session? This action cannot be reversed.',
      onConfirm: async () => {
        try {
          await api.delete(`/appointments/${id}`);
          toast.success('Appointment cancelled successfully');
          // Refresh data
          const res = await api.get('/patient/dashboard');
          if (res.data.success) setData(res.data.data);
        } catch (err) {
          toast.error('Failed to cancel appointment');
        }
      }
    });
  };

  if (loading) return <div className="space-y-6 animate-pulse">
    <div className="h-40 bg-slate-200 rounded-3xl" />
    <div className="grid grid-cols-2 gap-4">
      <div className="h-64 bg-slate-200 rounded-2xl" />
      <div className="h-64 bg-slate-200 rounded-2xl" />
    </div>
  </div>;

  return (
    <div className="space-y-8">
      {/* Hero Welcome */}
      <div className="bg-gradient-to-r from-primary to-sky-600 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <HiOutlineCalendar size={180} />
        </div>
        <div className="relative z-10 max-w-lg">
          <Badge className="bg-white/20 text-white border-0 mb-4 px-3 py-1 font-bold">Patient Portal</Badge>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Hello, {user.name.split(' ')[0]}!</h1>
          <p className="mt-4 text-sky-50/80 text-lg font-medium leading-relaxed">Your health is our priority. You have <span className="text-white font-bold underline decoration-sky-300 underline-offset-4">{data?.upcoming?.length || 0} upcoming sessions</span> this week.</p>
          <Link href="/appointments">
            <Button size="lg" className="mt-8 bg-white text-primary hover:bg-sky-50 font-bold px-8 rounded-2xl shadow-lg border-0">
              Schedule New Visit
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Next Visit Card */}
        <Card className="border-0 shadow-xl shadow-slate-100 rounded-3xl group overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between mx-6 px-0 py-6 border-b border-slate-50">
            <CardTitle className="text-xl font-bold text-slate-800">Your Next Visit</CardTitle>
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <HiOutlineCalendar size={20} />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {data?.upcoming?.length > 0 ? (
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100 shadow-sm shrink-0">
                  <span className="text-primary font-bold text-xl">{new Date(data.upcoming[0].date).getDate()}</span>
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">{new Date(data.upcoming[0].date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-xl font-bold text-slate-900">{data.upcoming[0].doctorId.name}</h4>
                  <p className="text-primary font-bold text-sm mt-1">{data.upcoming[0].doctorId.profileData.specialization}</p>
                  <p className="text-slate-500 text-sm mt-2 flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Confirmed for {new Date(data.upcoming[0].date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Button 
                    className="rounded-2xl font-bold px-6"
                    onClick={() => openModal('RESCHEDULE_APPOINTMENT', { 
                      initialData: data.upcoming[0],
                      onSuccess: () => {
                        api.get('/patient/dashboard').then(res => setData(res.data.data));
                      }
                    })}
                  >
                    Reschedule
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-red-500 hover:bg-red-50 rounded-2xl font-bold"
                    onClick={() => handleCancelAppointment(data.upcoming[0]._id)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-[2rem]">
                <p className="text-slate-400 font-medium italic">No upcoming sessions found</p>
                <Link href="/appointments">
                  <Button variant="ghost" className="mt-4 text-primary font-bold">Book your first session <HiOutlineArrowRight size={16} /></Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Summary Card */}
        <Card className="border-0 shadow-xl shadow-slate-100 rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between mx-6 px-0 py-6 border-b border-slate-50">
            <CardTitle className="text-xl font-bold text-slate-800">History Log</CardTitle>
            <Link href="/appointments">
              <Button variant="ghost" className="text-primary font-bold px-0">Full Report</Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {data?.past?.slice(0, 3).map((apt: any) => (
                <div key={apt._id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {apt.doctorId.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{apt.doctorId.name}</p>
                      <p className="text-xs text-slate-400 font-bold tracking-wide uppercase">{new Date(apt.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Badge className="bg-slate-100 text-slate-600 border-0 rounded-lg font-bold">Completed</Badge>
                </div>
              ))}
              {(!data?.past || data.past.length === 0) && (
                <div className="p-16 text-center text-slate-400 italic font-medium">
                  Your visit history will appear here
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

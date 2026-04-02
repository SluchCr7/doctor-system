'use client';

import React, { useEffect, useState } from 'react';
import api from '@/context/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { HiOutlineCalendar, HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineArrowRight, HiOutlineCurrencyDollar, HiOutlineDocumentText } from 'react-icons/hi2';
import { FiActivity, FiHeart, FiCreditCard } from 'react-icons/fi';
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
        const [dashRes, medRes, finRes] = await Promise.all([
          api.get('/patient/dashboard'),
          api.get('/api/medical').catch(() => ({ data: { data: [] } })),
          api.get('/api/financial/invoices').catch(() => ({ data: { data: [] } }))
        ]);

        if (dashRes.data.success) {
          setData({
            ...dashRes.data.data,
            medicalRecords: medRes.data.data,
            invoices: finRes.data.data
          });
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

  if (loading) return <div className="space-y-6 animate-pulse p-8">
    <div className="h-64 bg-slate-200 rounded-[2rem]" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="h-64 bg-slate-200 rounded-3xl" />
      <div className="h-64 bg-slate-200 rounded-3xl" />
    </div>
  </div>;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-premium">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <HiOutlineCalendar size={180} />
        </div>
        <div className="relative z-10 max-w-lg">
          <Badge className="bg-white/20 text-white border-0 mb-4 px-3 py-1 font-bold">Patient Portal</Badge>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">Hello, {user.name.split(' ')[0]}!</h1>
          <p className="mt-4 text-sky-50/80 text-lg font-medium leading-relaxed">Your health is our priority. You have <span className="text-white font-bold underline decoration-sky-300 underline-offset-4">{data?.upcoming?.length || 0} upcoming sessions</span> this week.</p>
          <Link href="/appointments">
            <Button size="lg" variant='secondary' className="mt-8 font-black px-8 rounded-2xl shadow-lg border-0 hover:bg-slate-50">
              Schedule New Visit
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next Visit Card */}
        <Card className="lg:col-span-2 border-0 shadow-card hover:shadow-card-hover transition-all rounded-[2rem] group overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between mx-6 px-0 py-6 border-b border-slate-50">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">Your Next Visit</CardTitle>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Confirmed Appointment</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <HiOutlineCalendar size={24} />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {data?.upcoming?.length > 0 ? (
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-3xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100 shadow-sm shrink-0">
                  <span className="text-primary font-black text-3xl">{new Date(data.upcoming[0].date).getDate()}</span>
                  <span className="text-slate-400 font-black text-xs uppercase tracking-widest">{new Date(data.upcoming[0].date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Link href={`/doctors/${data.upcoming[0].doctorId._id}`} className="hover:text-primary transition-colors">
                    <h4 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{data.upcoming[0].doctorId.name}</h4>
                  </Link>
                  <p className="text-primary font-bold text-sm mt-1">{data.upcoming[0].doctorId.profileData.specialization}</p>
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                    <p className="text-slate-500 text-sm flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {new Date(data.upcoming[0].date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 min-w-[160px]">
                  <Button
                    className="rounded-xl font-black shadow-sm"
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
                    className="text-red-500 hover:bg-red-50 rounded-xl font-black"
                    onClick={() => handleCancelAppointment(data.upcoming[0]._id)}
                  >
                    Cancel visit
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold italic">No upcoming sessions found</p>
                <Link href="/appointments">
                  <Button variant="ghost" className="mt-4 text-primary font-black">Book your first session <HiOutlineArrowRight size={16} className="ml-2" /></Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Center - Future proof */}
        <Card className="border-0 shadow-card bg-slate-900 text-white rounded-[2rem] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-xl font-black text-gray-500 mb-2">Quick Actions</h3>
          <p className="text-slate-400 text-xs font-medium mb-6">Access your most used tools instantly</p>
          <div className="space-y-3 relative z-10">
            <Button 
                className="w-full justify-start rounded-xl bg-white/10 hover:bg-white/20 border-0 text-gray-800 font-bold h-12" 
                leftIcon={<HiOutlinePlus />}
                onClick={() => openModal('ADD_MEDICAL_NOTE')}
            >
                New Medical Note
            </Button>
            <Button 
                className="w-full justify-start rounded-xl bg-white/10 hover:bg-white/20 border-0 text-gray-800 font-bold h-12" 
                leftIcon={<HiOutlineDocumentText />}
                onClick={() => openModal('REQUEST_RECORDS')}
            >
                Request Records
            </Button>
            <Button 
                className="w-full justify-start rounded-xl bg-white/10 hover:bg-white/20 border-0 text-gray-800 font-bold h-12" 
                leftIcon={<FiCreditCard />}
                onClick={() => openModal('PAYMENT')}
            >
                Pay Pending Bills
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Medical History Section */}
        <Card className="border-0 shadow-card hover:shadow-card-hover transition-all rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between mx-6 px-0 py-6 border-b border-slate-50">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">Medical Journal</CardTitle>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Visit Reports & Diagnoses</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HiOutlineDocumentText size={20} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {data?.medicalRecords?.length > 0 ? (
                data.medicalRecords.slice(0, 4).map((record: any) => (
                  <div key={record._id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-500 font-black shadow-sm group-hover:scale-110 transition-transform">
                        <FiHeart size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 group-hover:text-primary transition-colors">{record.title}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">By {record.doctorId.name} · {new Date(record.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge variant="info" className="bg-primary/10 text-primary border-0 rounded-lg font-bold">View</Badge>
                  </div>
                ))
              ) : (
                <div className="p-16 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <HiOutlineDocumentText size={32} />
                  </div>
                  <p className="text-slate-400 font-medium italic">No medical records indexed yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Financial Log Card */}
        <Card className="border-0 shadow-card hover:shadow-card-hover transition-all rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between mx-6 px-0 py-6 border-b border-slate-50">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">Financial History</CardTitle>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Invoices & Payments</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <HiOutlineCurrencyDollar size={20} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {data?.invoices?.length > 0 ? (
                data.invoices.slice(0, 4).map((invoice: any) => (
                  <div key={invoice._id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary font-black shadow-sm group-hover:scale-110 transition-transform">
                        <FiCreditCard size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{invoice.invoiceNumber}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{new Date(invoice.createdAt).toLocaleDateString()} · ${invoice.total}</p>
                      </div>
                    </div>
                    <Badge variant="success" className="bg-emerald-50 text-emerald-600 border-0 rounded-lg font-bold">Paid</Badge>
                  </div>
                ))
              ) : (
                <div className="p-16 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <FiCreditCard size={32} />
                  </div>
                  <p className="text-slate-400 font-medium italic">Your billing history will appear here.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

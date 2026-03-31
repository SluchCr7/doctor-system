'use client';

import React, { useEffect, useState } from 'react';
import { 
  HiOutlineClock, 
  HiCheckCircle, 
  HiXCircle, 
  HiOutlinePlus, 
  HiOutlineCalendar,
  HiChevronLeft, 
  HiChevronRight, 
  HiOutlineFunnel, 
  HiOutlineArrowPath 
} from 'react-icons/hi2';
import api from '@/context/api';
import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/context/ModalContext';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import toast from 'react-hot-toast';

const statusVariant: Record<string, "success" | "warning" | "error" | "info"> = {
  confirmed: "success",
  pending: "warning",
  completed: "info",
  cancelled: "error",
};

const getDateParts = (dateStr: string) => {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleString("en", { month: "short" }).toUpperCase(),
    day: d.getDate(),
  };
};

const AppointmentsPage = () => {
  const { user } = useAuth();
  const { openModal } = useModal();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/appointments');
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await api.patch(`/appointments/${id}`, { status });
      if (res.data.success) {
        toast.success(`Appointment marked as ${status}`);
        fetchAppointments();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const handleBook = () => {
    openModal("ADD_APPOINTMENT", { onSuccess: fetchAppointments });
  };

  if (loading) return <div className="p-8 animate-pulse space-y-4">
    <div className="h-20 bg-slate-100 rounded-2xl" />
    <div className="h-64 bg-slate-100 rounded-2xl" />
  </div>;

  return (
    <div className="space-y-8 p-6 lg:p-10 max-w-[1400px] mx-auto">
      <PageHeader
        title="Appointment Hub"
        subtitle={user?.role === 'doctor' ? "Track and manage your patient sessions." : "Manage your upcoming clinic visits."}
        action={
          user?.role === 'patient' && (
            <Button
              className="rounded-2xl shadow-xl shadow-primary/20"
              leftIcon={<HiOutlinePlus size={20} />}
              onClick={handleBook}
            >
              Book New Session
            </Button>
          )
        }
      />

      <Tabs defaultValue="list" className="space-y-8">
        <TabsList className="bg-slate-100/50 p-1 rounded-2xl border border-slate-100">
          <TabsTrigger value="list" className="rounded-xl px-6 font-bold tracking-tight">List Directory</TabsTrigger>
          <TabsTrigger value="calendar" className="rounded-xl px-6 font-bold tracking-tight">Interactive Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {appointments.length > 0 ? (
              appointments.map((appt) => {
                const { month, day } = getDateParts(appt.date);
                const isDoctor = user?.role === 'doctor';
                const otherParty = isDoctor ? appt.patientId : appt.doctorId;

                return (
                  <Card key={appt._id} className="border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group">
                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex items-center gap-8">
                        {/* Date Badge */}
                        <div className="flex flex-col items-center justify-center w-20 h-20 bg-slate-50 rounded-3xl text-slate-800 border-2 border-white shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">{month}</span>
                          <span className="text-2xl font-black">{day}</span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-primary font-bold text-sm">
                            <HiOutlineClock size={16} />
                            {new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <h3 className="text-xl font-black text-slate-900 leading-tight">
                            {otherParty?.name || 'Unknown'}
                          </h3>
                          <div className="flex items-center gap-3">
                            <p className="text-slate-400 text-sm font-medium italic">{appt.notes || "Standard General Consultation"}</p>
                            <Badge variant={statusVariant[appt.status.toLowerCase()] || "info"} className="rounded-lg font-black uppercase text-[10px] tracking-widest px-3 py-1">
                              {appt.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Role-Based Actions */}
                      <div className="flex items-center gap-3">
                        {isDoctor && appt.status === 'pending' && (
                          <>
                            <Button 
                              variant="success" 
                              className="rounded-2xl font-bold px-6 border-0 shadow-lg shadow-emerald-100"
                              onClick={() => handleUpdateStatus(appt._id, 'confirmed')}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              className="rounded-2xl font-bold px-6 text-rose-500 border-rose-100 hover:bg-rose-50"
                              onClick={() => handleUpdateStatus(appt._id, 'cancelled')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        
                        {!isDoctor && appt.status === 'pending' && (
                          <Button 
                            variant="ghost" 
                            className="text-slate-400 hover:text-rose-500 font-bold"
                            onClick={() => handleUpdateStatus(appt._id, 'cancelled')}
                          >
                            Cancel Request
                          </Button>
                        )}

                        <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-all group/btn">
                          <HiOutlineArrowPath className="group-hover/btn:rotate-180 transition-transform duration-500" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-32 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                  <HiOutlineCalendar size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">No appointments found</h3>
                <p className="text-slate-400 font-medium mt-2">Your scheduled sessions will appear here.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="rounded-[2.5rem] border-0 shadow-2xl shadow-slate-100/50 overflow-hidden">
            <CardContent className="p-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                <div className="flex items-center gap-6">
                  <Button variant="ghost" className="w-12 h-12 rounded-2xl bg-slate-50"><HiChevronLeft size={24} /></Button>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">March 2026</h3>
                  <Button variant="ghost" className="w-12 h-12 rounded-2xl bg-slate-50"><HiChevronRight size={24} /></Button>
                </div>
                <div className="flex gap-4">
                  <Badge className="bg-primary/10 text-primary border-0 font-bold px-4 py-2">Upcoming: {appointments.length}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-6">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }).map((_, i) => {
                  const dayNum = i + 1;
                  const dayAppts = appointments.filter(a => new Date(a.date).getDate() === dayNum);
                  
                  return (
                    <div key={i} className="min-h-[140px] bg-white rounded-3xl p-4 border border-slate-50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 cursor-pointer group relative overflow-hidden">
                      <div className="flex justify-between items-center mb-3">
                        <span className={`text-lg font-black ${dayAppts.length > 0 ? 'text-primary' : 'text-slate-300'}`}>
                          {dayNum}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {dayAppts.slice(0, 2).map((a, idx) => (
                          <div key={idx} className="px-3 py-1.5 bg-primary/5 border border-primary/10 text-primary text-[10px] font-black rounded-xl truncate">
                            {user?.role === 'doctor' ? a.patientId.name.split(' ')[0] : a.doctorId.name.split(' ')[0]}
                          </div>
                        ))}
                      </div>
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

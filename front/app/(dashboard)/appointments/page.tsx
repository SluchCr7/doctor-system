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
  HiOutlineArrowPath,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineUserCircle
} from 'react-icons/hi2';
import appointmentService from '@/services/appointmentService';
import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/context/ModalContext';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import toast from 'react-hot-toast';
import Link from 'next/link';

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
    weekday: d.toLocaleString("en", { weekday: "short" }),
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
      const res = await appointmentService.list();
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load clinical schedule');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAction = async (id: string, action: 'accept' | 'reject') => {
    try {
      const res = await appointmentService.respond(id, action);
      if (res.data.success) {
        toast.success(`Session ${action === 'accept' ? 'approved' : 'declined'}`);
        fetchAppointments();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || `Failed to ${action} session`);
    }
  };

  const handleBook = () => {
    openModal("ADD_APPOINTMENT", { onSuccess: fetchAppointments });
  };

  if (loading) return (
    <div className="p-10 space-y-8 animate-pulse">
      <div className="h-12 w-64 bg-slate-100 rounded-2xl" />
      <div className="h-16 w-full bg-slate-50 rounded-2xl" />
      {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-[2rem]" />)}
    </div>
  );

  const isDoctor = user?.role === 'doctor';

  return (
    <div className="space-y-8 p-6 lg:p-10 max-w-[1400px] mx-auto animate-fade-in">
      <PageHeader
        title={isDoctor ? "Clinical Schedule" : "My Appointments"}
        subtitle={isDoctor ? "Manage patient rounds and clinical consultation requests." : "Track your upcoming medical appointments and history."}
        breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: "Appointments", href: "/appointments" },
        ]}
        action={
          !isDoctor && (
            <Button
              className="rounded-2xl shadow-xl shadow-primary/20 font-black h-12 px-6"
              leftIcon={<HiOutlinePlus size={20} strokeWidth={2.5} />}
              onClick={handleBook}
            >
              Book New Session
            </Button>
          )
        }
      />

      <Tabs defaultValue="list" className="space-y-8">
        <TabsList className="bg-slate-100/50 p-1.5 rounded-[1.5rem] border border-slate-100 w-fit">
          <TabsTrigger value="list" className="rounded-xl px-8 py-2.5 font-black uppercase tracking-widest text-[10px]">List View</TabsTrigger>
          <TabsTrigger value="calendar" className="rounded-xl px-8 py-2.5 font-black uppercase tracking-widest text-[10px]">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {appointments.length > 0 ? (
              appointments.map((appt) => {
                const { month, day, weekday } = getDateParts(appt.date);
                const otherParty = isDoctor ? appt.patientId : appt.doctorId;

                return (
                  <Card key={appt._id} className="border-slate-50 shadow-sm hover:shadow-2xl hover:border-primary/10 transition-all duration-500 rounded-[2rem] overflow-hidden group">
                    <CardContent className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                      <div className="flex items-center gap-8">
                        {/* Date Pulse */}
                        <div className="flex flex-col items-center justify-center w-24 h-24 bg-slate-50 rounded-[2rem] text-slate-800 border border-slate-100 group-hover:bg-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-500 shrink-0">
                          <span className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{weekday}</span>
                          <span className="text-3xl font-black italic tracking-tighter leading-none mb-1">{day}</span>
                          <span className="text-[10px] font-black uppercase opacity-40">{month}</span>
                        </div>

                        <div className="space-y-1.5 min-w-0">
                          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase italic tracking-widest">
                            <HiOutlineClock size={16} />
                            {new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-black text-slate-900 leading-tight truncate">
                              {otherParty?.name || 'Unknown Participant'}
                            </h3>
                            <Badge variant={statusVariant[appt.status.toLowerCase()] || "info"} className="rounded-xl font-black uppercase text-[10px] tracking-tighter px-3 py-1 border-0">
                              {appt.status}
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-sm font-bold italic truncate max-w-lg">
                            {appt.notes || "Comprehensive medical check-up and diagnostics"}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 shrink-0">
                        {isDoctor && appt.status === 'pending' ? (
                          <div className="flex gap-2">
                             <Button 
                              onClick={() => handleAction(appt._id, 'accept')}
                              className="rounded-2xl font-black px-6 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                              leftIcon={<HiOutlineCheck strokeWidth={3}/>}
                            >
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleAction(appt._id, 'reject')}
                              variant="outline"
                              className="rounded-2xl font-black px-6 text-rose-500 border-rose-100 hover:bg-rose-50 border-2"
                              leftIcon={<HiOutlineXMark strokeWidth={3}/>}
                            >
                              Decline
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {otherParty?._id && (
                                <Link href={isDoctor ? `/patients/${otherParty._id}` : `/doctors/${otherParty._id}`}>
                                    <Button variant="outline" size="sm" className="rounded-xl font-black text-[10px] border-2 uppercase tracking-widest h-10 px-4">
                                        View profile
                                    </Button>
                                </Link>
                            )}
                            <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm border border-slate-100">
                                <HiOutlineArrowPath size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-40 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200 shadow-sm">
                  <HiOutlineCalendar size={48} strokeWidth={1}/>
                </div>
                <h3 className="text-2xl font-black text-slate-800">No rounds scheduled</h3>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Your clinical docket is currently empty.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="rounded-[3rem] border-0 shadow-2xl shadow-slate-100/50 overflow-hidden bg-white">
            <CardContent className="p-10">
                <div className="text-center py-24">
                     <HiOutlineClock className="w-16 h-16 mx-auto mb-6 text-primary opacity-20" />
                     <h3 className="text-2xl font-black text-slate-800 italic">Advanced Calendar Sync</h3>
                     <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-2 max-w-sm mx-auto leading-loose">
                        Full calendar visualization is being calibrated for the production environment. 
                        Please use the list view for active management.
                     </p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentsPage;

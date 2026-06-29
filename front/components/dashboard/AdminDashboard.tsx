'use client';

import React, { useEffect, useState } from 'react';
import adminService from '@/services/adminService';
import financialService from '@/services/financialService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/context/ModalContext';
import toast from 'react-hot-toast';
import { 
  HiOutlineUsers, HiOutlineCalendar, HiOutlineCurrencyDollar, 
  HiOutlineChartBar, HiOutlineCheck, HiOutlineClock,
  HiOutlineArrowTrendingUp, HiOutlineShieldCheck, HiOutlineDocumentText
} from 'react-icons/hi2';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard({ user }: { user: any }) {
  const [data, setData] = useState<any>(null);
  const [financialStats, setFinancialStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  const fetchAdminDashboard = async () => {
    try {
      const [adminRes, finRes] = await Promise.all([
        adminService.getDashboard(),
        financialService.getStats().catch(() => ({ data: { success: true, data: { revenueTrend: [] } } }))
      ]);

      if (adminRes.data.success) {
        setData(adminRes.data.data);
      }
      if (finRes.data.success) {
        setFinancialStats(finRes.data.data);
      }
    } catch (err) {
      console.error('Failed to load admin dashboard');
      toast.error('Failed to retrieve system-wide operations data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse p-8">
        <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[450px] bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-[450px] bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  const stats = data?.stats || { totalDoctors: 0, totalPatients: 0, totalRevenue: 0, occupancyRate: 0 };
  const logs = data?.logs || [];
  const trendData = financialStats?.revenueTrend || [
    { m: 'Jan', v: 4000 },
    { m: 'Feb', v: 3000 },
    { m: 'Mar', v: 5000 },
    { m: 'Apr', v: 8000 },
    { m: 'May', v: 6000 },
    { m: 'Jun', v: stats.totalRevenue || 9000 },
  ];

  const statsList = [
    { label: 'Active Clinicians', value: stats.totalDoctors, icon: HiOutlineUsers, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'Registered Patients', value: stats.totalPatients, icon: HiOutlineUsers, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-900/20' },
    { label: 'System Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: HiOutlineCurrencyDollar, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Clinic Occupancy', value: `${stats.occupancyRate}%`, icon: HiOutlineChartBar, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
            Operations <span className="text-primary not-italic">Control</span>
          </h1>
          <p className="text-slate-500 mt-1 font-bold italic uppercase tracking-widest text-[10px]">
            System Administrator Command Console — {user.name}
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-black h-12 px-6"
            onClick={() => openModal('ADD_PATIENT')}
          >
            Register Patient
          </Button>
          <Button 
            className="rounded-2xl shadow-xl shadow-primary/20 font-black h-12 px-6" 
            leftIcon={<HiOutlineShieldCheck strokeWidth={2.5}/>}
            onClick={() => openModal('GENERATE_REPORT')}
          >
            Audit System
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((stat, i) => (
          <Card key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-2xl transition-all group overflow-hidden border-0">
            <CardContent className="p-6 relative">
              <div className={`absolute -right-4 -top-4 w-20 h-20 ${stat.bg}/30 rounded-full blur-2xl group-hover:${stat.bg} transition-colors`} />
              <div className="flex items-center justify-between mb-4 relative">
                <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                  <stat.icon size={22} />
                </div>
                <Badge variant="info" className={`${stat.bg} ${stat.color} border-0 text-[10px] font-black uppercase tracking-tighter px-2`}>
                  Live
                </Badge>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800 dark:text-white">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-premium space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-primary rounded-full" />
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Revenue Performance</h2>
              </div>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-lg">
                Last 6 Months
              </span>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="m" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                  />
                  <Area type="monotone" dataKey="v" name="Revenue ($)" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Operational Logs Audits */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-500 rounded-full" />
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Operational Log</h2>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audited Events</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Live" />
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 h-[360px] overflow-y-auto custom-scrollbar">
              {logs.length > 0 ? (
                logs.map((log: any) => (
                  <div key={log.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors flex items-start gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${
                      log.type === 'registration' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' :
                      log.type === 'appointment' ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400' :
                      'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                    }`}>
                      {log.type === 'registration' ? <HiOutlineUsers size={16} /> :
                       log.type === 'appointment' ? <HiOutlineCalendar size={16} /> :
                       <HiOutlineCurrencyDollar size={16} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-snug break-words">
                        {log.message}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-1">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <p className="text-slate-400 text-xs font-bold italic uppercase tracking-widest leading-loose">
                    No system audits logged today
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 text-center bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors cursor-pointer">
              View Detailed Audits
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

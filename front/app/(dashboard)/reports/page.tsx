"use client";
import React from "react";
import {
    FiPieChart,
    FiTrendingUp,
    FiTrendingDown,
    FiArrowUpRight,
    FiUsers,
    FiCalendar,
    FiDownload,
    FiFilter,
    FiActivity
} from "react-icons/fi";

const ReportsPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics & Reports</h1>
                    <p className="text-slate-500 text-sm font-medium">Data-driven insights into your clinic's performance</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold bg-white hover:bg-slate-50 transition-all">
                        <FiFilter /> Customize
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all">
                        <FiDownload /> Export Full Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "New Patients", value: "142", trend: "+12.5%", color: "text-primary", bg: "bg-primary/5", icon: FiUsers },
                    { label: "Appointments", value: "842", trend: "+5.2%", color: "text-secondary", bg: "bg-secondary/5", icon: FiCalendar },
                    { label: "Rev / Patient", value: "$420", trend: "+3.1%", color: "text-accent", bg: "bg-accent/5", icon: FiTrendingUp },
                    { label: "Cancellation", value: "4.2%", trend: "-1.5%", color: "text-danger", bg: "bg-danger/5", icon: FiTrendingDown },
                ].map((stat, i) => (
                    <div key={i} className="medical-card p-6 border-b-4 border-b-slate-100 hover:border-b-primary transition-all group">
                        <div className="flex justify-between items-center mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-accent/10 text-accent' : 'bg-danger/10 text-danger'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</h3>
                        <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Custom CSS Bar Chart: Revenue Trend */}
                <div className="medical-card p-8">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Monthly Revenue</h3>
                            <p className="text-slate-400 text-xs font-semibold">Past 6 months performance</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-primary rounded-full"></span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Actual</span>
                        </div>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-slate-100 pb-2">
                        {[
                            { m: "Sep", v: 40 }, { m: "Oct", v: 65 }, { m: "Nov", v: 55 },
                            { m: "Dec", v: 85 }, { m: "Jan", v: 75 }, { m: "Feb", v: 95 }
                        ].map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                <div className="w-full relative">
                                    <div
                                        className="w-full bg-primary rounded-t-xl group-hover:bg-primary-light transition-all duration-1000 ease-out shadow-lg shadow-primary/10 relative"
                                        style={{ height: `${d.v * 2}px` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            ${d.v}k
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d.m}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom Circular Chart: Diagnoses Distribution */}
                <div className="medical-card p-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Common Diagnoses</h3>
                    <p className="text-slate-400 text-xs font-semibold mb-10">Distribution of visits per specialty</p>

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="relative w-48 h-48 rounded-full border-[16px] border-slate-50 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-l-transparent rotate-45"></div>
                            <div className="text-center">
                                <p className="text-3xl font-black text-slate-800">72%</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth</p>
                            </div>
                        </div>

                        <div className="flex-1 space-y-6">
                            {[
                                { label: "Hypertension", val: "35%", color: "bg-primary" },
                                { label: "Diabetes Type 2", val: "28%", color: "bg-secondary" },
                                { label: "Respiratory", val: "22%", color: "bg-accent" },
                                { label: "Other", val: "15%", color: "bg-slate-200" }
                            ].map(d => (
                                <div key={d.label} className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-slate-500">{d.label}</span>
                                        <span className="text-slate-800">{d.val}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${d.color} transition-all duration-1000`} style={{ width: d.val }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Retention Insight Card */}
            <div className="medical-card p-8 bg-gradient-to-br from-primary to-primary-light text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="space-y-4 max-w-xl">
                        <div className="flex items-center gap-2">
                            <FiActivity className="text-accent" />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">AI Insight • Patient Retention</span>
                        </div>
                        <h2 className="text-3xl font-bold leading-tight">Your clinic retention rate increased by 15% this quarter.</h2>
                        <p className="opacity-70 text-sm font-medium">Personalized follow-up notifications and the new digital prescription system have significantly improved patient engagement scores.</p>
                    </div>
                    <button className="px-8 py-4 bg-white text-primary rounded-2xl font-black text-sm shadow-2xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                        View Strategy Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;

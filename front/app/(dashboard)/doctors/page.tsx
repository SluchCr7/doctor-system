"use client";
import React from "react";
import Link from "next/link";
import {
    FiMail,
    FiPhone,
    FiStar,
    FiCalendar,
    FiUsers,
    FiMoreVertical,
    FiPlus,
    FiMessageSquare,
    FiAward
} from "react-icons/fi";
import { doctors } from "@/data/mockData";

const DoctorsPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Our Medical Specialists</h1>
                    <p className="text-slate-500 text-sm font-medium">Manage and view performance of your clinic's doctors</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-light shadow-lg shadow-primary/20 transition-all">
                    <FiPlus className="w-5 h-5" /> Add New Doctor
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="medical-card group overflow-hidden">
                        <div className="relative h-48 bg-slate-100 overflow-hidden">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <div>
                                    <Link href={`/doctors/${doctor.id}`} className="text-white font-bold text-lg leading-tight hover:underline cursor-pointer">{doctor.name}</Link>
                                    <br />
                                    <span className="text-white/80 text-xs font-medium">{doctor.specialty}</span>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white hover:text-primary transition-all">
                                    <FiMoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex justify-between border-b border-slate-50 pb-4">
                                <div className="text-center bg-slate-50 px-3 py-2 rounded-xl flex-1 border border-slate-100">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rating</div>
                                    <div className="flex items-center justify-center gap-1">
                                        <FiStar className="w-3 h-3 text-warning fill-warning" />
                                        <span className="text-sm font-black text-slate-700">{doctor.rating}</span>
                                    </div>
                                </div>
                                <div className="w-4" />
                                <div className="text-center bg-slate-50 px-3 py-2 rounded-xl flex-1 border border-slate-100">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Experience</div>
                                    <span className="text-sm font-black text-slate-700">{doctor.experience}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                    <FiCalendar className="text-primary w-4 h-4" />
                                    <span>{doctor.availability}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                    <FiUsers className="text-primary w-4 h-4" />
                                    <span>{doctor.patients}+ Patients Treated</span>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-2">
                                <Link href={`/doctors/${doctor.id}`} className="flex-1 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-light transition-all shadow-md shadow-primary/10 flex items-center justify-center">
                                    View Profile
                                </Link>
                                <button className="px-3 py-2.5 border border-slate-200 text-slate-400 rounded-xl hover:text-primary hover:border-primary transition-all">
                                    <FiMessageSquare className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                <div className="medical-card p-6 bg-slate-900 text-white relative overflow-hidden">
                    <FiAward className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10" />
                    <h3 className="text-lg font-bold mb-2">Performance Leader</h3>
                    <p className="text-slate-400 text-sm mb-6">Dr. Lisa Ray has the highest patient retention rate this month.</p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                            <img src="https://i.pravatar.cc/150?u=lisa" alt="" />
                        </div>
                        <div>
                            <div className="font-bold">Dr. Lisa Ray</div>
                            <div className="text-xs text-primary font-bold">Cardiology • 98% Score</div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 medical-card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800">Department Workload</h3>
                        <span className="text-xs text-slate-400 font-medium italic">Weekly overview</span>
                    </div>
                    <div className="space-y-5">
                        {[
                            { name: "General Medicine", load: 85, color: "bg-primary" },
                            { name: "Orthopedics", load: 60, color: "bg-secondary" },
                            { name: "Cardiology", load: 45, color: "bg-accent" },
                            { name: "Pulmonology", load: 30, color: "bg-warning" }
                        ].map((dept) => (
                            <div key={dept.name} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-slate-500">{dept.name}</span>
                                    <span className="text-slate-700">{dept.load}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${dept.color} transition-all duration-1000`}
                                        style={{ width: `${dept.load}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorsPage;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
    FiArrowLeft,
    FiStar,
    FiUsers,
    FiCalendar,
    FiMail,
    FiPhone,
    FiAward,
    FiBookOpen,
    FiBarChart2
} from "react-icons/fi";
import { clinicDoctor, stats } from "@/data/mockData";

const DoctorProfilePage = () => {
    const router = useRouter();
    const doctor = clinicDoctor;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Back & Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-primary hover:border-primary transition-all shadow-sm"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Specialist Profile</h1>
                    <p className="text-slate-500 text-sm font-medium">Viewing credentials and performance for {doctor.name}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left: Bio & Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="medical-card p-8 text-center">
                        <div className="w-32 h-32 rounded-[32px] overflow-hidden mx-auto mb-6 border-4 border-white shadow-2xl">
                            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-1">{doctor.name}</h2>
                        <p className="text-primary font-bold text-sm mb-6">{doctor.specialty}</p>

                        <div className="flex gap-4 border-t border-slate-50 pt-6">
                            <div className="flex-1 text-center font-bold">
                                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Rating</div>
                                <div className="text-lg text-slate-800 flex items-center justify-center gap-1">
                                    <FiStar className="text-warning fill-warning w-4 h-4" /> {doctor.rating}
                                </div>
                            </div>
                            <div className="w-px bg-slate-100" />
                            <div className="flex-1 text-center font-bold">
                                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Exp.</div>
                                <div className="text-lg text-slate-800">{doctor.experience}</div>
                            </div>
                        </div>
                    </div>

                    <div className="medical-card p-6 space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Contact Details</h3>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <FiMail className="text-primary" /> {doctor.email}
                        </div>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                            <FiPhone className="text-primary" /> {doctor.phone}
                        </div>
                    </div>
                </div>

                {/* Right: Detailed Info */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="medical-card p-6 bg-primary text-white">
                            <FiUsers className="w-8 h-8 mb-4 opacity-50" />
                            <div className="text-2xl font-black">{stats.totalPatients}+</div>
                            <div className="text-xs font-bold opacity-70 uppercase tracking-widest">Total Patients</div>
                        </div>
                        <div className="medical-card p-6 bg-secondary text-white">
                            <FiCalendar className="w-8 h-8 mb-4 opacity-50" />
                            <div className="text-2xl font-black">12</div>
                            <div className="text-xs font-bold opacity-70 uppercase tracking-widest">Today's Slots</div>
                        </div>
                        <div className="medical-card p-6 bg-accent text-white">
                            <FiAward className="w-8 h-8 mb-4 opacity-50" />
                            <div className="text-2xl font-black">98%</div>
                            <div className="text-xs font-bold opacity-70 uppercase tracking-widest">Success Rate</div>
                        </div>
                    </div>

                    <div className="medical-card p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <FiBookOpen className="text-primary" />
                            <h3 className="text-xl font-bold text-slate-800">Biography & Certifications</h3>
                        </div>
                        <p className="text-slate-500 leading-relaxed mb-8">
                            {doctor.name} is a board-certified specialist with over {doctor.experience} of experience in {doctor.specialty}.
                            Graduated from the prestigious State Medical Academy with honors. Specializes in advanced clinical diagnostics
                            and patient-first treatment plans. Recognized for outstanding contributions to medical research and community health.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Board Certified Physician",
                                "Masters in Clinical Medicine",
                                "Advanced Life Support (ALS) Certified",
                                "Member of International Medical Board"
                            ].map(cert => (
                                <div key={cert} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <FiAward className="text-accent shrink-0" />
                                    <span className="text-sm font-bold text-slate-700">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="medical-card p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <FiBarChart2 className="text-primary" />
                            <h3 className="text-xl font-bold text-slate-800">Monthly Performance</h3>
                        </div>
                        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-primary w-[85%] rounded-full shadow-lg shadow-primary/20"></div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <span>Patient Satisfaction (85%)</span>
                            <span>Goal: 90%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;

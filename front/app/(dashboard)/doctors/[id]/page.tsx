"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/context/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { HiOutlineCalendar, HiOutlineChatBubbleLeftRight, HiOutlineMapPin, HiOutlineStar, HiOutlineClock, HiOutlineChevronLeft } from 'react-icons/hi2';
import { FiActivity, FiAward, FiPhone, FiMail } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

export default function DoctorPublicProfile() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await api.get(`/doctor/${id}`);
                if (res.data.success) {
                    setDoctor(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch doctor profile");
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [id]);

    if (loading) return <div className="p-12 animate-pulse space-y-8">
        <div className="h-64 bg-slate-200 rounded-[2rem]" />
        <div className="grid grid-cols-3 gap-8">
            <div className="h-96 bg-slate-200 rounded-3xl" />
            <div className="col-span-2 h-96 bg-slate-200 rounded-3xl" />
        </div>
    </div>;

    if (!doctor) return <div className="p-20 text-center">
        <h2 className="text-2xl font-black text-slate-800">Practitioner not found</h2>
        <Link href="/doctors"><Button className="mt-4">Back to List</Button></Link>
    </div>;

    return (
        <div className="p-8 space-y-8 animate-fade-in pb-20">
            {/* Header / Hero Section */}
            <div className="relative bg-white rounded-[3rem] p-12 shadow-premium border border-slate-50 overflow-hidden flex flex-col md:flex-row items-center gap-12 group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative w-48 h-48 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl shrink-0">
                    <Image 
                        src={doctor.profileImage && doctor.profileImage !== 'default-profile.png' ? doctor.profileImage : 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2670&auto=format&fit=crop'} 
                        alt={doctor.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                </div>

                <div className="flex-1 text-center md:text-left relative z-10">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                        <Badge variant="info" className="bg-primary/10 text-primary border-0 rounded-lg font-black uppercase tracking-widest px-3">Verified Medical Professional</Badge>
                        <Badge className="bg-emerald-50 text-emerald-600 border-0 rounded-lg font-black uppercase tracking-widest px-3 flex items-center gap-1">
                            <HiOutlineStar className="fill-emerald-600" /> 4.9 Rating
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 leading-tight">Dr. {doctor.name}</h1>
                    <p className="text-xl font-bold text-primary mb-6">{doctor.profileData?.specialization || "General Medicine"}</p>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-400 font-bold text-sm">
                        <div className="flex items-center gap-2">
                            <FiAward className="text-primary" /> {doctor.profileData?.experienceYears || 10}+ Years Experience
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineMapPin className="text-primary" /> {doctor.profileData?.clinicAddress || "Global Medical Hub"}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[220px]">
                    <Button size="lg" className="rounded-2xl font-black shadow-xl shadow-primary/20 h-14" leftIcon={<HiOutlineCalendar />}>Book Appointment</Button>
                    <Button variant="ghost" size="lg" className="rounded-2xl font-black text-slate-400 hover:text-primary hover:bg-slate-50" leftIcon={<HiOutlineChatBubbleLeftRight />}>Send Message</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Basic Details */}
                <div className="space-y-8">
                    <Card className="border-0 shadow-premium rounded-[2.5rem] bg-white p-8">
                        <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                             <span className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center text-sm">🏠</span> Clinic Information
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 pl-1">Primary Facility</p>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic font-bold text-slate-700">
                                    {doctor.profileData?.clinicName || "Alexander Wellness Center"}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><FiPhone /></div>
                                {doctor.profileData?.clinicPhone || "+1 (555) 000-0000"}
                            </div>
                            <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><FiMail /></div>
                                {doctor.profileData?.clinicEmail || doctor.email}
                            </div>
                        </div>
                    </Card>

                    <Card className="border-0 shadow-premium rounded-[2.5rem] bg-slate-900 p-8 text-white">
                         <h3 className="text-lg font-black mb-6">Expertise</h3>
                         <div className="flex flex-wrap gap-2">
                            {['General Medicine', 'Internal Care', 'Diagnostics', 'Surgery'].map(skill => (
                                <span key={skill} className="px-3 py-1.5 bg-white/10 rounded-xl text-xs font-bold">{skill}</span>
                            ))}
                         </div>
                    </Card>
                </div>

                {/* Right Column: Bio and Schedule */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-0 shadow-premium rounded-[2.5rem] bg-white p-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <FiActivity size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 italic">Clinical Narrative</h3>
                        </div>
                        <p className="text-slate-500 font-medium leading-[1.8] text-lg">
                            {doctor.profileData?.bio || "Dr. " + doctor.name + " is a dedicated medical practitioner with a focus on patient-centered care. With years of experience in clinical diagnosis and advanced treatment protocols, they ensure the highest standards of medical excellence."}
                        </p>
                        
                        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="bg-slate-50 p-6 rounded-3xl text-center">
                                <p className="text-2xl font-black text-slate-900">1.2k+</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Patients</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl text-center">
                                <p className="text-2xl font-black text-slate-900">12+</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Awards</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl text-center">
                                <p className="text-2xl font-black text-slate-900">99%</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Success</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl text-center">
                                <p className="text-2xl font-black text-slate-900">4.9/5</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Rating</p>
                            </div>
                        </div>
                    </Card>

                    {/* Schedule Card */}
                    <Card className="border-0 shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black italic">Consultation Schedule</CardTitle>
                                <p className="text-xs text-slate-400 font-medium mt-1">Standard weekly working hours</p>
                            </div>
                            <div className="p-3 bg-white rounded-2xl shadow-sm text-primary">
                                <HiOutlineClock size={24} />
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                                    const dayData = doctor.availability?.days?.find((d: any) => d.name === day);
                                    const available = dayData?.active;
                                    return (
                                        <div key={day} className={`p-4 rounded-2xl border text-center transition-all ${available ? 'bg-primary/5 border-primary/10 shadow-lg shadow-primary/5' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
                                            <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${available ? 'text-primary' : 'text-slate-400'}`}>{day.slice(0,3)}</p>
                                            <p className={`text-xs font-black ${available ? 'text-slate-900' : 'text-slate-300'}`}>{available ? (dayData.from || '09:00') : 'OFF'}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

"use client";
import React from "react";
import { clinicDoctor } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { FiUser, FiMail, FiPhone, FiBookOpen, FiAward } from "react-icons/fi";

const DoctorProfileSettings = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                            <img src={clinicDoctor.image} alt={clinicDoctor.name} className="w-full h-full object-cover" />
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark transition-all">
                            <FiUser className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-800">{clinicDoctor.name}</h3>
                        <p className="text-primary font-semibold">{clinicDoctor.specialty}</p>
                        <p className="text-slate-500 text-sm mt-2 max-w-xl">{clinicDoctor.bio}</p>
                        <div className="flex gap-4 mt-6">
                            <Button size="sm">Update Profile</Button>
                            <Button size="sm" variant="outline">Preview Public Profile</Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Professional Info</label>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <FiAward className="text-primary w-5 h-5" />
                                <div>
                                    <p className="text-xs text-slate-500 leading-none mb-1">Qualifications</p>
                                    <p className="text-sm font-bold text-slate-700">{clinicDoctor.qualifications}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <FiBookOpen className="text-primary w-5 h-5" />
                                <div>
                                    <p className="text-xs text-slate-500 leading-none mb-1">License Number</p>
                                    <p className="text-sm font-bold text-slate-700">{clinicDoctor.licenseNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Details</label>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <FiMail className="text-primary w-5 h-5" />
                                <div>
                                    <p className="text-xs text-slate-500 leading-none mb-1">Email</p>
                                    <p className="text-sm font-bold text-slate-700">{clinicDoctor.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <FiPhone className="text-primary w-5 h-5" />
                                <div>
                                    <p className="text-xs text-slate-500 leading-none mb-1">Phone</p>
                                    <p className="text-sm font-bold text-slate-700">{clinicDoctor.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfileSettings;

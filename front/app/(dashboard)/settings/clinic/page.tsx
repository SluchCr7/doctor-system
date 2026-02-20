"use client";
import React from "react";
import { FiSave, FiUpload } from "react-icons/fi";
import { clinicDoctor } from "@/data/mockData";

const ClinicSettings = () => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">Clinic Profile</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Update your clinic's public-facing information.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all">
                    <FiSave className="w-4 h-4" /> Save Changes
                </button>
            </div>

            {/* Clinic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Clinic / Practice Name</label>
                    <input
                        type="text"
                        defaultValue="Alexander Hayes Medical Practice"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Official Email</label>
                    <input
                        type="email"
                        defaultValue={clinicDoctor.email}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Phone Number</label>
                    <input
                        type="text"
                        defaultValue={clinicDoctor.phone}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Medical License No.</label>
                    <input
                        type="text"
                        defaultValue={clinicDoctor.licenseNumber}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Clinic Address</label>
                    <textarea
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        rows={2}
                        defaultValue={clinicDoctor.address}
                    />
                </div>
            </div>

            {/* Clinic Logo */}
            <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Clinic Logo</label>
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-200 shrink-0">
                        <img src={clinicDoctor.image} alt="Clinic Logo" className="w-full h-full object-cover" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all">
                        <FiUpload className="w-4 h-4" /> Upload New Logo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClinicSettings;

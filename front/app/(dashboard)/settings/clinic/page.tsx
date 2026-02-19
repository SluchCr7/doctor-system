"use client";
import React from "react";
import { FiSave } from "react-icons/fi";

const ClinicSettings = () => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
                <h3 className="text-xl font-bold text-slate-800">Clinic Profile</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all">
                    <FiSave /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Clinic Name</label>
                        <input
                            type="text"
                            defaultValue="St. Mary's Advanced Medical Center"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Official Email</label>
                        <input
                            type="email"
                            defaultValue="contact@stmarysclinic.com"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Phone Number</label>
                        <input
                            type="text"
                            defaultValue="+1 (555) 123-4567"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Tax ID / License</label>
                        <input
                            type="text"
                            defaultValue="TX-9984218-B"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Primary Address</label>
                    <textarea
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        rows={3}
                        defaultValue={"782 Medical Plaza Way, Suite 400\nSpringfield, IL 62704"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClinicSettings;

"use client";
import React from "react";
import {
    FiFileText,
    FiSearch,
    FiPlus,
    FiFolder,
    FiClock,
    FiUser,
    FiLock,
    FiExternalLink
} from "react-icons/fi";

const MedicalRecordsPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Clinical Records</h1>
                    <p className="text-slate-500 text-sm font-medium">Securely access and manage patient medical history (HIPAA Compliant)</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-light shadow-lg shadow-primary/20 transition-all">
                    <FiPlus className="w-5 h-5" /> New SOAP Note
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar for Filtering */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="medical-card p-4">
                        <div className="relative mb-6">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Patient name or ID..."
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-1">
                            <button className="flex items-center gap-3 w-full p-2.5 bg-primary/10 text-primary rounded-lg text-sm font-bold">
                                <FiFolder className="w-4 h-4" /> All Records
                            </button>
                            <button className="flex items-center gap-3 w-full p-2.5 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-bold transition-all">
                                <FiClock className="w-4 h-4" /> Recent Visits
                            </button>
                            <button className="flex items-center gap-3 w-full p-2.5 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-bold transition-all">
                                <FiLock className="w-4 h-4" /> Confirmed Results
                            </button>
                        </div>
                    </div>

                    <div className="medical-card p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Access Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Radiology", "Lab Reports", "Dental", "Cardiology", "Emergency", "Checkup"].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-lg cursor-pointer hover:border-primary transition-all">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Records List/SOAP UI */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="medical-card p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded uppercase">SOAP FORM</span>
                                    <span className="text-xs font-bold text-slate-400">ID: #REC-88421</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Clinical Assessment</h2>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-slate-800">John Doe</div>
                                <div className="text-xs text-slate-400 font-medium">Date: Feb 18, 2024 • 10:45 AM</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-all">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                                <h3 className="font-black text-primary text-xs uppercase tracking-widest mb-3">Subjective (S)</h3>
                                <p className="text-sm text-slate-600 leading-relaxed italic">
                                    "Patient reports persistent headache for 3 days, localized to the frontal region. Describes pain as throbbing, 7/10 on pain scale. Noted sensitivity to light."
                                </p>
                            </div>
                            <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-secondary/20 transition-all">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
                                <h3 className="font-black text-secondary text-xs uppercase tracking-widest mb-3">Objective (O)</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    BP: 120/80 mmHg, Pulse: 72 bpm, Temp: 98.6°F. Pupils equal and reactive to light. Neurological exam within normal limits. Neck stiffness absent.
                                </p>
                            </div>
                            <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-warning/20 transition-all">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-warning" />
                                <h3 className="font-black text-warning-700 text-xs uppercase tracking-widest mb-3">Assessment (A)</h3>
                                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                                    Diagnosis: Acute Tension Headache (R51.9). Rule out early onset migraine.
                                </p>
                            </div>
                            <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-accent/20 transition-all">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                                <h3 className="font-black text-accent text-xs uppercase tracking-widest mb-3">Plan (P)</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    1. Acetaminophen 500mg as needed.<br />
                                    2. Increased fluid intake and rest.<br />
                                    3. Follow up in 48 hours for review.
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                                    <img src="https://i.pravatar.cc/150?u=alexander" alt="Dr. Alexander Hayes" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-800">Dr. Alexander Hayes</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Attending Physician</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">Print Record</button>
                                <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary-light transition-all">Digitally Sign</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalRecordsPage;

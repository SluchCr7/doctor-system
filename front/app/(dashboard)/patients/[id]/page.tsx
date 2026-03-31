"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    FiArrowLeft,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiActivity,
    FiFileText,
    FiCreditCard,
    FiPlus,
    FiDownload,
    FiEdit3
} from "react-icons/fi";
import { patients, clinicDoctor } from "@/data/mockData";

const PatientProfilePage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Information");

    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return <div className="p-8 text-center">Patient not found</div>;
    }

    const tabs = ["Information", "Medical History", "Prescriptions", "Billing", "Files & Results"];

    return (
        <div className="space-y-6 p-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Back and Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-primary hover:border-primary transition-all shadow-sm"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Patient Profile</h1>
                    <p className="text-slate-500 text-sm font-medium">Viewing details for {patient.name}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Brief Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="medical-card p-6 text-center">
                        <div className="w-24 h-24 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-3xl mx-auto mb-4 border-4 border-white shadow-xl">
                            {patient.name.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{patient.name}</h2>
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Patient ID: {patient.id}</p>

                        <div className="flex gap-2 justify-center mb-6">
                            <span className="px-2 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded uppercase">Blood: {patient.bloodGroup}</span>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">{patient.age} Yrs</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">{patient.gender}</span>
                        </div>

                        <div className="space-y-3 text-left">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <FiPhone className="text-primary w-4 h-4" />
                                <span>{patient.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <FiMail className="text-primary w-4 h-4" />
                                <span className="truncate">{patient.email}</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                                <FiMapPin className="text-primary w-4 h-4 mt-1" />
                                <span>{patient.address}</span>
                            </div>
                        </div>

                        <button className="w-full mt-8 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all">
                            Book Appointment
                        </button>
                    </div>

                    <div className="medical-card p-6">
                        <h3 className="font-bold text-slate-800 text-sm mb-4">Alerts & Status</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Allergies</span>
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies.length > 0 ? (
                                        patient.allergies.map(a => (
                                            <span key={a} className="px-2 py-1 bg-danger/10 text-danger text-[10px] font-bold rounded">{a}</span>
                                        ))
                                    ) : <span className="text-xs text-slate-400 italic">None</span>}
                                </div>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Chronic Diseases</span>
                                <div className="flex flex-wrap gap-2">
                                    {patient.chronicDiseases.length > 0 ? (
                                        patient.chronicDiseases.map(d => (
                                            <span key={d} className="px-2 py-1 bg-warning/20 text-warning-700 text-[10px] font-bold rounded">{d}</span>
                                        ))
                                    ) : <span className="text-xs text-slate-400 italic">None</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Tabs */}
                    <div className="bg-white p-1 rounded-xl border border-slate-200 inline-flex shadow-sm overflow-x-auto max-w-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="medical-card p-8 min-h-[500px]">
                        {activeTab === "Information" && (
                            <div className="animate-in fade-in duration-500">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-xl font-bold text-slate-800">Visit History</h3>
                                    <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                                        <FiDownload className="w-4 h-4" /> Export Report
                                    </button>
                                </div>

                                <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
                                    {patient.history.map((h, i) => (
                                        <div key={i} className="relative pl-8">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm" />
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                                <div>
                                                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{h.date}</div>
                                                    <h4 className="font-bold text-slate-800 text-lg mt-1">{h.reason}</h4>
                                                    <p className="text-slate-500 text-sm mt-1">Diagnosis: <span className="text-slate-700 font-medium">{h.diagnosis}</span></p>
                                                </div>
                                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                    <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                                                    <span className="text-xs font-bold text-slate-600">{h.doctor}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-500 line-clamp-2 italic">
                                                "Patient presented with standard symptoms. Prescribed medications and advised rest for 3 days. Follow up required if symptoms persist."
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="flex items-center justify-center gap-2 w-full mt-8 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-primary hover:text-primary transition-all group">
                                    <FiPlus className="group-hover:scale-110 transition-transform" /> Add New Visit Record
                                </button>
                            </div>
                        )}

                        {activeTab === "Medical History" && (
                            <div className="animate-in fade-in duration-500 text-center py-20">
                                <FiFileText className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                                <h3 className="font-bold text-slate-700">Detailed Medical History</h3>
                                <p className="text-slate-400 text-sm">Comprehensive clinical history records will appear here.</p>
                            </div>
                        )}

                        {activeTab === "Prescriptions" && (
                            <div className="animate-in fade-in duration-500">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-slate-800">Current Prescriptions</h3>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-lg shadow-primary/20">
                                        <FiPlus /> New Prescription
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2].map((p) => (
                                        <div key={p} className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 flex justify-between items-center group hover:border-primary/30 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100">
                                                    <FiActivity className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm">Amoxicillin 500mg</h4>
                                                    <p className="text-xs text-slate-400 font-medium">1 tablet • 3 times daily • 7 days</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</div>
                                                <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold rounded-full">ACTIVE</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "Billing" && (
                            <div className="animate-in fade-in duration-500">
                                <h3 className="text-xl font-bold text-slate-800 mb-6">Payment History</h3>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                                                    <FiCreditCard className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">Consultation Fee</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">Feb {10 + i}, 2024 • Paid via Card</p>
                                                </div>
                                            </div>
                                            <span className="font-black text-slate-700">$150.00</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "Files & Results" && (
                            <div className="animate-in fade-in duration-500">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-slate-800">Medical Documents & Lab Results</h3>
                                    <button className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-primary/30 text-primary rounded-xl text-xs font-bold hover:bg-primary/5 transition-all">
                                        <FiPlus /> Upload New File
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { name: "Blood Test Results.pdf", date: "2024-02-10", size: "2.4 MB", type: "Lab Result" },
                                        { name: "Chest X-Ray.jpg", date: "2023-08-15", size: "12.8 MB", type: "Imaging" },
                                        { name: "Vaccination Record.pdf", date: "2023-05-20", size: "1.1 MB", type: "Record" },
                                    ].map((file, i) => (
                                        <div key={i} className="p-4 border border-slate-100 rounded-2xl bg-white flex justify-between items-center hover:border-primary/20 hover:shadow-sm transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                                    <FiFileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm truncate max-w-[150px]">{file.name}</h4>
                                                    <p className="text-[10px] text-slate-400 font-medium">{file.type} • {file.date} • {file.size}</p>
                                                </div>
                                            </div>
                                            <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                                                <FiDownload className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfilePage;

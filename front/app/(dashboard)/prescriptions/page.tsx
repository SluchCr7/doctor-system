"use client";
import React, { useState } from "react";
import {
    FiActivity,
    FiPlus,
    FiTrash2,
    FiPrinter,
    FiSend,
    FiSearch,
    FiInfo,
    FiCheckCircle
} from "react-icons/fi";
import PrintPrescriptionModal from "@/components/modals/PrintPrescriptionModal";

const PrescriptionsPage = () => {
    const [isPrintOpen, setIsPrintOpen] = useState(false);
    const [medications, setMedications] = useState([
        { name: "Amoxicillin", dosage: "500mg", frequency: "Twice daily", duration: "7 days" }
    ]);

    const addMedication = () => {
        setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "" }]);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PrintPrescriptionModal
                isOpen={isPrintOpen}
                onClose={() => setIsPrintOpen(false)}
                patientName="John Doe"
                medications={medications}
            />

            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Prescription Builder</h1>
                    <p className="text-slate-500 text-sm font-medium">Create and manage digital prescriptions for patients</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsPrintOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                        <FiPrinter /> Print Layout
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all">
                        <FiSend /> Send to Pharmacy
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Prescription form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="medical-card p-8">
                        <div className="flex justify-between border-b border-slate-100 pb-6 mb-8">
                            <div className="space-y-4 w-full max-w-sm">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Select Patient</label>
                                    <div className="relative">
                                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            defaultValue="John Doe"
                                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-slate-700"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Date Issued</div>
                                <div className="text-sm font-bold text-slate-800">Feb 18, 2024</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-slate-800">Medications</h3>
                                <button
                                    onClick={addMedication}
                                    className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
                                >
                                    <FiPlus /> Add Drug
                                </button>
                            </div>

                            {medications.map((med, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 items-end">
                                    <div className="md:col-span-1">
                                        <label className="text-[10px] font-bold text-slate-400 mb-1 block">Drug Name</label>
                                        <input
                                            type="text"
                                            placeholder="Medication name"
                                            defaultValue={med.name}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 mb-1 block">Dosage</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 500mg"
                                            defaultValue={med.dosage}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 mb-1 block">Frequency</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 3x day"
                                            defaultValue={med.frequency}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-bold text-slate-400 mb-1 block">Duration</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 7 days"
                                                defaultValue={med.duration}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            />
                                        </div>
                                        <button className="p-2 text-danger hover:bg-danger/10 rounded-lg self-end mb-0.5">
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Special Instructions</label>
                            <textarea
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                rows={3}
                                placeholder="Notes for the patient or pharmacist..."
                            />
                        </div>
                    </div>
                </div>

                {/* Prescription Sidebar */}
                <div className="space-y-6">
                    <div className="medical-card p-6 bg-primary text-white shadow-xl shadow-primary/20">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <FiInfo /> Safety Check
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-3 items-start bg-white/10 p-3 rounded-lg border border-white/10">
                                <FiCheckCircle className="text-secondary mt-1 shrink-0" />
                                <p className="text-xs font-medium opacity-90">No drug interactions detected for this patient's current medications.</p>
                            </div>
                            <div className="flex gap-3 items-start bg-white/10 p-3 rounded-lg border border-white/10">
                                <FiCheckCircle className="text-secondary mt-1 shrink-0" />
                                <p className="text-xs font-medium opacity-90">Dosage is within standard recommended range for patient age/weight.</p>
                            </div>
                        </div>
                    </div>

                    <div className="medical-card p-6">
                        <h3 className="font-bold text-slate-800 text-sm mb-4">Patient Medication History</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Lisinopril", status: "Active" },
                                { name: "Metformin", status: "Completed" },
                                { name: "Ibuprofen", status: "Paused" }
                            ].map((h, i) => (
                                <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
                                    <span className="text-sm font-bold text-slate-700">{h.name}</span>
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${h.status === "Active" ? "bg-accent/10 text-accent" : h.status === "Completed" ? "bg-slate-100 text-slate-400" : "bg-warning/10 text-warning"
                                        }`}>{h.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionsPage;

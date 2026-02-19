"use client";
import React, { useState } from "react";
import {
    FiPlus,
    FiTrash2,
    FiPrinter,
    FiSend,
    FiSearch,
    FiInfo,
    FiCheckCircle,
    FiEdit3,
    FiFileText,
} from "react-icons/fi";
import { useModal } from "@/context/ModalContext";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/PageHeader";

interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
}

const PrescriptionsPage = () => {
    const { openModal } = useModal();
    const [medications, setMedications] = useState<Medication[]>([
        { id: 1, name: "Amoxicillin", dosage: "500mg", frequency: "Twice daily", duration: "7 days" },
    ]);
    const [patientName, setPatientName] = useState("John Doe");
    const [instructions, setInstructions] = useState("");

    const addMedication = () => {
        setMedications(prev => [
            ...prev,
            { id: Date.now(), name: "", dosage: "", frequency: "", duration: "" },
        ]);
    };

    const removeMedication = (id: number) => {
        if (medications.length > 1) {
            setMedications(prev => prev.filter(m => m.id !== id));
        }
    };

    const updateMedication = (id: number, field: keyof Medication, value: string) => {
        setMedications(prev => prev.map(m => (m.id === id ? { ...m, [field]: value } : m)));
    };

    const handlePrintPreview = () => {
        openModal("PRINT_PRESCRIPTION", {
            patientName,
            medications,
        });
    };

    const handleWriteModal = () => {
        openModal("WRITE_PRESCRIPTION", {
            patientName,
        });
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Prescription Builder"
                subtitle="Create and manage digital prescriptions for patients."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Prescriptions", href: "/prescriptions" },
                ]}
                action={
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            leftIcon={<FiEdit3 />}
                            onClick={handleWriteModal}
                        >
                            New Prescription
                        </Button>
                        <Button
                            variant="secondary"
                            leftIcon={<FiPrinter />}
                            onClick={handlePrintPreview}
                        >
                            Print Preview
                        </Button>
                        <Button leftIcon={<FiSend />}>
                            Send to Pharmacy
                        </Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── Prescription Form ──────────────────────────────────────── */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 md:p-8">
                        {/* Patient & Date Row */}
                        <div className="flex justify-between items-start border-b border-slate-100 pb-6 mb-6">
                            <div className="w-full max-w-sm space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 block">Select Patient</label>
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={patientName}
                                        onChange={e => setPatientName(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all"
                                    />
                                </div>
                            </div>
                            <div className="text-right shrink-0 ml-4">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date Issued</div>
                                <div className="text-sm font-bold text-slate-800">
                                    {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </div>
                            </div>
                        </div>

                        {/* Medications */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-sm font-bold text-slate-800">Medications</h3>
                                <button
                                    onClick={addMedication}
                                    className="text-primary font-semibold text-sm flex items-center gap-1.5 hover:text-primary-dark transition-colors"
                                >
                                    <FiPlus className="w-4 h-4" /> Add Drug
                                </button>
                            </div>

                            {medications.map((med) => (
                                <div
                                    key={med.id}
                                    className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 items-end group"
                                >
                                    <div className="md:col-span-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Drug Name</label>
                                        <input
                                            type="text"
                                            placeholder="Medication name"
                                            value={med.name}
                                            onChange={e => updateMedication(med.id, "name", e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Dosage</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 500mg"
                                            value={med.dosage}
                                            onChange={e => updateMedication(med.id, "dosage", e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Frequency</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Twice daily"
                                            value={med.frequency}
                                            onChange={e => updateMedication(med.id, "frequency", e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Duration</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 7 days"
                                                value={med.duration}
                                                onChange={e => updateMedication(med.id, "duration", e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeMedication(med.id)}
                                            disabled={medications.length === 1}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg self-end mb-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Remove"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Special Instructions */}
                        <div className="mt-6">
                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Special Instructions</label>
                            <textarea
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all resize-none"
                                rows={3}
                                placeholder="Notes for the patient or pharmacist..."
                                value={instructions}
                                onChange={e => setInstructions(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* ── Sidebar ────────────────────────────────────────────────── */}
                <div className="space-y-6">
                    {/* Safety Check */}
                    <div className="rounded-2xl p-6 bg-primary text-white shadow-lg shadow-primary/20">
                        <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
                            <FiInfo className="w-4 h-4" /> Safety Check
                        </h3>
                        <div className="space-y-3">
                            {[
                                "No drug interactions detected for this patient's current medications.",
                                "Dosage is within standard recommended range for patient age/weight.",
                            ].map((msg, i) => (
                                <div key={i} className="flex gap-3 items-start bg-white/10 p-3 rounded-xl border border-white/10">
                                    <FiCheckCircle className="text-emerald-300 mt-0.5 shrink-0 w-4 h-4" />
                                    <p className="text-xs font-medium opacity-90 leading-relaxed">{msg}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Patient Medication History */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
                        <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                            <FiFileText className="w-4 h-4 text-primary" />
                            Medication History
                        </h3>
                        <div className="space-y-2">
                            {[
                                { name: "Lisinopril", status: "Active", color: "text-sky-600 bg-sky-50" },
                                { name: "Metformin", status: "Completed", color: "text-slate-500 bg-slate-100" },
                                { name: "Ibuprofen", status: "Paused", color: "text-amber-600 bg-amber-50" },
                            ].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                                >
                                    <span className="text-sm font-medium text-slate-700">{h.name}</span>
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${h.color}`}>
                                        {h.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 space-y-3">
                        <h3 className="text-sm font-bold text-slate-700 mb-3">Quick Actions</h3>
                        <Button
                            className="w-full"
                            variant="secondary"
                            leftIcon={<FiPrinter />}
                            onClick={handlePrintPreview}
                        >
                            Print / Preview
                        </Button>
                        <Button
                            className="w-full"
                            leftIcon={<FiSend />}
                        >
                            Send to Pharmacy
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionsPage;

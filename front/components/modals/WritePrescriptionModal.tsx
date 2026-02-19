"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { FiPlus, FiTrash2, FiPrinter, FiSave } from "react-icons/fi";

interface WritePrescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientName?: string;
    onSubmit?: (data: any) => void;
    isLoading?: boolean;
}

interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
}

const WritePrescriptionModal = ({ isOpen, onClose, patientName = "Unknown Patient", onSubmit, isLoading = false }: WritePrescriptionModalProps) => {
    const [medications, setMedications] = useState<Medication[]>([
        { id: 1, name: "", dosage: "", frequency: "1-0-1", duration: "5 days", instructions: "After food" }
    ]);

    const addMedication = () => {
        setMedications([...medications, {
            id: Date.now(),
            name: "",
            dosage: "",
            frequency: "1-0-1",
            duration: "5 days",
            instructions: ""
        }]);
    };

    const removeMedication = (id: number) => {
        if (medications.length > 1) {
            setMedications(medications.filter(m => m.id !== id));
        }
    };

    const updateMedication = (id: number, field: keyof Medication, value: string) => {
        setMedications(medications.map(m => m.id === id ? { ...m, [field]: value } : m));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ patientName, medications });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Write New Prescription"
            description={`Prescribing for ${patientName}`}
            size="4xl"
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Medications</h4>
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={addMedication}
                            leftIcon={<FiPlus />}
                        >
                            Add Drug
                        </Button>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {medications.map((med, index) => (
                            <div key={med.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative group animate-in fade-in slide-in-from-bottom-2 duration-200">
                                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => removeMedication(med.id)}
                                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                        title="Remove"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                    <div className="md:col-span-4">
                                        <Input
                                            label={index === 0 ? "Drug Name" : undefined}
                                            placeholder="e.g. Amoxicillin"
                                            value={med.name}
                                            onChange={e => updateMedication(med.id, "name", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Input
                                            label={index === 0 ? "Dosage" : undefined}
                                            placeholder="500mg"
                                            value={med.dosage}
                                            onChange={e => updateMedication(med.id, "dosage", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Select
                                            label={index === 0 ? "Frequency" : undefined}
                                            options={[
                                                { label: "1-0-0", value: "1-0-0" },
                                                { label: "1-0-1", value: "1-0-1" },
                                                { label: "1-1-1", value: "1-1-1" },
                                                { label: "0-0-1", value: "0-0-1" },
                                                { label: "SOS", value: "SOS" }
                                            ]}
                                            value={med.frequency}
                                            onChange={e => updateMedication(med.id, "frequency", e.target.value)}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Input
                                            label={index === 0 ? "Duration" : undefined}
                                            placeholder="5 days"
                                            value={med.duration}
                                            onChange={e => updateMedication(med.id, "duration", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Input
                                            label={index === 0 ? "Notes" : undefined}
                                            placeholder="Instruction"
                                            value={med.instructions}
                                            onChange={e => updateMedication(med.id, "instructions", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <Button variant="ghost" type="button" onClick={onClose} disabled={isLoading}>Cancel</Button>
                    <Button variant="outline" type="button" leftIcon={<FiPrinter />} disabled={isLoading}>Print Preview</Button>
                    <Button type="submit" isLoading={isLoading} leftIcon={<FiSave />}>Save Prescription</Button>
                </div>
            </form>
        </Modal>
    );
};

export default WritePrescriptionModal;

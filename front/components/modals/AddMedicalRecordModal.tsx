"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { FiCalendar, FiFileText, FiUploadCloud } from "react-icons/fi";

interface AddMedicalRecordModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientName?: string;
    onSubmit?: (data: any) => void;
    isLoading?: boolean;
}

const AddMedicalRecordModal = ({ isOpen, onClose, patientName = "Unknown Patient", onSubmit, isLoading = false }: AddMedicalRecordModalProps) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        diagnosis: "",
        treatment: "",
        notes: "",
        attachments: [] as File[]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Medical Record"
            description={`Adding new record for ${patientName}`}
            size="2xl"
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Date"
                        type="date"
                        leftIcon={<FiCalendar />}
                        value={formData.date}
                        onChange={e => handleChange("date", e.target.value)}
                        required
                    />
                    <div className="space-y-1.5">
                        <Select
                            label="Record Type"
                            options={[
                                { label: "Consultation Note", value: "Consultation Note" },
                                { label: "Lab Result", value: "Lab Result" },
                                { label: "Procedure Note", value: "Procedure Note" },
                                { label: "Radiology Report", value: "Radiology Report" }
                            ]}
                        />
                    </div>
                </div>

                <Input
                    label="Diagnosis"
                    placeholder="e.g. Acute Bronchitis"
                    value={formData.diagnosis}
                    onChange={e => handleChange("diagnosis", e.target.value)}
                    required
                />

                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1.5">Treatment Plan / Prescription</label>
                    <textarea
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all resize-none"
                        rows={3}
                        placeholder="Details of treatment..."
                        value={formData.treatment}
                        onChange={e => handleChange("treatment", e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1.5">Physician Notes</label>
                    <div className="relative">
                        <FiFileText className="absolute left-4 top-4 text-slate-400" />
                        <textarea
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all resize-none"
                            rows={4}
                            placeholder="Additional observation notes..."
                            value={formData.notes}
                            onChange={e => handleChange("notes", e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1.5">Attachments</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <FiUploadCloud className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-sm font-bold text-slate-700">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or PDF (max. 10MB)</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <Button variant="ghost" type="button" onClick={onClose} disabled={isLoading}>Cancel</Button>
                    <Button type="submit" isLoading={isLoading}>Save Record</Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddMedicalRecordModal;

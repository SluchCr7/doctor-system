"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FiUser, FiCalendar, FiClock, FiSearch, FiFileText } from "react-icons/fi";

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
    isLoading?: boolean;
    onSubmit?: (data: any) => void;
}

const BookAppointmentModal = ({ isOpen, onClose, initialData, isLoading = false, onSubmit }: AppointmentModalProps) => {
    const isEditMode = !!initialData;
    const [formData, setFormData] = useState({
        patientId: "", // In a real app, this would be selected
        patientName: "", // For display/search
        doctorId: "",
        type: "General Consultation",
        date: "",
        time: "",
        notes: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                patientId: initialData.patientId || "",
                patientName: initialData.patientName || "",
                doctorId: initialData.doctorId || "",
                type: initialData.type || "General Consultation",
                date: initialData.date || "",
                time: initialData.time || "",
                notes: initialData.notes || ""
            });
        } else {
            // Reset form when modal opens in non-edit mode
            setFormData({
                patientId: "",
                patientName: "",
                doctorId: "",
                type: "General Consultation",
                date: "",
                time: "",
                notes: ""
            });
        }
    }, [initialData, isOpen]);

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
            title={isEditMode ? "Reschedule Appointment" : "Book New Appointment"}
            description={isEditMode ? "Update appointment details." : "Schedule a new appointment for a patient."}
            size="lg"
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1.5">
                            {isEditMode ? "Patient" : "Search Patient"}
                        </label>
                        <div className="relative group">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name, ID or phone..."
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all read-only:bg-slate-100 read-only:text-slate-500"
                                value={formData.patientName}
                                onChange={e => handleChange("patientName", e.target.value)}
                                readOnly={isEditMode} // Usually can't change patient on reschedule
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Select Doctor</label>
                            <select
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                value={formData.doctorId}
                                onChange={e => handleChange("doctorId", e.target.value)}
                            >
                                <option value="" disabled>Select Doctor</option>
                                <option value="dr-smith">Dr. Sarah Smith (General)</option>
                                <option value="dr-wilson">Dr. James Wilson (Orthopedics)</option>
                                <option value="dr-chen">Dr. Robert Chen (Pulmonology)</option>
                                <option value="dr-ray">Dr. Lisa Ray (Cardiology)</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Visit Type</label>
                            <select
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                value={formData.type}
                                onChange={e => handleChange("type", e.target.value)}
                            >
                                <option>General Consultation</option>
                                <option>Follow-up Visit</option>
                                <option>Lab Work / Testing</option>
                                <option>Emergency</option>
                            </select>
                        </div>

                        <Input
                            label="Appointment Date"
                            type="date"
                            leftIcon={<FiCalendar />}
                            value={formData.date}
                            onChange={e => handleChange("date", e.target.value)}
                            required
                        />
                        <Input
                            label="Preferred Time"
                            type="time"
                            leftIcon={<FiClock />}
                            value={formData.time}
                            onChange={e => handleChange("time", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-1.5">Reason for Visit / Notes</label>
                        <div className="relative">
                            <FiFileText className="absolute left-4 top-4 text-slate-400" />
                            <textarea
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all resize-none"
                                rows={3}
                                placeholder="Brief description of symptoms or purpose of visit..."
                                value={formData.notes}
                                onChange={e => handleChange("notes", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} type="button" disabled={isLoading}>Cancel</Button>
                    {!isEditMode && <Button variant="secondary" onClick={() => { }} type="button" disabled={isLoading}>Check Availability</Button>}
                    <Button type="submit" isLoading={isLoading}>
                        {isEditMode ? "Reschedule Appointment" : "Confirm Booking"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default BookAppointmentModal;

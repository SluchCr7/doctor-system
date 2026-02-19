"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
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
        patientName: "", // For display/search
        doctorId: "",
        type: "General Consultation",
        date: "",
        time: "",
        notes: ""
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    patientName: initialData.patientName || "",
                    doctorId: initialData.doctorId || "",
                    type: initialData.type || "General Consultation",
                    date: initialData.date || "",
                    time: initialData.time || "",
                    notes: initialData.notes || ""
                });
            } else {
                setFormData({
                    patientName: "",
                    doctorId: "",
                    type: "General Consultation",
                    date: "",
                    time: "",
                    notes: ""
                });
            }
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        } else {
            // Demo only: Close on submit if no handler
            onClose();
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
                    <Input
                        label={isEditMode ? "Patient Name" : "Search Patient"}
                        placeholder="Search by name, ID or phone..."
                        leftIcon={<FiSearch />}
                        value={formData.patientName}
                        onChange={e => handleChange("patientName", e.target.value)}
                        required
                        readOnly={isEditMode}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label="Select Doctor"
                            options={[
                                { label: "Dr. Sarah Smith (General)", value: "dr-smith" },
                                { label: "Dr. James Wilson (Orthopedics)", value: "dr-wilson" },
                                { label: "Dr. Robert Chen (Pulmonology)", value: "dr-chen" },
                                { label: "Dr. Lisa Ray (Cardiology)", value: "dr-ray" }
                            ]}
                            value={formData.doctorId}
                            onChange={e => handleChange("doctorId", e.target.value)}
                        />

                        <Select
                            label="Visit Type"
                            options={[
                                { label: "General Consultation", value: "General Consultation" },
                                { label: "Follow-up Visit", value: "Follow-up Visit" },
                                { label: "Lab Work / Testing", value: "Lab Work / Testing" },
                                { label: "Emergency", value: "Emergency" }
                            ]}
                            value={formData.type}
                            onChange={e => handleChange("type", e.target.value)}
                        />

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
                        <label className="text-sm font-medium text-slate-700 mb-1.5 ml-1 block">Reason for Visit / Notes</label>
                        <div className="relative">
                            <FiFileText className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
                            <textarea
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all resize-none placeholder:text-slate-400"
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

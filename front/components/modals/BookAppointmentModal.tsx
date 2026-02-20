"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { FiSearch, FiCalendar, FiClock, FiFileText } from "react-icons/fi";
import { clinicDoctor } from "@/data/mockData";
import { FiActivity } from "react-icons/fi";

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
        patientName: "",
        type: "General Consultation",
        date: "",
        time: "",
        notes: "",
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    patientName: initialData.patientName || "",
                    type: initialData.type || "General Consultation",
                    date: initialData.date || "",
                    time: initialData.time || "",
                    notes: initialData.notes || "",
                });
            } else {
                setFormData({
                    patientName: "",
                    type: "General Consultation",
                    date: "",
                    time: "",
                    notes: "",
                });
            }
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            // Always link to the single clinic doctor
            onSubmit({ ...formData, doctorId: clinicDoctor.id, doctorName: clinicDoctor.name });
        } else {
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
            description={isEditMode ? "Update the appointment details below." : "Schedule a new appointment at the clinic."}
            size="lg"
        >
            {/* Static Doctor Info Banner */}
            <div className="flex items-center gap-3 p-3 bg-sky-50 border border-sky-100 rounded-xl mb-5">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <img src={clinicDoctor.image} alt={clinicDoctor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-800">{clinicDoctor.name}</p>
                    <p className="text-xs text-slate-500">{clinicDoctor.specialty} • {clinicDoctor.clinicHours}</p>
                </div>
                <div className="ml-auto">
                    <span className="text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full">
                        ✓ Available
                    </span>
                </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Patient Search */}
                <Input
                    label={isEditMode ? "Patient Name" : "Search Patient"}
                    placeholder="Search by name, ID, or phone number…"
                    leftIcon={<FiSearch />}
                    value={formData.patientName}
                    onChange={e => handleChange("patientName", e.target.value)}
                    required
                    readOnly={isEditMode}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Visit Type */}
                    <Select
                        label="Visit Type"
                        options={[
                            { label: "General Consultation", value: "General Consultation" },
                            { label: "Follow-up Visit", value: "Follow-up Visit" },
                            { label: "Annual Check-up", value: "Annual Check-up" },
                            { label: "Vaccination", value: "Vaccination" },
                            { label: "Lab Results Review", value: "Lab Results Review" },
                            { label: "Emergency", value: "Emergency" },
                        ]}
                        value={formData.type}
                        onChange={e => handleChange("type", e.target.value)}
                    />

                    {/* Date */}
                    <Input
                        label="Appointment Date"
                        type="date"
                        leftIcon={<FiCalendar />}
                        value={formData.date}
                        onChange={e => handleChange("date", e.target.value)}
                        required
                    />

                    {/* Time */}
                    <Input
                        label="Preferred Time"
                        type="time"
                        leftIcon={<FiClock />}
                        value={formData.time}
                        onChange={e => handleChange("time", e.target.value)}
                        required
                    />
                </div>

                {/* Notes */}
                <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 ml-1 block">
                        Reason for Visit / Notes <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                        <FiFileText className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
                        <textarea
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all resize-none placeholder:text-slate-400"
                            rows={3}
                            placeholder="Brief description of symptoms or reason for the visit…"
                            value={formData.notes}
                            onChange={e => handleChange("notes", e.target.value)}
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} type="button" disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                        {isEditMode ? "Reschedule Appointment" : "Confirm Booking"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default BookAppointmentModal;

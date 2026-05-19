"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FiUser, FiPhone, FiMail, FiMapPin, FiCalendar } from "react-icons/fi";
import userService from "@/services/userService";
import toast from "react-hot-toast";

interface PatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any; // Replace with proper Patient type
    isLoading?: boolean;
    onSubmit?: (data: any) => void;
}

const AddPatientModal = ({ isOpen, onClose, initialData, isLoading = false, onSubmit }: PatientModalProps) => {
    const isEditMode = !!initialData;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        password: "DefaultPassword123!", // For auto-registration
        address: "",
        bloodGroup: "A+",
        gender: "male"
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                fullName: initialData.fullName || "",
                dateOfBirth: initialData.dateOfBirth || "",
                phone: initialData.phone || "",
                email: initialData.email || "",
                address: initialData.address || "",
                bloodGroup: initialData.bloodGroup || "A+",
                gender: initialData.gender || "male",
                password: "DefaultPassword123!"
            });
        } else {
            setFormData({
                fullName: "",
                dateOfBirth: "",
                phone: "",
                email: "",
                address: "",
                bloodGroup: "A+",
                gender: "male",
                password: "DefaultPassword123!"
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                name: formData.fullName,
                email: formData.email || `${formData.fullName.toLowerCase().replace(/\s/g, '')}@clinic.local`,
                password: formData.password,
                role: 'patient',
                profileData: {
                    phone: formData.phone,
                    address: formData.address,
                    gender: formData.gender.toLowerCase(),
                    bloodType: formData.bloodGroup,
                    // Additional mock data for completeness if needed
                }
            };

            const res = isEditMode 
                ? await userService.updateUser(initialData._id, payload)
                : await userService.registerPatient(payload);

            if (res.data.success) {
                toast.success(isEditMode ? 'Patient updated' : 'Patient registered successfully');
                if (onSubmit) onSubmit(res.data.data);
                onClose();
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Action failed');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? "Edit Patient Details" : "Register New Patient"}
            description={isEditMode ? "Update the patient's personal information." : "Enter the details to register a new patient."}
            size="xl"
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Full Name"
                        placeholder="e.g. John Doe"
                        leftIcon={<FiUser />}
                        value={formData.fullName}
                        onChange={e => handleChange("fullName", e.target.value)}
                        required
                    />
                    <Input
                        label="Date of Birth"
                        type="date"
                        leftIcon={<FiCalendar />}
                        value={formData.dateOfBirth}
                        onChange={e => handleChange("dateOfBirth", e.target.value)}
                        required
                    />
                    <Input
                        label="Phone Number"
                        placeholder="+1 (555) 000-0000"
                        leftIcon={<FiPhone />}
                        value={formData.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        leftIcon={<FiMail />}
                        value={formData.email}
                        onChange={e => handleChange("email", e.target.value)}
                    />
                    <div className="md:col-span-2">
                        <Input
                            label="Residential Address"
                            placeholder="123 Street Name, City"
                            leftIcon={<FiMapPin />}
                            value={formData.address}
                            onChange={e => handleChange("address", e.target.value)}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Blood Group</label>
                        <select
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                            value={formData.bloodGroup}
                            onChange={e => handleChange("bloodGroup", e.target.value)}
                        >
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>O+</option>
                            <option>O-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Gender</label>
                        <div className="flex gap-4">
                            {["Male", "Female", "Other"].map(g => (
                                <label
                                    key={g}
                                    className={`flex-1 flex items-center justify-center p-3 border rounded-2xl cursor-pointer transition-all ${formData.gender === g
                                            ? "bg-primary/5 border-primary"
                                            : "bg-slate-50 border-slate-100 hover:bg-white hover:border-primary"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="gender"
                                        className="hidden"
                                        checked={formData.gender === g}
                                        onChange={() => handleChange("gender", g)}
                                    />
                                    <span className={`text-xs font-bold ${formData.gender === g ? "text-primary" : "text-slate-600"}`}>{g}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} type="button" disabled={loading}>Cancel</Button>
                    <Button type="submit" isLoading={loading}>
                        {isEditMode ? "Update" : "Confirm Registration"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddPatientModal;

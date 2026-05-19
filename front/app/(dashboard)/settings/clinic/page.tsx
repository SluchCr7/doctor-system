"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import {
    FiGlobe, FiMapPin, FiMail, FiPhone, FiCamera,
    FiInfo, FiCheckCircle, FiHash, FiHome, FiActivity, FiAward, FiBook
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ClinicInfoSettings = () => {
    const { user, updateProfile, uploadClinicImage } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string,string>>({});

    const [form, setForm] = useState({
        clinicName: "",
        clinicAddress: "",
        clinicPhone: "",
        clinicEmail: "",
        registrationNo: "",
        taxId: "",
        website: "",
        city: "",
        country: "United States",
        zipCode: "",
        emergencyLine: "",
        type: "Outpatient Specialist Clinic",
        consultationFee: 0,
        specialization: "",
        experienceYears: 0,
        qualifications: "",
    });

    useEffect(() => {
        if (user?.profileData) {
            setForm({
                clinicName: user.profileData.clinicName || "",
                clinicAddress: user.profileData.clinicAddress || "",
                clinicPhone: user.profileData.clinicPhone || "",
                clinicEmail: user.profileData.clinicEmail || "",
                registrationNo: user.profileData.registrationNo || "",
                taxId: user.profileData.taxId || "",
                website: user.profileData.website || "",
                city: user.profileData.city || "",
                country: user.profileData.country || "United States",
                zipCode: user.profileData.zipCode || "",
                emergencyLine: user.profileData.emergencyLine || "",
                type: user.profileData.type || "Outpatient Specialist Clinic",
                consultationFee: user.profileData.consultationFee || 0,
                specialization: user.profileData.specialization || "",
                experienceYears: user.profileData.experience || 0, // Matched with User model
                qualifications: user.profileData.qualifications || "",
            });
        }
    }, [user]);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: (name === "consultationFee" || name === "experienceYears") ? Number(value) : value }));
    };

    const save = async () => {
        setErrors({});
        // Basic client-side validation
        const newErrors: Record<string,string> = {};
        if (!form.clinicName || form.clinicName.trim().length < 2) newErrors.clinicName = 'Clinic name is required';
        if (form.clinicEmail && !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.clinicEmail)) newErrors.clinicEmail = 'Invalid email address';

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        try {
            setSaving(true);
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    ...form,
                    experience: form.experienceYears // Ensure naming consistency
                }
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error: any) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            await uploadClinicImage(file);
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const Field = ({ label, name, type = "text", icon: Icon, placeholder = "" }: { label: string; name: string; type?: string; icon?: any; placeholder?: string }) => (
        <div className="group space-y-1.5 w-full">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 group-focus-within:text-primary transition-colors">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none group-focus-within:text-primary transition-colors" />}
                <input
                    type={type}
                    name={name}
                    value={(form as any)[name]}
                    onChange={handle}
                    placeholder={placeholder}
                    className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm group-hover:bg-white`}
                />
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Professional Header Section */}
            <div className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/10 via-blue-500/5 to-transparent pointer-events-none" />

                <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="relative group/photo">
                        <div className="w-40 h-40 rounded-[2rem] bg-slate-100 border-4 border-white shadow-xl shadow-slate-200 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover/photo:scale-[1.02] relative">
                            {user?.profileData?.clinicImage && !user.profileData.clinicImage.includes("default") ? (
                                <img
                                    src={user.profileData.clinicImage}
                                    alt="Clinic"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <HiOutlineBuildingOffice2 className="w-16 h-16 text-slate-300" />
                            )}

                            {isUploading && (
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-600 shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110 active:scale-95 group-hover/photo:translate-y-[-4px]"
                            title="Change Clinic Photo"
                        >
                            <FiCamera className="w-5 h-5" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left pt-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest mb-4">
                            <FiActivity className="w-3 h-3" /> Practice Settings
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                            {form.clinicName || "Professional Clinic Profile"}
                        </h1>
                        <p className="text-slate-500 font-medium mb-6 flex items-center justify-center md:justify-start gap-2 italic">
                            <FiMapPin className="text-primary w-4 h-4" />
                            {form.city || "Clinic Location"}, {form.country}
                        </p>
                    </div>
                </div>

                <div className="px-8 pb-8 md:px-12 md:pb-12 space-y-12">
                    {/* General Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><FiAward className="w-4 h-4" /></span>
                                    Professional Credentials
                                </h3>
                                <div className="space-y-6">
                                    <Field label="Medical Specialization" name="specialization" icon={FiActivity} placeholder="e.g. Cardiologist" />
                                    <Field label="Clinical Experience (Years)" name="experienceYears" type="number" icon={FiHash} placeholder="10" />
                                    <div className="group space-y-1.5 w-full">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Academic Qualifications</label>
                                        <div className="relative">
                                            <FiBook className="absolute left-4 top-4 text-slate-400 w-4 h-4 pointer-events-none group-focus-within:text-primary transition-colors" />
                                            <textarea
                                                name="qualifications"
                                                value={form.qualifications}
                                                onChange={handle}
                                                rows={3}
                                                placeholder="e.g. MD, PhD in Cardiology"
                                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                    <Field label="Standard Consultation Fee ($)" name="consultationFee" type="number" icon={FiActivity} placeholder="75" />
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-10">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center"><FiHome className="w-4 h-4" /></span>
                                    Clinic Identity
                                </h3>
                                <div className="space-y-6">
                                    <Field label="Clinic Professional Name" name="clinicName" icon={HiOutlineBuildingOffice2} placeholder="e.g. Grand Central Medical Center" />
                                    <Field label="Registration Certificate #" name="registrationNo" icon={FiHash} placeholder="MC-2024-XXXX" />
                                    <Field label="National Provider / Tax ID" name="taxId" icon={FiInfo} placeholder="TIN-XXX-XXX" />
                                    <div className="group space-y-1.5 w-full">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Facility Classification</label>
                                        <select name="type" value={form.type} onChange={handle}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all group-hover:bg-white cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2394a3b8%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat">
                                            <option>Outpatient Specialist Clinic</option>
                                            <option>General Practice</option>
                                            <option>Surgical Center</option>
                                            <option>Diagnostic Center</option>
                                            <option>Rehabilitation Clinic</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <FiPhone className="w-4 h-4 text-primary" /> Practice Reachability
                                </h3>
                                <div className="space-y-6">
                                    <Field label="Official Support Email" name="clinicEmail" type="email" icon={FiMail} />
                                    <Field label="Reception Phone Line" name="clinicPhone" icon={FiPhone} />
                                    <Field label="Emergency Line" name="emergencyLine" icon={FiPhone} />
                                    <Field label="Digital Practice Hub (URL)" name="website" icon={FiGlobe} placeholder="www.yourclinic.com" />
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <FiMapPin className="w-4 h-4 text-primary" /> Physical Presence
                                </h3>
                                <div className="space-y-6">
                                    <div className="group space-y-1.5 w-full">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Street Address</label>
                                        <textarea
                                            name="clinicAddress"
                                            value={form.clinicAddress}
                                            onChange={handle}
                                            rows={3}
                                            placeholder="Suite 500, Wellness Building..."
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none group-hover:bg-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="City" name="city" placeholder="New York" />
                                        <Field label="ZIP" name="zipCode" placeholder="10001" />
                                    </div>
                                    <Field label="Country" name="country" placeholder="United States" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-100">
                        <AnimatePresence>
                            {saved && (
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center gap-2.5 text-emerald-600 text-sm font-black italic"
                                >
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <FiCheckCircle className="w-3.5 h-3.5" />
                                    </div>
                                    Synchronized with Practice Records
                                </motion.span>
                            )}
                        </AnimatePresence>

                        <div className={`flex items-center gap-4 ${saved ? "" : "ml-auto"}`}>
                            <button className="px-6 py-3.5 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
                                Discard
                            </button>
                            <Button
                                onClick={save}
                                disabled={saving}
                                className="px-10 py-3.5 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                Commmit Practice Data
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicInfoSettings;


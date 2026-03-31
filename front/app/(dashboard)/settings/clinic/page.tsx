"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import {
    FiGlobe, FiMapPin, FiMail, FiPhone, FiCamera,
    FiInfo, FiCheckCircle, FiHash, FiHome
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const ClinicInfoSettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.clinicInfo || {};

    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        clinicName: initData.clinicName || "MediCare Specialist Clinic",
        registrationNo: initData.registrationNo || "MC-2024-00847",
        taxId: initData.taxId || "TIN-447-882-100",
        website: initData.website || "www.medicare-clinic.com",
        address: initData.address || "12 Crystal Tower, Healthcare District, New York, NY 10001",
        city: initData.city || "New York",
        country: initData.country || "United States",
        zipCode: initData.zipCode || "10001",
        email: initData.email || "info@medicare-clinic.com",
        emergencyLine: initData.emergencyLine || "+1 (800) 555-0199",
        phone: initData.phone || "+1 (212) 555-0145",
        bio: initData.bio || "A leading multi-specialty outpatient clinic providing evidence-based care with a patient-first philosophy since 2014.",
        type: initData.type || "Outpatient Specialist Clinic",
        beds: initData.beds || "0",
        staffCount: initData.staffCount || "12",
    });

    useEffect(() => {
        if (user?.profileData?.clinicInfo) {
            setForm(prev => ({ ...prev, ...user.profileData.clinicInfo }));
        }
    }, [user]);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    clinicInfo: form
                }
            });
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            console.error(error);
        }
    };

    const Field = ({ label, name, type = "text", icon: Icon, placeholder = "" }: { label: string; name: string; type?: string; icon?: any; placeholder?: string }) => (
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />}
                <input
                    type={type}
                    name={name}
                    value={(form as any)[name]}
                    onChange={handle}
                    placeholder={placeholder}
                    className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all`}
                />
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Identity Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 flex items-center gap-5">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-white">
                            <HiOutlineBuildingOffice2 className="w-10 h-10" />
                        </div>
                        <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform">
                            <FiCamera className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white">{form.clinicName}</h2>
                        <p className="text-slate-400 text-sm">{form.type}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-wider">● Verified</span>
                            <span className="text-slate-500 text-xs font-medium">Reg. {form.registrationNo}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <FiHome className="w-3.5 h-3.5" /> Clinic Identity
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field label="Clinic Name" name="clinicName" icon={HiOutlineBuildingOffice2} />
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Clinic Type</label>
                                <select name="type" value={form.type} onChange={handle}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                                    <option>Outpatient Specialist Clinic</option>
                                    <option>General Practice</option>
                                    <option>Surgical Center</option>
                                    <option>Diagnostic Center</option>
                                    <option>Rehabilitation Clinic</option>
                                    <option>Mental Health Center</option>
                                    <option>Pediatric Clinic</option>
                                    <option>Dental Clinic</option>
                                </select>
                            </div>
                            <Field label="Registration Number" name="registrationNo" icon={FiHash} />
                            <Field label="Tax ID / NPI Number" name="taxId" icon={FiInfo} />
                        </div>
                    </div>

                    <div className="border-t border-slate-50 pt-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <FiMapPin className="w-3.5 h-3.5" /> Location & Address
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <Field label="Street Address" name="address" icon={FiMapPin} />
                            </div>
                            <Field label="City" name="city" />
                            <Field label="ZIP Code" name="zipCode" />
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Country</label>
                                <select name="country" value={form.country} onChange={handle}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>Canada</option>
                                    <option>Australia</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                    <option>UAE</option>
                                    <option>Saudi Arabia</option>
                                </select>
                            </div>
                            <Field label="Official Website" name="website" icon={FiGlobe} />
                        </div>
                    </div>

                    <div className="border-t border-slate-50 pt-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <FiPhone className="w-3.5 h-3.5" /> Contact Channels
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field label="Primary Email" name="email" type="email" icon={FiMail} />
                            <Field label="Main Phone Number" name="phone" icon={FiPhone} />
                            <Field label="Emergency / Hotline" name="emergencyLine" icon={FiPhone} />
                        </div>
                    </div>

                    <div className="border-t border-slate-50 pt-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">About the Clinic</h3>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handle}
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all resize-none"
                        />
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                        {saved && (
                            <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                                <FiCheckCircle className="w-4 h-4" /> Changes saved successfully
                            </span>
                        )}
                        <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                            <Button variant="outline">Discard</Button>
                            <Button onClick={save}>Save Clinic Info</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicInfoSettings;

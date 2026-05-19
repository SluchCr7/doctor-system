"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import {
    FiUser, FiMail, FiPhone, FiAward, FiBookOpen,
    FiCamera, FiCheckCircle, FiLinkedin, FiGlobe,
    FiPlus, FiX, FiStar
} from "react-icons/fi";
import { HiOutlineAcademicCap, HiOutlineIdentification } from "react-icons/hi2";

const specialties = [
    "Cardiology", "Dermatology", "Endocrinology", "Gastroenterology", "General Practice",
    "Gynecology", "Hematology", "Infectious Disease", "Internal Medicine", "Nephrology",
    "Neurology", "Oncology", "Ophthalmology", "Orthopedics", "Pediatrics", "Psychiatry",
    "Pulmonology", "Radiology", "Rheumatology", "Surgery - General", "Surgery - Cardiothoracic",
    "Urology"
];

interface FieldProps {
    label: string;
    name: string;
    type?: string;
    icon?: React.ComponentType<any>;
    half?: boolean;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ label, name, type = "text", icon: Icon, half = false, value, onChange }) => (
    <div className={`space-y-1.5 ${half ? "" : ""}`}>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />}
            <input type={type} name={name} value={value} onChange={onChange}
                className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all`}
            />
        </div>
    </div>
);

const DoctorProfileSettings = () => {
    const { user, updateProfile, uploadProfileImage } = useAuth();
    const initData = (user?.profileData?.doctorProfile || {}) as Record<string, any>;

    const [saved, setSaved] = useState(false);
    const [newLang, setNewLang] = useState("");
    const [form, setForm] = useState({
        name: user?.name || "Dr. Alexander Hayes",
        title: initData.title || "MD, PhD, FACC",
        specialty: initData.specialty || "Cardiology",
        subSpecialty: initData.subSpecialty || "Interventional Cardiology",
        licenseNumber: initData.licenseNumber || "NY-MED-2024-004892",
        npiNumber: initData.npiNumber || "1234567890",
        yearsExperience: initData.yearsExperience || "14",
        email: user?.email || "dr.hayes@medicare-clinic.com",
        phone: initData.phone || "+1 (212) 555-0145",
        linkedin: initData.linkedin || "linkedin.com/in/dr-hayes",
        website: initData.website || "drhayes.com",
        bio: initData.bio || "Board-certified cardiologist with 14 years of experience in interventional cardiology. Published researcher with 42 peer-reviewed papers in top cardiovascular journals. Trained at Johns Hopkins and Mayo Clinic.",
        education: initData.education || "MD – Johns Hopkins University (2008), PhD – Harvard Medical School (2012)",
        certifications: initData.certifications || "FACC – Fellow, American College of Cardiology | FSCAI – Society for Cardiovascular Angiography",
        consultFee: initData.consultFee || "350",
        followUpFee: initData.followUpFee || "180",
        languages: initData.languages || ["English", "French", "Arabic"],
    });

    // Form updates will be handled on save, not on user changes

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const addLang = () => {
        if (newLang.trim() && !form.languages.includes(newLang.trim())) {
            setForm(f => ({ ...f, languages: [...f.languages, newLang.trim()] }));
            setNewLang("");
        }
    };

    const removeLang = (l: string) =>
        setForm(f => ({ ...f, languages: (f.languages as string[]).filter((x: string) => x !== l) }));

    const save = async () => { 
        try {
            await updateProfile({
                name: form.name,
                profileData: {
                    phone: form.phone || undefined,
                    specialization: form.specialty || undefined,
                    qualifications: form.title || undefined,
                    experience: parseInt(form.yearsExperience) || undefined,
                    bio: form.bio || undefined,
                    languages: form.languages || [],
                    clinicName: user?.profileData?.clinicName,
                    clinicAddress: user?.profileData?.clinicAddress,
                    clinicPhone: user?.profileData?.clinicPhone,
                    clinicEmail: user?.profileData?.clinicEmail,
                    clinicImage: user?.profileData?.clinicImage,
                    consultationFee: parseInt(form.consultFee) || undefined,
                    // Keep doctor-specific nested data for display purposes only
                    doctorProfile: form
                }
            });
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="relative h-28 bg-gradient-to-br from-primary/80 via-sky-500 to-secondary">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
                </div>
                <div className="px-8 pb-6">
                    <div className="flex flex-col sm:flex-row gap-5 -mt-12 items-start sm:items-end mb-6">
                        <div className="relative">
                            {user?.profileImage ? (
                                <img src={user.profileImage.startsWith('http') ? user.profileImage : `http://localhost:5000${user.profileImage}`} alt="Profile" className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl object-cover" />
                            ) : (
                                <div className="w-24 h-24 rounded-2xl border-4 border-white bg-gradient-to-br from-primary to-secondary shadow-xl flex items-center justify-center text-4xl font-black text-white">
                                    {form.name.charAt(0) || "D"}
                                </div>
                            )}
                            <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform cursor-pointer">
                                <FiCamera className="w-4 h-4" />
                                <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                    if (e.target.files?.[0]) await uploadProfileImage(e.target.files[0]);
                                }} />
                            </label>
                        </div>
                        <div className="flex-1 pb-1">
                            <h2 className="text-2xl font-black text-slate-800">{form.name}</h2>
                            <p className="text-primary font-bold text-sm">{form.specialty} · {form.title}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                                <FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                <span className="text-xs font-bold text-slate-500">4.9 · 387 patient reviews</span>
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-100">VERIFIED DOCTOR</span>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" leftIcon={<FiGlobe className="w-3.5 h-3.5" />}>
                            Preview Public Profile
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Full Name" name="name" icon={FiUser} value={form.name} onChange={handle} />
                        <Field label="Professional Title / Degrees" name="title" icon={HiOutlineAcademicCap} value={form.title} onChange={handle} />
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Specialty</label>
                            <select name="specialty" value={form.specialty} onChange={handle}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                                {specialties.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <Field label="Sub-Specialty / Focus Area" name="subSpecialty" icon={FiAward} value={form.subSpecialty} onChange={handle} />
                        <Field label="Years of Experience" name="yearsExperience" type="number" value={form.yearsExperience} onChange={handle} />
                        <Field label="Consultation Fee (USD)" name="consultFee" type="number" value={form.consultFee} onChange={handle} />
                    </div>
                </div>
            </div>

            {/* Credentials */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-5 flex items-center gap-2">
                    <HiOutlineIdentification className="w-4 h-4 text-primary" /> License & Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Medical License Number" name="licenseNumber" icon={FiBookOpen} value={form.licenseNumber} onChange={handle} />
                    <Field label="NPI Number" name="npiNumber" icon={FiBookOpen} value={form.npiNumber} onChange={handle} />
                    <div className="md:col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Education & Training</label>
                        <textarea name="education" value={form.education} onChange={handle} rows={2}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all resize-none" />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Board Certifications</label>
                        <textarea name="certifications" value={form.certifications} onChange={handle} rows={2}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all resize-none" />
                    </div>
                </div>
            </div>

            {/* Contact & Online Presence */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-5 flex items-center gap-2">
                    <FiMail className="w-4 h-4 text-primary" /> Contact & Online Presence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Professional Email" name="email" type="email" icon={FiMail} value={form.email} onChange={handle} />
                    <Field label="Direct Phone" name="phone" icon={FiPhone} value={form.phone} onChange={handle} />
                    <Field label="LinkedIn Profile" name="linkedin" icon={FiLinkedin} value={form.linkedin} onChange={handle} />
                    <Field label="Personal Website" name="website" icon={FiGlobe} value={form.website} onChange={handle} />
                    <div className="md:col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professional Bio</label>
                        <textarea name="bio" value={form.bio} onChange={handle} rows={4}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all resize-none" />
                    </div>
                </div>

                {/* Languages */}
                <div className="mt-5 space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Languages Spoken</label>
                    <div className="flex flex-wrap gap-2">
                        {(form.languages as string[]).map((l: string) => (
                            <span key={l} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/10 text-primary text-xs font-bold rounded-full">
                                {l}
                                <button onClick={() => removeLang(l)} className="hover:text-red-500 transition-colors">
                                    <FiX className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                        <div className="flex gap-2">
                            <input
                                value={newLang}
                                onChange={e => setNewLang(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && addLang()}
                                placeholder="Add language…"
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all w-36"
                            />
                            <button onClick={addLang} className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                <FiPlus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save */}
            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Doctor profile saved successfully
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="outline">Discard Changes</Button>
                    <Button onClick={save}>Save Doctor Profile</Button>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfileSettings;

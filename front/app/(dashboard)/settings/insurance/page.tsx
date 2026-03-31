"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiEye, FiCheckCircle, FiShield, FiDownload } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";

const InsurancePrivacySettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.insurance || {};
    const initPrivacy = user?.profileData?.privacy || {};

    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        provider: initData.provider || "BlueCross BlueShield",
        policyNumber: initData.policyNumber || "BCB-2024-00847123",
        groupNumber: initData.groupNumber || "GRP-44921",
        memberSince: initData.memberSince || "2022-01-01",
        coverageType: initData.coverageType || "PPO – Family",
        copay: initData.copay || "30",
        deductible: initData.deductible || "1500",
        holderName: initData.holderName || "Emily Carter",
        holderRelation: initData.holderRelation || "Self",
        holderDob: initData.holderDob || "1990-04-15",
        secondaryProvider: initData.secondaryProvider || "",
        secondaryPolicy: initData.secondaryPolicy || "",
    });

    const [privacySettings, setPrivacySettings] = useState({
        shareWithPrimaryDoctor: initPrivacy.shareWithPrimaryDoctor ?? true,
        shareWithSpecialists: initPrivacy.shareWithSpecialists ?? true,
        shareWithPharmacy: initPrivacy.shareWithPharmacy ?? true,
        allowResearch: initPrivacy.allowResearch ?? false,
        allowMarketing: initPrivacy.allowMarketing ?? false,
        hipaaConsent: initPrivacy.hipaaConsent ?? true,
        dataRetention: initPrivacy.dataRetention || "7years",
    });

    useEffect(() => {
        if (user?.profileData?.insurance) setForm(prev => ({ ...prev, ...user.profileData.insurance }));
        if (user?.profileData?.privacy) setPrivacySettings(prev => ({ ...prev, ...user.profileData.privacy }));
    }, [user]);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const togglePrivacy = (key: string) =>
        setPrivacySettings(p => ({ ...p, [key]: !(p as any)[key] }));

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    insurance: form,
                    privacy: privacySettings,
                }
            });
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            console.error(error);
        }
    };

    const Field = ({ label, name, type = "text", placeholder = "" }: { label: string; name: string; type?: string; placeholder?: string }) => (
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
            <input type={type} name={name} value={(form as any)[name]} onChange={handle} placeholder={placeholder}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
        </div>
    );

    const Toggle = ({ label, desc, key }: { label: string; desc: string; key: string }) => (
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
                <p className="text-sm font-bold text-slate-800">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </div>
            <button onClick={() => togglePrivacy(key)}
                className={`w-12 h-6 rounded-full relative transition-all shrink-0 ml-4 ${(privacySettings as any)[key] ? "bg-primary shadow-md shadow-primary/20" : "bg-slate-200"}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${(privacySettings as any)[key] ? "left-7" : "left-1"}`} />
            </button>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Insurance Card Visual */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-primary to-sky-500 rounded-2xl p-6 text-white shadow-xl">
                <div className="absolute right-0 bottom-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
                <div className="absolute left-0 top-0 w-24 h-24 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="relative">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Health Insurance</p>
                            <h3 className="text-xl font-black mt-1">{form.provider}</h3>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <FiShield className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-white/50 text-[10px] font-bold uppercase">Policy No.</p>
                            <p className="font-black text-base mt-0.5">{form.policyNumber || "—"}</p>
                        </div>
                        <div>
                            <p className="text-white/50 text-[10px] font-bold uppercase">Group No.</p>
                            <p className="font-black text-base mt-0.5">{form.groupNumber || "—"}</p>
                        </div>
                        <div>
                            <p className="text-white/50 text-[10px] font-bold uppercase">Coverage</p>
                            <p className="font-black text-base mt-0.5">{form.coverageType}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <p className="text-white/50 text-[10px] font-bold uppercase">Member</p>
                            <p className="font-bold">{form.holderName}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-white/50 text-[10px] font-bold uppercase">Since</p>
                            <p className="font-bold">{form.memberSince}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Insurance Details */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-5 flex items-center gap-2">
                    <HiOutlineDocumentText className="w-4 h-4 text-primary" /> Primary Insurance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Insurance Provider</label>
                        <select name="provider" value={form.provider} onChange={handle}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            {["BlueCross BlueShield", "Aetna", "Cigna", "United Healthcare", "Humana", "Kaiser Permanente", "Anthem", "Centene", "Molina Healthcare", "Medicare", "Medicaid", "Other"].map(p => <option key={p}>{p}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Coverage Type</label>
                        <select name="coverageType" value={form.coverageType} onChange={handle}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            {["HMO – Individual", "HMO – Family", "PPO – Individual", "PPO – Family", "EPO – Individual", "EPO – Family", "HDHP + HSA"].map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <Field label="Policy Number" name="policyNumber" />
                    <Field label="Group Number" name="groupNumber" />
                    <Field label="Member Since" name="memberSince" type="date" />
                    <Field label="Annual Deductible (USD)" name="deductible" />
                    <Field label="Co-Pay Amount (USD)" name="copay" />
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Policy Holder Relation</label>
                        <select name="holderRelation" value={form.holderRelation} onChange={handle}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                            {["Self", "Spouse", "Parent", "Guardian", "Other"].map(r => <option key={r}>{r}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Secondary Insurance (Optional)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Provider" name="secondaryProvider" placeholder="e.g. Medicare" />
                        <Field label="Policy Number" name="secondaryPolicy" placeholder="Optional secondary policy" />
                    </div>
                </div>
            </div>

            {/* Privacy & Data Consent */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-1 flex items-center gap-2">
                    <FiEye className="w-4 h-4 text-primary" /> Privacy & Data Consent
                </h3>
                <p className="text-xs text-slate-500 mb-5">Control how your health data is accessed and shared</p>
                <div className="space-y-2">
                    <Toggle label="Share with Primary Doctor" desc="Allow your GP to view full medical history" key="shareWithPrimaryDoctor" />
                    <Toggle label="Share with Referred Specialists" desc="Automatically share records with consultation specialists" key="shareWithSpecialists" />
                    <Toggle label="Share with Pharmacy" desc="Allow prescription data to be sent to connected pharmacies" key="shareWithPharmacy" />
                    <Toggle label="Contribute to Medical Research (Anonymized)" desc="Help improve healthcare outcomes through anonymized data sharing" key="allowResearch" />
                    <Toggle label="Allow Marketing Communications" desc="Receive health tips, offers and wellness newsletters" key="allowMarketing" />
                </div>

                <div className="mt-5 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3">
                    <FiShield className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-emerald-800">HIPAA Compliance Notice</p>
                        <p className="text-xs text-emerald-700 mt-1">Your health information is protected under HIPAA. We never sell personal health data. You can request a full data report or deletion at any time.</p>
                        <button className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors">
                            <FiDownload className="w-3.5 h-3.5" /> Download My Data Report
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Insurance & privacy settings saved
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="outline">Discard</Button>
                    <Button onClick={save}>Save Settings</Button>
                </div>
            </div>
        </div>
    );
};

export default InsurancePrivacySettings;

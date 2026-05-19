"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FiHeart, FiPlus, FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiPhone } from "react-icons/fi";
import { HiOutlineBeaker, HiOutlineExclamationTriangle, HiOutlineDocumentText } from "react-icons/hi2";
import medicalService from "@/services/medicalService";
import toast from "react-hot-toast";

const commonConditions = ["Diabetes Type 2", "Hypertension", "Asthma", "Hypothyroidism", "Arthritis", "Anxiety Disorder"];
const commonAllergies = ["Penicillin", "Aspirin", "Sulfa Drugs", "Latex", "Peanuts", "Shellfish", "Bee Stings"];

const MedicalRecordsPage = () => {
    const { user, updateProfile } = useAuth();
    const isPatient = user?.role === "patient";
    
    // Patient self-filled data
    const [age, setAge] = useState(user?.profileData?.age || '');
    const [dob, setDob] = useState(user?.profileData?.dob ? user.profileData.dob.split('T')[0] : '');
    const [bloodType, setBloodType] = useState(user?.profileData?.bloodType || '');
    const [insurance, setInsurance] = useState(user?.profileData?.insuranceProvider || '');
    const [emergency, setEmergency] = useState({
        name: user?.profileData?.emergencyContact?.name || '',
        phone: user?.profileData?.emergencyContact?.phone || '',
        relation: user?.profileData?.emergencyContact?.relation || ''
    });

    const [conditions, setConditions] = useState<string[]>(user?.profileData?.medicalHistory?.conditions || []);
    const [allergies, setAllergies] = useState<string[]>(user?.profileData?.medicalHistory?.allergies || []);
    const [meds, setMeds] = useState<string[]>(user?.profileData?.medicalHistory?.medications || []);
    
    // Official Medical Records from Backend
    const [officialRecords, setOfficialRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (user?.profileData) {
            setAge(user.profileData.age || '');
            setDob(user.profileData.dob ? user.profileData.dob.split('T')[0] : '');
            setBloodType(user.profileData.bloodType || '');
            setInsurance(user.profileData.insuranceProvider || '');
            setEmergency({
                name: user.profileData.emergencyContact?.name || '',
                phone: user.profileData.emergencyContact?.phone || '',
                relation: user.profileData.emergencyContact?.relation || ''
            });
            setConditions(user.profileData.medicalHistory?.conditions || []);
            setAllergies(user.profileData.medicalHistory?.allergies || []);
            setMeds(user.profileData.medicalHistory?.medications || []);
        }
    }, [user]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await medicalService.getRecords();
                if (res.data.success) {
                    setOfficialRecords(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch official medical records");
            } finally {
                setLoading(false);
            }
        };
        fetchRecords();
    }, []);

    const saveSelfFilled = async () => {
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    age: age ? Number(age) : undefined,
                    dob: dob || undefined,
                    bloodType,
                    insuranceProvider: insurance,
                    emergencyContact: emergency,
                    medicalHistory: {
                        ...user?.profileData?.medicalHistory,
                        conditions,
                        allergies,
                        medications: meds
                    }
                }
            });
            setSaved(true);
            toast.success("Health profile updated");
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            toast.error("Failed to save changes");
        }
    };

    const addItem = (list: string[], setter: (v: string[]) => void, item: string) => {
        if (item.trim() && !list.includes(item.trim())) {
            setter([...list, item.trim()]);
        }
    };

    const removeItem = (list: string[], setter: (v: string[]) => void, item: string) => {
        setter(list.filter(i => i !== item));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-premium">
                 <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                 <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <Badge className="bg-white/20 text-white border-0 mb-4 px-3 py-1 font-bold">Confidential Records</Badge>
                        <h1 className="text-3xl font-black">{isPatient ? "My Health Dashboard" : "Practitioner Medical Log"}</h1>
                        <p className="text-emerald-50/80 text-sm mt-2 max-w-lg">Manage your chronic conditions, allergies, and view official medical diagnosis from your doctor.</p>
                    </div>
                    <div className="hidden lg:block">
                        <HiOutlineDocumentText size={120} className="opacity-10" />
                    </div>
                 </div>
            </div>

            {/* Official Medical Records Section */}
            <Card className="border-0 shadow-card rounded-[2rem] overflow-hidden bg-white">
                <CardHeader className="flex flex-row items-center justify-between mx-6 px-0 py-6 border-b border-slate-50">
                    <div>
                        <CardTitle className="text-xl font-bold text-slate-800">Physician Journals</CardTitle>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Official Clinical Records</p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <HiOutlineDocumentText size={20} />
                    </div>
                </CardHeader>
                <div className="divide-y divide-slate-50">
                    {officialRecords.length > 0 ? (
                        officialRecords.map(record => (
                            <div key={record._id} className="p-8 hover:bg-slate-50/50 transition-all cursor-pointer group relative">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                                        <FiHeart size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{record.title || "Clinical Evaluation"}</h4>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(record.date).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4">{record.diagnosis}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {record.prescription?.split(',').map((p: any) => (
                                                <Badge key={p} variant="neutral" className="bg-slate-100 text-slate-600 border-0 font-bold px-3">{p.trim()}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute right-8 bottom-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Signed By Dr. {record.doctorId?.name}</div>
                            </div>
                        ))
                    ) : (
                        <div className="p-20 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <FiInfo size={32} />
                            </div>
                            <p className="text-slate-400 font-bold italic">No official clinical records found in your directory.</p>
                        </div>
                    )}
                </div>
            </Card>

            {/* Health Identity & Emergency */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Basic Health Info */}
                <Card className="border-0 shadow-card p-8 rounded-[2.5rem] bg-white ring-1 ring-slate-100 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
                            <FiInfo className="text-primary" /> Health Identity
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mb-6 uppercase tracking-widest">Base Medical Stats</p>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Age</label>
                                    <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Blood Type</label>
                                    <select value={bloodType} onChange={e => setBloodType(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer">
                                        <option value="">N/A</option>
                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => <option key={bt} value={bt}>{bt}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Date of Birth</label>
                                <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Insurance Provider</label>
                                <input value={insurance} onChange={e => setInsurance(e.target.value)} placeholder="e.g. BlueCross BlueShield" className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Emergency Contact */}
                <Card className="lg:col-span-2 border-0 shadow-card p-8 rounded-[2.5rem] bg-white ring-1 ring-slate-100">
                    <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
                        <HiOutlineExclamationTriangle className="text-orange-500" /> Emergency Contact
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mb-6 uppercase tracking-widest">In case of clinical urgencies</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Contact Full Name</label>
                                <input value={emergency.name} onChange={e => setEmergency({...emergency, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Relationship</label>
                                <input value={emergency.relation} onChange={e => setEmergency({...emergency, relation: e.target.value})} placeholder="Spouse, Parent, etc." className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Direct Phone Line</label>
                                <div className="relative group">
                                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={14} />
                                    <input value={emergency.phone} onChange={e => setEmergency({...emergency, phone: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                                </div>
                            </div>
                            <div className="bg-emerald-50 rounded-2xl p-4 flex items-start gap-3">
                                <FiCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                                <p className="text-[11px] font-bold text-emerald-700 leading-relaxed">
                                    Keeping an emergency contact updated ensures our clinical staff can react quickly during unforeseen medical events.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Self-Filled Health Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chronic Conditions */}
                <Card className="border-0 shadow-card p-8 rounded-[2.5rem] bg-white ring-1 ring-slate-100">
                    <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
                        <FiHeart className="text-red-500" /> Chronic Conditions
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mb-6 uppercase tracking-widest">Ongoing Diagnoses & Symptoms</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {conditions.map(c => (
                            <span key={c} className="px-4 py-2 bg-red-50 text-red-600 text-xs font-black rounded-full border border-red-100 flex items-center gap-2">
                                {c}
                                <button onClick={() => removeItem(conditions, setConditions, c)} className="hover:text-red-800"><FiX /></button>
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {commonConditions.filter(c => !conditions.includes(c)).map(c => (
                            <button key={c} onClick={() => addItem(conditions, setConditions, c)} className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-full hover:bg-slate-100 hover:text-red-500 transition-colors uppercase">+ {c}</button>
                        ))}
                    </div>
                </Card>

                {/* Allergies */}
                <Card className="border-0 shadow-card p-8 rounded-[2.5rem] bg-white ring-1 ring-slate-100">
                    <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
                        <FiAlertCircle className="text-amber-500" /> Critical Allergies
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mb-6 uppercase tracking-widest">Drugs, Foods & Environment</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {allergies.map(a => (
                            <span key={a} className="px-4 py-2 bg-amber-50 text-amber-600 text-xs font-black rounded-full border border-amber-100 flex items-center gap-2">
                                {a}
                                <button onClick={() => removeItem(allergies, setAllergies, a)} className="hover:text-amber-800"><FiX /></button>
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {commonAllergies.filter(a => !allergies.includes(a)).map(a => (
                            <button key={a} onClick={() => addItem(allergies, setAllergies, a)} className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-full hover:bg-slate-100 hover:text-amber-600 transition-colors uppercase">+ {a}</button>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                 <p className="text-xs font-bold text-slate-400 max-w-sm">This information is only visible to you and your assigned doctors. Keep it updated for better clinical assistance.</p>
                 <div className="flex gap-3">
                    <Button variant="ghost" className="font-bold text-slate-400">Discard Changes</Button>
                    <Button onClick={saveSelfFilled} className="font-black px-8" leftIcon={<FiHeart />}>Save Health Profile</Button>
                 </div>
            </div>
        </div>
    );
};

export default MedicalRecordsPage;

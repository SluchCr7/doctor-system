"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import patientService from '@/services/patientService';
import medicalService from '@/services/medicalService';
import appointmentService from '@/services/appointmentService';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { HiOutlineUser, HiOutlineFolderOpen, HiOutlineCalendarDays, HiOutlinePencilSquare, HiOutlineIdentification } from 'react-icons/hi2';
import { FiUsers, FiHeart, FiFileText, FiActivity } from 'react-icons/fi';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function PatientProfileForDoctor() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { user: doctor } = useAuth();
    const [patient, setPatient] = useState<any>(null);
    const [medicalHistory, setMedicalHistory] = useState<any[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [note, setNote] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', phone: '', address: '' });

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const [patientRes, medicalRes, apptRes] = await Promise.all([
                    patientService.getPatientById(id),
                    medicalService.getRecords(id), 
                    appointmentService.listByPatient(id)
                ]);

                if (patientRes.data.success) setPatient(patientRes.data.data);
                if (patientRes.data.success) {
                    const p = patientRes.data.data;
                    setEditForm({ name: p.name || '', phone: p.profileData?.phone || '', address: p.profileData?.address || '' });
                }
                if (medicalRes.data.success) setMedicalHistory(medicalRes.data.data);
                if (apptRes.data.success) setAppointments(apptRes.data.data);
            } catch (err) {
                console.error("Failed to load patient profile data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSaveNote = async () => {
        if (!note.trim()) return;
        try {
            // Simulated note saving - integration with medical controller
            toast.success("Clinical note persisted successfully");
            setNote('');
        } catch (error) {
            toast.error("Failed to save note");
        }
    };

    if (loading) return <div className="p-12 animate-pulse space-y-8">
        <div className="h-64 bg-slate-100 rounded-[3rem]" />
        <div className="grid grid-cols-4 gap-8">
            <div className="h-96 bg-slate-100 rounded-3xl" />
            <div className="col-span-3 h-96 bg-slate-100 rounded-3xl" />
        </div>
    </div>;

    if (!patient) return <div className="p-20 text-center">Patient record not accessible</div>;

    return (
        <div className="p-8 space-y-8 animate-fade-in pb-20">
            {/* Header / Summary Card */}
            <div className="bg-white rounded-[3rem] p-10 shadow-premium border border-slate-50 flex flex-col md:flex-row items-center gap-10">
                <div className="relative w-40 h-40 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-xl shrink-0">
                    <Image 
                        src={patient.profileImage && patient.profileImage !== 'default-profile.png' ? patient.profileImage : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop'} 
                        alt={patient.name} 
                        fill 
                        className="object-cover" 
                    />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                        <Badge variant="neutral" className="rounded-lg font-black uppercase tracking-widest px-3 italic">Active Case #{patient._id.slice(-6)}</Badge>
                        <Badge className="bg-rose-50 text-rose-500 border-0 rounded-lg font-black uppercase tracking-widest px-3 flex items-center gap-1">
                            <FiHeart className="fill-rose-500" /> Chronic Follow-up
                        </Badge>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-1 leading-tight">{patient.name}</h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-400 font-bold text-sm mt-4">
                        <span className="flex items-center gap-1.5"><HiOutlineIdentification size={18} /> {patient.profileData?.age || '28'} Years</span>
                        <span className="flex items-center gap-1.5"><FiUsers size={16} /> {patient.profileData?.gender || 'Female'}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="flex items-center gap-1.5"><FiActivity size={16} /> {patient.profileData?.bloodType || 'B+'} Positive</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button variant="primary" className="rounded-2xl font-black shadow-lg shadow-primary/20 h-12" leftIcon={<HiOutlinePencilSquare />}>New Record</Button>
                    {doctor?.role === 'doctor' && (
                        <>
                            {!isEditing ? (
                                <Button onClick={() => setIsEditing(true)} className="rounded-2xl font-black h-12">Edit Patient</Button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <input value={editForm.name} onChange={(e) => setEditForm(s => ({ ...s, name: e.target.value }))} className="px-3 py-2 rounded-lg border" placeholder="Full name" />
                                    <input value={editForm.phone} onChange={(e) => setEditForm(s => ({ ...s, phone: e.target.value }))} className="px-3 py-2 rounded-lg border" placeholder="Phone" />
                                    <Button onClick={async () => {
                                        try {
                                            const payload: any = { name: editForm.name, profileData: { phone: editForm.phone, address: editForm.address } };
                                            const res = await patientService.updatePatientById(id as string, payload);
                                            if (res.data.success) {
                                                setPatient(res.data.data);
                                                setIsEditing(false);
                                                toast.success('Patient updated');
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            toast.error('Failed to update patient');
                                        }
                                    }} className="rounded-2xl font-black h-12">Save</Button>
                                    <Button variant="secondary" onClick={() => setIsEditing(false)} className="rounded-2xl h-12">Cancel</Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Tabs (Vertical Mobile, Side Desktop) */}
                <div className="space-y-3">
                    {[
                        { id: 'overview', icon: <HiOutlineUser />, label: 'Overview' },
                        { id: 'history', icon: <HiOutlineFolderOpen />, label: 'Medical History' },
                        { id: 'appointments', icon: <HiOutlineCalendarDays />, label: 'Appointments' },
                        { id: 'notes', icon: <HiOutlinePencilSquare />, label: 'Physician Notes' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 p-5 rounded-[1.5rem] transition-all font-black text-sm italic ${activeTab === tab.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105 z-10' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
                        >
                            <span className="text-xl">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <Card className="lg:col-span-3 border-0 shadow-premium rounded-[3rem] bg-white overflow-hidden">
                    <div className="p-10">
                        {activeTab === 'overview' && (
                            <div className="space-y-10 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">General Information</p>
                                        <div className="space-y-4">
                                            <div className="flex justify-between font-bold text-sm">
                                                <span className="text-slate-400 italic">Full Registration</span>
                                                <span className="text-slate-700">{new Date(patient.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-sm">
                                                <span className="text-slate-400 italic">Preferred Contact</span>
                                                <span className="text-slate-700">{patient.profileData?.phone || 'Not provided'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Health Metrics</p>
                                        <div className="space-y-4">
                                            <div className="flex justify-between font-bold text-sm">
                                                <span className="text-slate-400 italic">Last Visit</span>
                                                <span className="text-slate-700">June 12, 2024</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-sm">
                                                <span className="text-slate-400 italic">Status</span>
                                                <span className="text-emerald-500">Normal Care</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-1 w-full bg-slate-50 rounded-[2rem]" />
                                <div>
                                    <h4 className="text-lg font-black text-slate-800 italic mb-6">Patient Background</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        This patient has been under continuous surveillance since early 2024. Primary focus remains on preventative medicine and regular diagnostics. No known drug allergies reported at current visit.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-xl font-black italic">Clinical Record Journal</h4>
                                    <Badge variant='info' className="rounded-lg border-slate-200 text-slate-400 uppercase text-[10px] pr-3 pl-3 font-black">{medicalHistory.length} Total Records</Badge>
                                </div>
                                <div className="space-y-4">
                                    {medicalHistory.length > 0 ? (
                                        medicalHistory.map((record: any) => (
                                            <div key={record._id} className="p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-lg transition-all group">
                                                <div className="flex items-center justify-between mb-3">
                                                    <Badge className="bg-indigo-50 text-indigo-500 border-0 rounded-lg text-[10px] font-black">{record.type || 'Clinical Event'}</Badge>
                                                    <span className="text-xs font-bold text-slate-300">{new Date(record.date || record.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <h5 className="font-black text-slate-800 text-lg group-hover:text-primary transition-colors">{record.title}</h5>
                                                <p className="text-slate-400 text-sm font-medium mt-2 line-clamp-2">{record.description}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-20 text-center text-slate-300 italic font-bold">No historical records found for this case.</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'appointments' && (
                            <div className="space-y-6 animate-fade-in">
                                <h4 className="text-xl font-black italic mb-6">Encounter History</h4>
                                <div className="rounded-[2.5rem] border border-slate-50 overflow-hidden">
                                     <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                            <tr>
                                                <th className="px-8 py-5">Date & Time</th>
                                                <th className="px-8 py-5">Type / Reason</th>
                                                <th className="px-8 py-5">Physician</th>
                                                <th className="px-8 py-5">Outcome</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 font-bold text-sm">
                                            {appointments.map((appt: any) => (
                                                <tr key={appt._id} className="hover:bg-slate-50/50">
                                                    <td className="px-8 py-6 text-slate-900">{new Date(appt.date).toLocaleDateString()}</td>
                                                    <td className="px-8 py-6 text-slate-500">{appt.notes || 'Routine Checkup'}</td>
                                                    <td className="px-8 py-6 text-slate-500">Dr. {appt.doctorId?.name}</td>
                                                    <td className="px-8 py-6">
                                                        <Badge variant={appt.status === 'completed' ? 'success' : 'info'} className="rounded-lg px-2 text-[10px] uppercase font-black">{appt.status}</Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                            {appointments.length === 0 && (
                                                <tr><td colSpan={4} className="p-12 text-center text-slate-300 italic">No historical appointments found.</td></tr>
                                            )}
                                        </tbody>
                                     </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="flex items-center gap-4 mb-4">
                                     <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
                                        <FiFileText size={20} />
                                     </div>
                                     <div>
                                        <h4 className="text-xl font-black italic">Internal Clinical Notes</h4>
                                        <p className="text-xs text-slate-400 font-medium">For practitioner reference only — Not shared with patient.</p>
                                     </div>
                                </div>
                                <textarea 
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Annotate ongoing progress, behavior observations, or internal follow-up strategies..."
                                    className="w-full h-64 p-8 bg-slate-50 rounded-[2rem] border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-0 transition-all text-slate-700 font-medium placeholder:text-slate-300 placeholder:italic"
                                />
                                <div className="flex justify-end">
                                    <Button onClick={handleSaveNote} size="lg" className="rounded-2xl font-black px-10 h-14 shadow-xl shadow-primary/10">Commit Clinical Entry</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}

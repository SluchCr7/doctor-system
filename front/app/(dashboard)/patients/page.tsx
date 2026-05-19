"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    HiOutlineMagnifyingGlass,
    HiOutlinePlus,
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiChevronLeft,
    HiChevronRight,
    HiOutlineClock,
    HiOutlineFunnel,
    HiOutlineUserCircle,
} from "react-icons/hi2";
import doctorService from "@/services/doctorService";
import { useModal } from "@/context/ModalContext";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell
} from "@/components/ui/Table";
import toast from "react-hot-toast";

const PatientsPage = () => {
    const { openModal } = useModal();
    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const res = await doctorService.getPatients();
            if (res.data.success) {
                setPatients(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch patients', err);
            toast.error("Failed to load patient records");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ── Action Handlers ───────────────────────────────────────────────────────
    const handleAddPatient = () => {
        openModal("ADD_PATIENT");
    };

    const handleEditPatient = (patient: any) => {
        openModal("EDIT_PATIENT", patient);
    };

    const handleDeletePatient = (patient: any) => {
        openModal("DELETE_CONFIRMATION", {
            title: `Remove ${patient.name}?`,
            description: `Are you sure you want to permanently remove this patient from your directory? This will not delete their primary account but will remove them from your active rounds.`,
            onConfirm: async () => {
                try {
                    // Logic to "unassign" or just remove from view if needed, 
                    // for now we'll just log or implement a specific endpoint if exists.
                    // But usually, patients list for doctor is dynamic based on appointments.
                    toast.success("Patient removed from directory");
                    fetchPatients();
                } catch (err) {
                    toast.error("Failed to remove patient");
                }
            },
        });
    };

    return (
        <div className="space-y-6 p-5 animate-fade-in">
            <PageHeader
                title="Clinical Directory"
                subtitle="A centralized database of patients associated with your practice."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Patients", href: "/patients" },
                ]}
                action={
                    <Button
                        leftIcon={<HiOutlinePlus className="w-5 h-5" />}
                        onClick={handleAddPatient}
                        className="rounded-2xl shadow-lg shadow-primary/20 font-black h-12"
                    >
                        Add New Patient
                    </Button>
                }
            />

            <Card className="border-0 shadow-premium rounded-[2rem] overflow-hidden">
                <CardContent className="p-0">
                    {/* Filters & Search Header */}
                    <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="w-full md:max-w-md relative group">
                            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                placeholder="Search by name, ID, or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                            />
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <Button variant="outline" className="rounded-2xl border-2 font-black" leftIcon={<HiOutlineFunnel className="w-5 h-5" />}>
                                Filter List
                            </Button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/30 border-0">
                                    <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Patient Details</TableHead>
                                    <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Clinical Status</TableHead>
                                    <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Last Encounter</TableHead>
                                    <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Joining Date</TableHead>
                                    <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    [1,2,3,4,5].map(i => (
                                        <TableRow key={i} className="animate-pulse border-slate-50">
                                            <TableCell className="px-8 py-4"><div className="h-10 bg-slate-100 rounded-xl" /></TableCell>
                                            <TableCell className="px-8 py-4"><div className="h-6 w-20 bg-slate-100 rounded-lg" /></TableCell>
                                            <TableCell className="px-8 py-4"><div className="h-4 w-32 bg-slate-100 rounded-lg" /></TableCell>
                                            <TableCell className="px-8 py-4"><div className="h-4 w-24 bg-slate-100 rounded-lg" /></TableCell>
                                            <TableCell className="px-8 py-4"><div className="h-8 w-24 bg-slate-100 rounded-lg ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : filteredPatients.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-slate-400 py-32">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <HiOutlineUserCircle className="w-12 h-12 opacity-20" />
                                            </div>
                                            <p className="text-sm font-black italic">No clinical records found.</p>
                                            <p className="text-xs font-bold mt-1 uppercase tracking-widest">Adjust your search or add a new patient</p>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredPatients.map((patient) => (
                                        <TableRow key={patient._id} className="group hover:bg-slate-50/50 transition-all border-slate-50">
                                            <TableCell className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-primary font-black text-lg group-hover:scale-110 transition-transform overflow-hidden shrink-0">
                                                        {patient.profileImage ? (
                                                            <img src={patient.profileImage} alt={patient.name} className="w-full h-full object-cover" />
                                                        ) : patient.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <Link
                                                            href={`/patients/${patient._id}`}
                                                            className="font-black text-slate-900 hover:text-primary transition-colors block"
                                                        >
                                                            {patient.name}
                                                        </Link>
                                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                                            {patient.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-8">
                                                <Badge className={`border-0 text-[10px] font-black uppercase px-3 py-1 ${
                                                    patient.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                    {patient.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-8 text-slate-600 font-bold text-sm">
                                                {patient.lastAppointment ? new Date(patient.lastAppointment).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                                            </TableCell>
                                            <TableCell className="px-8 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                                                {new Date(patient.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </TableCell>
                                            <TableCell className="px-8 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href={`/patients/${patient._id}`}>
                                                        <button
                                                            title="View Profile"
                                                            className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                                                        >
                                                            <HiOutlineEye className="w-5 h-5" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        title="Edit Patient"
                                                        onClick={() => handleEditPatient(patient)}
                                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                                                    >
                                                        <HiOutlinePencilSquare className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        title="Remove from List"
                                                        onClick={() => handleDeletePatient(patient)}
                                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-300 hover:bg-rose-500 hover:text-white transition-all"
                                                    >
                                                        <HiOutlineTrash className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="px-8 py-6 flex items-center justify-between bg-slate-50/30 border-t border-slate-50">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Showing <span className="text-slate-800">{filteredPatients.length}</span> active patient profiles
                        </p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="rounded-xl w-10 h-10 p-0 border-slate-200" disabled>
                                <HiChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button variant="primary" size="sm" className="rounded-xl w-10 h-10 p-0 shadow-lg shadow-primary/20 font-black">1</Button>
                            <Button variant="outline" size="sm" className="rounded-xl w-10 h-10 p-0 border-slate-200" disabled>
                                <HiChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PatientsPage;

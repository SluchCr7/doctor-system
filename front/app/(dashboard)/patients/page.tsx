"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
    HiOutlineMagnifyingGlass,
    HiOutlineFunnel,
    HiOutlinePlus,
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiChevronLeft,
    HiChevronRight
} from "react-icons/hi2";
import { patients } from "@/data/mockData";
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

const PatientsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="Patients"
                subtitle="Manage and view all your clinic's patient records."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Patients", href: "/patients" },
                ]}
                action={
                    <Button leftIcon={<HiOutlinePlus className="w-5 h-5" />}>
                        Add New Patient
                    </Button>
                }
            />

            <Card>
                <CardContent className="space-y-6">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="w-full md:max-w-md">
                            <Input
                                placeholder="Search by name, ID, or phone..."
                                leftIcon={<HiOutlineMagnifyingGlass className="w-5 h-5" />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <Button variant="outline" leftIcon={<HiOutlineFunnel className="w-5 h-5" />}>
                                Filters
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-xl border border-slate-200 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                    <TableHead>Patient Details</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Visit</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPatients.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                                    {patient.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <Link href={`/patients/${patient.id}`} className="font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                                                        {patient.name}
                                                    </Link>
                                                    <div className="text-xs text-slate-500 mt-0.5">
                                                        ID: {patient.id} • {patient.age} yrs • {patient.gender}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                patient.status === "Regular" ? "info" :
                                                    patient.status === "New" ? "success" : "error"
                                            }>
                                                {patient.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-600">{patient.lastVisit}</TableCell>
                                        <TableCell className="text-slate-600">{patient.phone}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/patients/${patient.id}`}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600">
                                                        <HiOutlineEye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700">
                                                    <HiOutlinePencilSquare className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-600">
                                                    <HiOutlineTrash className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <p className="text-sm text-slate-500">Showing 1 to {filteredPatients.length} of {patients.length} entries</p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" disabled>
                                <HiChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="primary" size="sm" className="w-8">1</Button>
                            <Button variant="outline" size="sm" className="w-8">2</Button>
                            <Button variant="outline" size="sm">
                                <HiChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PatientsPage;

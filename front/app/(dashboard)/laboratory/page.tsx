"use client";
import React from "react";
import {
    FiBox,
    FiSearch,
    FiPlus,
    FiUploadCloud,
    FiFile,
    FiCheckCircle,
    FiClock,
    FiAlertCircle,
    FiActivity
} from "react-icons/fi";

const LaboratoryPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Laboratory Module</h1>
                    <p className="text-slate-500 text-sm font-medium">Manage lab requests, test results, and diagnostic uploads</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all">
                    <FiPlus className="w-5 h-5" /> New Lab Request
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="medical-card p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Request Status</h3>
                        <div className="space-y-3">
                            {[
                                { label: "Pending Collection", count: 8, color: "bg-warning", text: "text-warning" },
                                { label: "In Analysis", count: 12, color: "bg-primary", text: "text-primary" },
                                { label: "Ready / Completed", count: 45, color: "bg-accent", text: "text-accent" },
                                { label: "Needs Review", count: 3, color: "bg-danger", text: "text-danger" }
                            ].map(s => (
                                <div key={s.label} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${s.color}`}></div>
                                        <span className="text-xs font-bold text-slate-600">{s.label}</span>
                                    </div>
                                    <span className={`text-xs font-black ${s.text}`}>{s.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="medical-card p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Departments</h3>
                        <div className="space-y-2">
                            {["Hematology", "Microbiology", "Biochemistry", "Radiology", "Pathology"].map(dept => (
                                <div key={dept} className="flex items-center justify-between text-xs font-bold text-slate-500 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-all">
                                    <span>{dept}</span>
                                    <FiActivity className="opacity-0 group-hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="medical-card p-0 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Active Test Requests</h3>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Patient name..."
                                        className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-48"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                        <th className="px-6 py-4">Request #</th>
                                        <th className="px-6 py-4">Patient</th>
                                        <th className="px-6 py-4">Test Description</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Ordered By</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { id: "LAB-992", patient: "Emily Davis", test: "Complete Blood Count", status: "Ready", doctor: "Dr. Wilson" },
                                        { id: "LAB-993", patient: "Jane Smith", test: "Lipid Profile", status: "Analysis", doctor: "Dr. Chen" },
                                        { id: "LAB-994", patient: "Robert Johnson", test: "Urinalysis", status: "Pending", doctor: "Dr. Smith" }
                                    ].map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-5 text-sm font-bold text-slate-700">{item.id}</td>
                                            <td className="px-6 py-5">
                                                <span className="text-sm font-bold text-slate-800">{item.patient}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-sm text-slate-600 font-medium">{item.test}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hematology</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${item.status === "Ready" ? "text-accent" : item.status === "Analysis" ? "text-primary" : "text-warning"
                                                    }`}>
                                                    {item.status === "Ready" ? <FiCheckCircle /> : item.status === "Analysis" ? <FiActivity className="animate-pulse" /> : <FiClock />}
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-sm text-slate-600">{item.doctor}</td>
                                            <td className="px-6 py-5">
                                                {item.status === "Ready" ? (
                                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-[10px] font-bold hover:bg-primary hover:text-white transition-all">
                                                        <FiFile /> View Results
                                                    </button>
                                                ) : (
                                                    <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 text-slate-400 rounded-lg text-[10px] font-bold hover:text-primary hover:border-primary transition-all">
                                                        <FiUploadCloud /> Upload
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaboratoryPage;

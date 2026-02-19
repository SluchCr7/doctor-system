"use client";
import React from "react";
import {
    FiCreditCard,
    FiDownload,
    FiMoreVertical,
    FiPlus,
    FiSearch,
    FiArrowUpRight,
    FiFileText,
    FiDollarSign,
    FiShield
} from "react-icons/fi";
import { invoices } from "@/data/mockData";

const BillingPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Billing & Invoices</h1>
                    <p className="text-slate-500 text-sm font-medium">Manage patient billing, payments, and financial reports</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all">
                    <FiPlus className="w-5 h-5" /> Create New Invoice
                </button>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="medical-card p-6 border-l-4 border-l-primary">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg"><FiDollarSign className="w-5 h-5" /></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Revenue</span>
                    </div>
                    <p className="text-2xl font-black text-slate-800">$12,840.00</p>
                    <div className="mt-2 text-[10px] font-bold text-accent flex items-center gap-1">
                        <FiArrowUpRight /> +8.5% from last month
                    </div>
                </div>
                <div className="medical-card p-6 border-l-4 border-l-warning">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-warning/10 text-warning rounded-lg"><FiFileText className="w-5 h-5" /></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Invoices</span>
                    </div>
                    <p className="text-2xl font-black text-slate-800">$4,820.00</p>
                    <div className="mt-2 text-[10px] font-bold text-slate-400">14 invoices awaiting payment</div>
                </div>
                <div className="medical-card p-6 border-l-4 border-l-accent">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-accent/10 text-accent rounded-lg"><FiShield className="w-5 h-5" /></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Insurance Claims</span>
                    </div>
                    <p className="text-2xl font-black text-slate-800">22 Active</p>
                    <div className="mt-2 text-[10px] font-bold text-slate-400">$8,240.00 estimated recovery</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Invoice List */}
                <div className="lg:col-span-2 medical-card overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div className="relative max-w-xs w-full">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Invoice # or patient..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <button className="text-primary text-sm font-bold hover:underline">Download Report</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <th className="px-6 py-4">Invoice #</th>
                                    <th className="px-6 py-4">Patient</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {invoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-5 text-sm font-bold text-slate-700">{inv.id}</td>
                                        <td className="px-6 py-5">
                                            <div className="text-sm font-bold text-slate-700">{inv.patient}</div>
                                            <div className="text-[10px] text-slate-400 font-medium">General Consultation</div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-black text-slate-800">${inv.amount.toFixed(2)}</td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${inv.status === "Paid" ? "bg-accent/10 text-accent" : inv.status === "Pending" ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger"
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-xs text-slate-500 font-medium">{inv.date}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-slate-400 hover:text-primary"><FiDownload /></button>
                                                <button className="p-2 text-slate-400 hover:text-slate-600"><FiMoreVertical /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Summary / Action */}
                <div className="space-y-6">
                    <div className="medical-card p-8 bg-slate-50 border-dashed border-2">
                        <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <FiCreditCard className="text-primary" /> Recent Transaction
                        </h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Subtotal</span>
                                <span className="text-slate-800 font-bold">$150.00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Tax (5%)</span>
                                <span className="text-slate-800 font-bold">$7.50</span>
                            </div>
                            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                                <span className="text-base font-bold text-slate-900">Total</span>
                                <span className="text-xl font-black text-primary">$157.50</span>
                            </div>

                            <div className="pt-4">
                                <div className="flex items-center gap-2 mb-4 p-3 bg-white border border-slate-200 rounded-xl">
                                    <div className="w-10 h-6 bg-slate-900 rounded flex items-center justify-center text-[8px] font-black text-white italic">VISA</div>
                                    <span className="text-xs font-bold text-slate-600">**** 4242</span>
                                    <span className="flex-1 text-right text-[10px] font-bold text-slate-400">04/24</span>
                                </div>
                                <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg"> Process Payment </button>
                            </div>
                        </div>
                    </div>

                    <div className="medical-card p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Insurance Partners</h3>
                        <div className="flex flex-wrap gap-4 justify-center grayscale opacity-50">
                            {/* Dummy logos */}
                            <div className="h-8 w-20 bg-slate-200 rounded"></div>
                            <div className="h-8 w-20 bg-slate-200 rounded"></div>
                            <div className="h-8 w-20 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingPage;

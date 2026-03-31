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
    FiShield,
    FiFilter
} from "react-icons/fi";
import { invoices, stats, clinicDoctor } from "@/data/mockData";
import { useModal } from "@/context/ModalContext";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const statusVariant: Record<string, "success" | "warning" | "error" | "info"> = {
    Paid: "success",
    Pending: "warning",
    Overdue: "error",
};

const BillingPage = () => {
    const { openModal } = useModal();

    const handleProcessPayment = (inv?: typeof invoices[0]) => {
        openModal("PAYMENT", {
            patientId: inv ? inv.patientId : "manual",
            patientName: inv ? inv.patient : "Manual Entry",
            amount: inv ? inv.amount : 157.50,
            invoiceId: inv ? inv.id : undefined,
        });
    };

    const handleCreateInvoice = () => {
        openModal("ADD_APPOINTMENT"); // reuse or replace with dedicated invoice modal
    };

    return (
        <div className="space-y-6 px-5 py-5">
            <PageHeader
                title="Billing & Invoices"
                subtitle="Manage patient billing, payments, and financial records."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Billing", href: "/billing" },
                ]}
                action={
                    <div className="flex gap-3">
                        <Button variant="outline" leftIcon={<FiFilter />}>
                            Export Reports
                        </Button>
                        <Button leftIcon={<FiPlus />} onClick={handleCreateInvoice}>
                            Create Invoice
                        </Button>
                    </div>
                }
            />

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card className="border-l-4 border-l-sky-400">
                    <CardContent className="flex items-center gap-4">
                        <div className="p-3 bg-sky-50 text-sky-600 rounded-xl shrink-0">
                            <FiDollarSign className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Monthly Revenue</span>
                            <p className="text-2xl font-black text-slate-800">${stats.monthlyRevenue.toLocaleString()}</p>
                            <div className="mt-0.5 text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                                <FiArrowUpRight className="w-3 h-3" /> +8.5% from last month
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-400">
                    <CardContent className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                            <FiFileText className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Pending Payments</span>
                            <p className="text-2xl font-black text-slate-800">${stats.pendingPayments.toLocaleString()}</p>
                            <div className="mt-0.5 text-[11px] font-medium text-slate-400">
                                {invoices.filter(i => i.status === "Pending" || i.status === "Overdue").length} invoices outstanding
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-400">
                    <CardContent className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                            <FiShield className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Insurance Claims</span>
                            <p className="text-2xl font-black text-slate-800">22 Active</p>
                            <div className="mt-0.5 text-[11px] font-medium text-slate-400">$8,240 estimated recovery</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Invoice Table */}
                <Card className="lg:col-span-2 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center gap-4">
                        <div className="relative flex-1 max-w-xs">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by invoice or patient…"
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <Button variant="ghost" size="sm" leftIcon={<FiDownload className="w-4 h-4" />}>
                            Export
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <th className="px-5 py-3.5">Invoice</th>
                                    <th className="px-5 py-3.5">Patient</th>
                                    <th className="px-5 py-3.5">Service</th>
                                    <th className="px-5 py-3.5">Amount</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5">Date</th>
                                    <th className="px-5 py-3.5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {invoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors group">
                                        <td className="px-5 py-4 text-sm font-bold text-slate-700 font-mono">{inv.id}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center text-xs font-bold shrink-0">
                                                    {inv.patient.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-700">{inv.patient}</div>
                                                    <div className="text-[10px] text-slate-400">{inv.patientId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-500 max-w-[140px] truncate">{inv.service}</td>
                                        <td className="px-5 py-4 text-sm font-black text-slate-800">${inv.amount.toFixed(2)}</td>
                                        <td className="px-5 py-4">
                                            <Badge variant={statusVariant[inv.status] ?? "info"}>
                                                {inv.status}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-500">{inv.date}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {(inv.status === "Pending" || inv.status === "Overdue") && (
                                                    <button
                                                        onClick={() => handleProcessPayment(inv)}
                                                        className="px-2.5 py-1 text-xs font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                                                    >
                                                        Pay
                                                    </button>
                                                )}
                                                <button className="p-1.5 text-slate-400 hover:text-primary transition-colors" title="Download">
                                                    <FiDownload className="w-3.5 h-3.5" />
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors" title="More options">
                                                    <FiMoreVertical className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Payment Summary + Doctor Info */}
                <div className="space-y-5">
                    {/* Quick Payment Card */}
                    <Card className="bg-slate-50 border-dashed border-2">
                        <CardContent>
                            <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
                                <FiCreditCard className="text-primary" /> Quick Payment
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Subtotal</span>
                                    <span className="font-bold text-slate-800">$150.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Tax (5%)</span>
                                    <span className="font-bold text-slate-800">$7.50</span>
                                </div>
                                <div className="pt-3 border-t border-slate-200 flex justify-between">
                                    <span className="font-bold text-slate-900">Total</span>
                                    <span className="text-xl font-black text-primary">$157.50</span>
                                </div>

                                <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl">
                                    <div className="w-10 h-6 bg-slate-900 rounded flex items-center justify-center text-[8px] font-black text-white italic">
                                        VISA
                                    </div>
                                    <span className="text-xs font-bold text-slate-600">**** 4242</span>
                                    <span className="flex-1 text-right text-[10px] font-bold text-slate-400">04/27</span>
                                </div>

                                <button
                                    onClick={() => handleProcessPayment()}
                                    className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg"
                                >
                                    Process Payment
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Provider Info */}
                    <Card>
                        <CardContent>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Billing Provider</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={clinicDoctor.image}
                                    alt={clinicDoctor.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-100"
                                />
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{clinicDoctor.name}</p>
                                    <p className="text-xs text-slate-400">License: {clinicDoctor.licenseNumber}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-xs text-slate-500">
                                <div className="flex justify-between">
                                    <span>Specialty</span>
                                    <span className="font-medium text-slate-700 text-right max-w-[140px]">{clinicDoctor.specialty}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Contact</span>
                                    <span className="font-medium text-slate-700">{clinicDoctor.phone}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BillingPage;

"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FiCreditCard, FiCheckCircle, FiDownload, FiZap, FiInfo } from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineCurrencyDollar } from "react-icons/hi2";
import financialService from "@/services/financialService";
import toast from "react-hot-toast";

const doctorPlans = [
    {
        id: "starter",
        name: "Starter",
        price: 49,
        features: ["Up to 100 patients", "Basic scheduling", "Email support"],
    },
    {
        id: "professional",
        name: "Professional",
        price: 129,
        badge: "Most Popular",
        features: ["Up to 1,000 patients", "Advanced analytics", "SMS notifications", "Priority support"],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: 299,
        badge: "Best Value",
        features: ["Unlimited patients", "Custom API", "HIPAA compliance", "24/7 Support"],
    },
];

const BillingSettings = () => {
    const { user, updateProfile } = useAuth();
    const isDoctor = user?.role === "doctor";
    
    const [realInvoices, setRealInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(user?.profileData?.billingPlan?.plan || "professional");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await financialService.getInvoices();
                if (res.data.success) {
                    setRealInvoices(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch invoices");
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    const savePlan = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    billingPlan: { plan: selectedPlan }
                }
            });
            setSaved(true); 
            toast.success("Billing plan updated");
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            toast.error("Failed to update plan");
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header section based on role */}
            <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-8 text-white shadow-premium">
                <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative flex items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-md">Financial Overview</span>
                        </div>
                        <h3 className="text-3xl font-black">{isDoctor ? "Practice Earnings" : "My Health Expenses"}</h3>
                        <p className="text-slate-400 text-sm mt-2 max-w-md">Manage your billing history, invoices, and payment methods in one secure place.</p>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Lifetime Spent</p>
                            <p className="text-3xl font-black text-primary">${realInvoices.reduce((acc, inv) => acc + (inv.total || 0), 0).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {isDoctor && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {doctorPlans.map(plan => (
                        <button 
                            key={plan.id} 
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`group relative text-left p-6 rounded-[2rem] border-2 transition-all ${selectedPlan === plan.id ? "border-primary bg-white shadow-premium" : "border-slate-100 bg-white/50 hover:border-slate-200"}`}
                        >
                            {plan.badge && (
                                <span className="absolute -top-3 left-6 px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full shadow-lg">
                                    {plan.badge}
                                </span>
                            )}
                            <div className="flex items-center justify-between mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedPlan === plan.id ? "bg-primary text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"}`}>
                                    <HiOutlineSparkles size={24} />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-slate-900">${plan.price}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Per Month</p>
                                </div>
                            </div>
                            <h4 className="text-xl font-black text-slate-800 mb-4">{plan.name}</h4>
                            <ul className="space-y-3">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </button>
                    ))}
                </div>
            )}

            {/* Invoices Table */}
            <Card className="border-0 shadow-card rounded-[2rem] overflow-hidden bg-white">
                <CardHeader className="flex flex-row items-center justify-between mx-6 px-0 py-6 border-b border-slate-50">
                    <div>
                        <CardTitle className="text-lg font-black text-slate-800">Invoice History</CardTitle>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Direct Download available</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl font-bold border-slate-200">Export All (CSV)</Button>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {realInvoices.length > 0 ? (
                                realInvoices.map(inv => (
                                    <tr key={inv._id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-black text-slate-800">{inv.invoiceNumber}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{inv.items?.[0]?.description || "Medical Consultation"}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-500">{new Date(inv.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-900">${inv.total}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                <FiDownload size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                                            <FiInfo size={24} />
                                        </div>
                                        <p className="text-slate-400 font-bold italic">No billing records found in your account.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {isDoctor && (
                <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <p className="text-sm font-bold text-slate-500 max-w-sm">Changing your plan will affect your next billing cycle. No data will be lost during migration.</p>
                    <div className="flex gap-3">
                        <Button variant="ghost" className="text-red-500 hover:bg-red-50 font-bold">Unsubscribe</Button>
                        <Button onClick={savePlan} className="font-black px-8">Confirm Plan Update</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingSettings;

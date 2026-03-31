"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiCreditCard, FiCheckCircle, FiDownload, FiZap } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

const plans = [
    {
        id: "starter",
        name: "Starter",
        price: 49,
        color: "border-slate-200",
        badge: "",
        features: ["Up to 100 patients", "Appointment scheduling", "Basic billing", "Email support", "1 staff account"],
    },
    {
        id: "professional",
        name: "Professional",
        price: 129,
        color: "border-primary",
        badge: "Current Plan",
        features: ["Up to 1,000 patients", "Advanced scheduling + calendar", "Full billing & invoicing", "Analytics & reports", "5 staff accounts", "SMS notifications", "Priority support"],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: 299,
        color: "border-secondary",
        badge: "Best Value",
        features: ["Unlimited patients", "Multi-doctor clinic support", "Custom integrations & API", "Advanced analytics & BI", "Unlimited staff accounts", "Dedicated account manager", "HIPAA compliance report", "Data migration support"],
    },
];

const invoices = [
    { id: "INV-2026-031", date: "Mar 1, 2026", amount: "$129.00", status: "Paid" },
    { id: "INV-2026-022", date: "Feb 1, 2026", amount: "$129.00", status: "Paid" },
    { id: "INV-2026-011", date: "Jan 1, 2026", amount: "$129.00", status: "Paid" },
    { id: "INV-2025-124", date: "Dec 1, 2025", amount: "$129.00", status: "Paid" },
];

const BillingPlanSettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.billingPlan || {};

    const [selected, setSelected] = useState(initData.plan || "professional");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (user?.profileData?.billingPlan?.plan) {
            setSelected(user.profileData.billingPlan.plan);
        }
    }, [user]);

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    billingPlan: { plan: selected }
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
            {/* Current Plan Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 text-white">
                <div className="absolute right-0 top-0 w-48 h-48 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <HiOutlineSparkles className="w-4 h-4 text-primary" />
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Subscription</span>
                        </div>
                        <h3 className="text-2xl font-black">Professional Plan</h3>
                        <p className="text-slate-400 text-sm mt-1">Renews on <span className="text-white font-bold">April 1, 2026</span> · $129.00/month</p>
                    </div>
                    <div className="text-right">
                        <p className="text-4xl font-black text-primary">$129</p>
                        <p className="text-slate-400 text-xs">/month</p>
                    </div>
                </div>
            </div>

            {/* Plan Selection */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-5">Change Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map(plan => (
                        <button key={plan.id} onClick={() => setSelected(plan.id)}
                            className={`relative text-left p-5 rounded-2xl border-2 transition-all ${selected === plan.id ? (plan.id === "professional" ? "border-primary shadow-lg shadow-primary/10" : plan.id === "enterprise" ? "border-secondary shadow-lg shadow-secondary/10" : "border-slate-400") : "border-slate-100 hover:border-slate-200"}`}>
                            {plan.badge && (
                                <span className={`absolute top-3 right-3 px-2 py-0.5 text-[10px] font-black rounded-full ${plan.id === "professional" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                                    {plan.badge}
                                </span>
                            )}
                            <div className={`w-3 h-3 rounded-full mb-4 ${selected === plan.id ? (plan.id === "professional" ? "bg-primary" : plan.id === "enterprise" ? "bg-secondary" : "bg-slate-500") : "bg-slate-200"}`} />
                            <p className="text-lg font-black text-slate-800">{plan.name}</p>
                            <p className="text-2xl font-black text-slate-900 mt-1">${plan.price}<span className="text-sm font-medium text-slate-400">/mo</span></p>
                            <ul className="mt-4 space-y-2">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-start gap-2 text-xs font-medium text-slate-600">
                                        <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </button>
                    ))}
                </div>
                {selected !== "professional" && (
                    <div className="mt-4 p-4 bg-sky-50 border border-sky-100 rounded-2xl">
                        <p className="text-sm font-bold text-sky-700 flex items-center gap-2">
                            <FiZap className="w-4 h-4" />
                            {selected === "enterprise" ? "Upgrade to Enterprise — your next billing will be prorated." : "Downgrade to Starter — change takes effect at next billing cycle."}
                        </p>
                    </div>
                )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-5 flex items-center gap-2">
                    <FiCreditCard className="w-4 h-4 text-primary" /> Payment Method
                </h3>
                <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-xs font-black">VISA</div>
                    <div>
                        <p className="text-sm font-bold text-slate-800">Visa ending in ••••  4892</p>
                        <p className="text-xs text-slate-500">Expires 08/2028</p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto">Update Card</Button>
                </div>
            </div>

            {/* Invoice History */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-5">Billing History</h3>
                <div className="overflow-hidden border border-slate-100 rounded-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                {["Invoice", "Date", "Amount", "Status", ""].map(h => (
                                    <th key={h} className="px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {invoices.map(inv => (
                                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-3 text-sm font-bold text-slate-700">{inv.id}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500">{inv.date}</td>
                                    <td className="px-5 py-3 text-sm font-bold text-slate-800">{inv.amount}</td>
                                    <td className="px-5 py-3"><span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full">{inv.status}</span></td>
                                    <td className="px-5 py-3 text-right">
                                        <button className="flex items-center gap-1 text-xs font-bold text-primary hover:underline ml-auto">
                                            <FiDownload className="w-3.5 h-3.5" /> PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Plan updated successfully
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="ghost" className="text-red-500 hover:bg-red-50">Cancel Subscription</Button>
                    <Button onClick={save}>Confirm Plan Change</Button>
                </div>
            </div>
        </div>
    );
};

export default BillingPlanSettings;

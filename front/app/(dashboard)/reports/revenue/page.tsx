"use client";
import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import { FiPieChart } from "react-icons/fi";

const RevenueReport = () => {
    return (
        <div className="space-y-6 p-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Revenue Analytics</h1>
                <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-sm text-slate-500 font-medium">Total Revenue</div>
                    <div className="text-2xl font-bold text-slate-800 mt-1">$45,231.00</div>
                    <div className="text-xs text-green-500 font-bold mt-2">+12% from last period</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-sm text-slate-500 font-medium">Outstanding</div>
                    <div className="text-2xl font-bold text-slate-800 mt-1">$3,450.00</div>
                    <div className="text-xs text-red-500 font-bold mt-2">5 overdue invoices</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="text-sm text-slate-500 font-medium">Net Profit</div>
                    <div className="text-2xl font-bold text-slate-800 mt-1">$32,100.00</div>
                    <div className="text-xs text-slate-400 font-bold mt-2">After expenses</div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex items-center justify-center">
                <EmptyState
                    title="Revenue Chart"
                    description="Detailed revenue charts and graphs will be rendered here using Recharts or Chart.js."
                    icon={<FiPieChart className="w-12 h-12" />}
                />
            </div>
        </div>
    );
};

export default RevenueReport;

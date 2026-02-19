"use client";
import React from "react";
import { FiDownloadCloud } from "react-icons/fi";
import EmptyState from "@/components/ui/EmptyState";

export default function DataExport() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-2xl font-bold text-slate-800">Data Export</h1>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <EmptyState
                    title="Export Data"
                    description="Download patient records, financial reports, and system logs in CSV or PDF format."
                    icon={<FiDownloadCloud className="w-12 h-12" />}
                />
            </div>
        </div>
    );
}

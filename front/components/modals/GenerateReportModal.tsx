"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ChartBar, Download, FileText, Share } from "lucide-react";
import toast from "react-hot-toast";

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function GenerateReportModal({ isOpen, onClose, onSubmit }: GenerateReportModalProps) {
  const [formData, setFormData] = useState({
    reportType: "Clinical Summary",
    format: "PDF (Formatted)",
    period: "Last 30 Days"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast.success("Intelligence report generated and ready for export.");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Clinical Intelligence Report"
      description="Synthesize clinical and financial data into a comprehensive operational summary."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Analytical Framework</label>
          <select
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm appearance-none"
            value={formData.reportType}
            onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
            required
          >
            <option>Clinical Summary</option>
            <option>Financial Performance</option>
            <option>Patient Demographics</option>
            <option>Appointment Efficiency</option>
            <option>System Audit Log</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporal Scope</label>
          <select
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm appearance-none"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            required
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Fiscal Year</option>
            <option>Universal Scope</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Export Protocol</label>
          <div className="grid grid-cols-2 gap-3">
             <button
               type="button"
               onClick={() => setFormData({ ...formData, format: "PDF (Formatted)" })}
               className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest ${
                 formData.format === "PDF (Formatted)" ? "bg-primary border-primary text-white shadow-lg" : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50"
               }`}
             >
                <FileText size={16} /> PDF
             </button>
             <button
               type="button"
               onClick={() => setFormData({ ...formData, format: "Excel (Tabular)" })}
               className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest ${
                 formData.format === "Excel (Tabular)" ? "bg-primary border-primary text-white shadow-lg" : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50"
               }`}
             >
                <ChartBar size={16} /> Excel
             </button>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button variant="ghost" className="flex-1 rounded-xl font-black text-[10px] uppercase tracking-widest h-12" onClick={onClose}>
            Discard
          </Button>
          <Button type="submit" className="flex-1 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 shadow-xl shadow-primary/20 bg-slate-900 text-white hover:bg-primary transition-all" leftIcon={<Download size={16} />}>
            Generate & Sync
          </Button>
        </div>
      </form>
    </Modal>
  );
}

"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FileText, Calendar, Send, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

interface RequestRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function RequestRecordsModal({ isOpen, onClose, onSubmit }: RequestRecordsModalProps) {
  const [formData, setFormData] = useState({
    purpose: "Routine Follow-up",
    requestedPeriod: "Last 6 Months",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast.success("Medical records request sent successfully.");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Medical Records"
      description="Securely request your clinical history and lab results for personal review or transition of care."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Purpose of Request</label>
          <select
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm appearance-none"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            required
          >
            <option>Routine Follow-up</option>
            <option>Personal Records Access</option>
            <option>Second Medical Opinion</option>
            <option>Transition of Care</option>
            <option>Insurance Verification</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Historical Period</label>
          <select
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm appearance-none"
            value={formData.requestedPeriod}
            onChange={(e) => setFormData({ ...formData, requestedPeriod: e.target.value })}
            required
          >
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>All-time History</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Additional Information (Optional)</label>
          <textarea
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm min-h-[100px] resize-none"
            placeholder="Help our medical team process your request faster..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl text-emerald-700 mb-4 border border-emerald-100">
           <ShieldCheck size={20} className="shrink-0" />
           <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
             Request verified under HIPAA digital protocols. Confidential processing within 24-48 business hours.
           </p>
        </div>

        <div className="pt-4 flex gap-3">
          <Button variant="ghost" className="flex-1 rounded-xl font-black text-[10px] uppercase tracking-widest h-12" onClick={onClose}>
            Cancel Request
          </Button>
          <Button type="submit" className="flex-1 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 shadow-xl shadow-primary/20 bg-slate-900 text-white hover:bg-primary transition-all" leftIcon={<Send size={16} />}>
            Dispatch Request
          </Button>
        </div>
      </form>
    </Modal>
  );
}

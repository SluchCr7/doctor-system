"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Clock, Calendar, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface BlockTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function BlockTimeModal({ isOpen, onClose, onSubmit }: BlockTimeModalProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: "09:00",
    endTime: "10:00",
    reason: "Lunch Break"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast.success("Schedule blocked successfully.");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Block Clinical Schedule"
      description="Prevent new appointments from being scheduled during a specific timeframe."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Date</label>
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="date"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Time</label>
            <div className="relative group">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="time"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Time</label>
            <div className="relative group">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="time"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Blocking Reason</label>
          <select
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm appearance-none"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            required
          >
            <option>Lunch Break</option>
            <option>Clinical Meeting</option>
            <option>Personal Leave</option>
            <option>Emergency Session</option>
            <option>Maintenance</option>
          </select>
        </div>

        <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl text-amber-700 border border-amber-100">
           <AlertCircle size={20} className="shrink-0" />
           <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
             This will override existing availability rules. Conflicting appointments may need manual rescheduling.
           </p>
        </div>

        <div className="pt-4 flex gap-3">
          <Button variant="ghost" className="flex-1 rounded-xl font-black text-[10px] uppercase tracking-widest h-12" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 shadow-xl shadow-primary/20 bg-slate-900 text-white hover:bg-primary transition-all">
            Execute Block
          </Button>
        </div>
      </form>
    </Modal>
  );
}

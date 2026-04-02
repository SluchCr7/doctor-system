"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FileText, Calendar, PlusCircle } from "lucide-react";

interface AddMedicalNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function AddMedicalNoteModal({ isOpen, onClose, onSubmit }: AddMedicalNoteModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Personal Health Note"
      description="Record your health observations and symptoms to share with your doctor later."
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Note Title</label>
          <div className="relative group">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm"
              placeholder="e.g. Heart palpitations after workout..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Occurrence Date</label>
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

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Note Content</label>
          <textarea
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all shadow-sm min-h-[150px] resize-none"
            placeholder="Detailed description of what you're experiencing..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>

        <div className="pt-4 flex gap-3">
          <Button variant="ghost" className="flex-1 rounded-xl font-black text-[10px] uppercase tracking-widest h-12" onClick={onClose}>
            Discard Note
          </Button>
          <Button type="submit" className="flex-1 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 shadow-xl shadow-primary/20" leftIcon={<PlusCircle size={16} />}>
            Save to Journal
          </Button>
        </div>
      </form>
    </Modal>
  );
}

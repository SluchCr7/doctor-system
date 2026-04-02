"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Search, User, Calendar, FileText, Command, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/context/api";
import Link from "next/link";

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/doctor/search?q=${query}`);
        if (res.data.success) {
          setResults(res.data.data);
        }
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // This is handled by a listener in layout, but good to have here too
      }
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        // Navigate or action
        const item = results[selectedIndex];
        handleItemClick(item);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleItemClick = (item: any) => {
    // Navigate based on type
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="lg"
      className="!p-0 overflow-hidden"
      hideHeader
    >
      <div className="flex flex-col h-[500px]">
        {/* Search Input */}
        <div className="relative p-6 border-b border-slate-100 flex items-center gap-4">
          <Search className="text-slate-400" size={24} />
          <input
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-slate-800 placeholder:text-slate-300"
            placeholder="Search patients, records, appointments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded-lg text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-200">
            Esc
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50/50">
          {loading ? (
            <div className="flex items-center justify-center h-full text-slate-400 gap-3">
              <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-xs font-black uppercase tracking-widest italic">Scanning clinical database...</span>
            </div>
          ) : results.length > 0 ? (
            results.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                  index === selectedIndex ? "bg-white shadow-xl shadow-slate-200/50 ring-2 ring-primary border-transparent" : "hover:bg-white/50 border border-transparent"
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => handleItemClick(item)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  item.type === 'patient' ? 'bg-indigo-50 text-indigo-500' :
                  item.type === 'appointment' ? 'bg-sky-50 text-sky-500' :
                  'bg-emerald-50 text-emerald-500'
                }`}>
                  {item.type === 'patient' ? <User size={20} /> :
                   item.type === 'appointment' ? <Calendar size={20} /> :
                   <FileText size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-slate-800 tracking-tight">{item.title || item.name}</h4>
                    <span className="text-[10px] font-black uppercase tracking-tighter px-1.5 py-0.5 bg-slate-100 text-slate-400 rounded-md">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-bold truncate max-w-sm">{item.subtitle || item.email || "No description provided"}</p>
                </div>
                <ArrowRight size={18} className={`transition-all ${index === selectedIndex ? "text-primary translate-x-0 opacity-100" : "text-slate-200 -translate-x-2 opacity-0"}`} />
              </motion.div>
            ))
          ) : query ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 italic">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-2">Zero Matches Found</span>
               <p className="text-xs font-bold not-italic">Try searching by name, ID, or clinical parameter</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
               <Command className="text-slate-100 mb-6" size={80} />
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Ready for search command</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
           <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <div className="p-1 bg-slate-100 rounded border border-slate-200 text-slate-500"><Search size={10} /></div> Search
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <div className="p-1 bg-slate-100 rounded border border-slate-200 text-slate-500">↵</div> Select
              </div>
           </div>
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Clinical Neural Search v1.0</p>
        </div>
      </div>
    </Modal>
  );
}

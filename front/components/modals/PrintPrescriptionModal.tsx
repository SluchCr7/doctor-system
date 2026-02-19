"use client";
import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FiPrinter, FiDownload, FiCheckCircle } from "react-icons/fi";

interface PrintPrescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientName: string;
    medications: any[];
}

const PrintPrescriptionModal = ({ isOpen, onClose, patientName, medications }: PrintPrescriptionModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Prescription Preview" size="3xl">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mb-8">
                <div id="printable-area" className="bg-white p-12 shadow-sm border border-slate-200 min-h-[600px] flex flex-col">
                    {/* Clinic Header */}
                    <div className="flex justify-between items-start border-b-2 border-primary pb-8 mb-8">
                        <div>
                            <h1 className="text-2xl font-black text-primary">ClinicDoc Management</h1>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Medical Center & Pharmacy</p>
                            <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                                782 Medical Plaza Way, Suite 400<br />
                                Springfield, IL 62704<br />
                                Phone: +1 (555) 123-4567
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</div>
                            <div className="text-sm font-bold text-slate-800">Feb 18, 2024</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4 mb-1">Prescription ID</div>
                            <div className="text-sm font-bold text-slate-800">#RX-8842-10</div>
                        </div>
                    </div>

                    {/* Patient Info */}
                    <div className="grid grid-cols-2 gap-8 mb-12 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Patient Name</span>
                            <div className="text-sm font-bold text-slate-800">{patientName}</div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Age / Gender</span>
                            <div className="text-sm font-bold text-slate-800">45 Yrs / Male</div>
                        </div>
                    </div>

                    {/* RX Symbol */}
                    <div className="text-4xl font-black text-slate-200 mb-6 italic select-none">Rx</div>

                    {/* Medications */}
                    <div className="flex-1 space-y-8 px-4">
                        {medications.map((med, i) => (
                            <div key={i} className="border-b border-slate-50 pb-6">
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{med.name} {med.dosage}</h3>
                                <div className="flex gap-8 mt-2 text-sm text-slate-600 font-medium">
                                    <span>Sig: {med.frequency}</span>
                                    <span>Disp: {med.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer / Signature */}
                    <div className="mt-20 pt-12 border-t border-slate-100 flex justify-between items-end">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-accent">
                                <FiCheckCircle /> Digitally Verified Prescription
                            </div>
                            <p className="text-[10px] text-slate-400 max-w-xs italic">This prescription is valid for 30 days from the date of issue. Please consult your physician if symptoms persist.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-48 border-b-2 border-slate-200 mb-2 h-12 flex items-center justify-center italic text-primary font-bold">Dr. Sarah Smith</div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized Signature</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="outline" leftIcon={<FiDownload />}>Download PDF</Button>
                <Button leftIcon={<FiPrinter />} onClick={() => window.print()}>Print Now</Button>
            </div>
        </Modal>
    );
};

export default PrintPrescriptionModal;

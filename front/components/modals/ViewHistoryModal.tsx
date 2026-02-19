"use client";
import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { patients } from "@/data/mockData";
import {
    FiCalendar, FiUser, FiFileText,
    FiAlertCircle, FiActivity, FiClock
} from "react-icons/fi";

interface ViewHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientId: string;
    patientName?: string;
}

const ViewHistoryModal = ({ isOpen, onClose, patientId, patientName }: ViewHistoryModalProps) => {
    const patient = patients.find(p => p.id === patientId);
    const displayName = patientName ?? patient?.name ?? "Unknown Patient";
    const history = patient?.history ?? [];
    const allergies = patient?.allergies ?? [];
    const chronicDiseases = patient?.chronicDiseases ?? [];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Patient History"
            description={`Medical history overview for ${displayName}`}
            size="2xl"
        >
            <div className="space-y-6">
                {/* Patient Quick Info */}
                {patient && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Age", value: `${patient.age} yrs`, icon: FiUser },
                            { label: "Blood Group", value: patient.bloodGroup, icon: FiActivity },
                            { label: "Gender", value: patient.gender, icon: FiUser },
                            { label: "Last Visit", value: patient.lastVisit, icon: FiCalendar },
                        ].map(item => (
                            <div key={item.label} className="bg-slate-50 rounded-xl border border-slate-100 p-3 text-center">
                                <item.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                                <p className="text-sm font-bold text-slate-800 mt-0.5">{item.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Allergies & Chronic Conditions */}
                {(allergies.length > 0 || chronicDiseases.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {allergies.length > 0 && (
                            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <FiAlertCircle className="w-4 h-4 text-red-500" />
                                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Allergies</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {allergies.map(a => (
                                        <Badge key={a} variant="error">{a}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        {chronicDiseases.length > 0 && (
                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <FiActivity className="w-4 h-4 text-amber-600" />
                                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Chronic Conditions</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {chronicDiseases.map(d => (
                                        <Badge key={d} variant="warning">{d}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Visit History Timeline */}
                <div>
                    <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-primary" />
                        Visit History
                    </h4>
                    {history.length > 0 ? (
                        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                            {history.map((visit, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-white transition-all"
                                >
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary">
                                        <FiCalendar className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{visit.reason}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {visit.doctor} • {visit.date}
                                                </p>
                                            </div>
                                            <Badge variant="success" className="shrink-0">{visit.diagnosis}</Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-slate-50 rounded-xl border border-dashed border-slate-200 p-8 text-center">
                            <FiFileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-sm text-slate-500">No visit records found.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-2 border-t border-slate-100">
                    <Button variant="ghost" onClick={onClose}>Close</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ViewHistoryModal;

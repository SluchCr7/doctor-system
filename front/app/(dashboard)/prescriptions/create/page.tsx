"use client";
import React from "react";
import { FiPlusSquare } from "react-icons/fi";

const CreatePrescription = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-2xl font-bold text-slate-800">New Prescription</h1>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <FiPlusSquare className="w-8 h-8" />
                    </div>
                    <p>Prescription Writer Component Here</p>
                    <div className="text-sm mt-2 max-w-md">
                        Fields: Patient Select, Medicine Search (API), Dosage, Duration, Instructions, Print Preview.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePrescription;

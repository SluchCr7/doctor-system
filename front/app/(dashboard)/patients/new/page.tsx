"use client";
import React from "react";
import { FiUser } from "react-icons/fi";

const AddPatientPage = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Add New Patient</h1>
                    <p className="text-slate-500 text-sm">Register a new patient to the clinic system</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <FiUser className="w-8 h-8" />
                    </div>
                    <p>Patient Registration Form Component Here</p>
                    <p className="text-sm">Includes: Personal Info, Contact, Emergency Contact, Medical History</p>
                </div>
            </div>
        </div>
    );
};

export default AddPatientPage;

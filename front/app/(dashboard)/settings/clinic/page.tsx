"use client";
import React from "react";
import { clinicDoctor } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { FiGlobe, FiMapPin, FiMail, FiPhone } from "react-icons/fi";

const ClinicInfoSettings = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4">Clinic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Clinic Name</label>
                            <input
                                type="text"
                                defaultValue="Alexander Hayes Memorial Clinic"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Official Website</label>
                            <div className="relative">
                                <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    defaultValue="www.alexanderclinic.com"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Physical Address</label>
                            <div className="relative">
                                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    defaultValue={clinicDoctor.address}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Primary Contact Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    defaultValue="contact@alexanderclinic.com"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Phone Number</label>
                            <div className="relative">
                                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    defaultValue={clinicDoctor.phone}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end gap-4">
                    <Button variant="outline">Reset Changes</Button>
                    <Button>Save Settings</Button>
                </div>
            </div>
        </div>
    );
};

export default ClinicInfoSettings;

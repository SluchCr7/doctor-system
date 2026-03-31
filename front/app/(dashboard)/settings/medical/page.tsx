"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { FiHeart, FiPlus, FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { HiOutlineBeaker, HiOutlineExclamationTriangle } from "react-icons/hi2";

const commonConditions = ["Diabetes Type 2", "Hypertension", "Asthma", "Hypothyroidism", "Arthritis", "Anxiety Disorder"];
const commonAllergies = ["Penicillin", "Aspirin", "Sulfa Drugs", "Latex", "Peanuts", "Shellfish", "Bee Stings"];
const commonMeds = ["Metformin 500mg", "Lisinopril 10mg", "Atorvastatin 20mg", "Levothyroxine 50mcg", "Omeprazole 20mg"];

const MedicalHistorySettings = () => {
    const { user, updateProfile } = useAuth();
    const initData = user?.profileData?.medicalHistory || {};

    const [saved, setSaved] = useState(false);
    const [conditions, setConditions] = useState<string[]>(initData.conditions || ["Hypertension", "Type 2 Diabetes"]);
    const [allergies, setAllergies] = useState<string[]>(initData.allergies || ["Penicillin", "Latex"]);
    const [medications, setMedications] = useState<string[]>(initData.medications || ["Metformin 500mg – twice daily", "Lisinopril 10mg – once daily"]);
    const [surgeries, setSurgeries] = useState(initData.surgeries || "Appendectomy (2018)");
    const [familyHistory, setFamilyHistory] = useState(initData.familyHistory || "Father: Coronary Heart Disease, Hypertension\nMother: Type 2 Diabetes");
    const [smoking, setSmoking] = useState(initData.smoking || "Never");
    const [alcohol, setAlcohol] = useState(initData.alcohol || "Occasional");
    const [exercise, setExercise] = useState(initData.exercise || "Moderate (3x/week)");

    useEffect(() => {
        if (user?.profileData?.medicalHistory) {
            const md = user.profileData.medicalHistory;
            if (md.conditions) setConditions(md.conditions);
            if (md.allergies) setAllergies(md.allergies);
            if (md.medications) setMedications(md.medications);
            if (md.surgeries) setSurgeries(md.surgeries);
            if (md.familyHistory) setFamilyHistory(md.familyHistory);
            if (md.smoking) setSmoking(md.smoking);
            if (md.alcohol) setAlcohol(md.alcohol);
            if (md.exercise) setExercise(md.exercise);
        }
    }, [user]);
    const [newCond, setNewCond] = useState("");
    const [newAllergy, setNewAllergy] = useState("");
    const [newMed, setNewMed] = useState("");

    const addItem = (list: string[], setList: (v: string[]) => void, val: string, setVal: (v: string) => void) => {
        if (val.trim() && !list.includes(val.trim())) { setList([...list, val.trim()]); setVal(""); }
    };
    const removeItem = (list: string[], setList: (v: string[]) => void, item: string) =>
        setList(list.filter(x => x !== item));

    const save = async () => { 
        try {
            await updateProfile({
                profileData: {
                    ...user?.profileData,
                    medicalHistory: { conditions, allergies, medications, surgeries, familyHistory, smoking, alcohol, exercise }
                }
            });
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000); 
        } catch (error) {
            console.error(error);
        }
    };

    const TagInput = ({ label, color, items, onRemove, newVal, setNew, onAdd, suggestions }: any) => (
        <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
            <div className="flex flex-wrap gap-2">
                {items.map((item: string) => (
                    <span key={item} className={`flex items-center gap-1.5 px-3 py-1.5 ${color} text-xs font-bold rounded-full border`}>
                        {item}
                        <button onClick={() => onRemove(item)} className="hover:opacity-60 transition-opacity"><FiX className="w-3 h-3" /></button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input value={newVal} onChange={e => setNew(e.target.value)} onKeyDown={e => e.key === "Enter" && onAdd()}
                    placeholder={`Add ${label.toLowerCase()}…`}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                <button onClick={onAdd} className="w-9 h-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shrink-0">
                    <FiPlus className="w-4 h-4" />
                </button>
            </div>
            {suggestions && (
                <div className="flex flex-wrap gap-1.5">
                    {suggestions.filter((s: string) => !items.includes(s)).slice(0, 4).map((s: string) => (
                        <button
                            key={s}
                            className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-bold rounded-full hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all"
                            onMouseDown={e => {
                                e.preventDefault();
                                if (!items.includes(s)) onAdd(s);
                            }}
                        >+ {s}</button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Active Conditions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-1 flex items-center gap-2">
                    <FiHeart className="w-4 h-4 text-red-500" /> Chronic Conditions &amp; Diagnoses
                </h3>
                <p className="text-xs text-slate-500 mb-5">Current ongoing medical conditions confirmed by a physician</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {conditions.map((c: string) => (
                        <span key={c} className="flex items-center gap-1.5 px-3.5 py-2 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-full">
                            <FiHeart className="w-3 h-3" /> {c}
                            <button onClick={() => removeItem(conditions, setConditions, c)} className="hover:text-red-800"><FiX className="w-3 h-3" /></button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2 mb-3">
                    <input value={newCond} onChange={e => setNewCond(e.target.value)} onKeyDown={e => e.key === "Enter" && addItem(conditions, setConditions, newCond, setNewCond)}
                        placeholder="Add condition (e.g. Hypertension)…"
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                    <button onClick={() => addItem(conditions, setConditions, newCond, setNewCond)}
                        className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                        <FiPlus className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {commonConditions.filter((c: string) => !conditions.includes(c)).map((c: string) => (
                        <button key={c} onClick={() => setConditions((prev: string[]) => [...prev, c])}
                            className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-bold rounded-full hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all">
                            + {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Allergies */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-1 flex items-center gap-2">
                    <HiOutlineExclamationTriangle className="w-4 h-4 text-amber-500" /> Allergies &amp; Intolerances
                </h3>
                <p className="text-xs text-slate-500 mb-5">Drug, food and environmental allergies — critical for safe treatment</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {allergies.map((a: string) => (
                        <span key={a} className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold rounded-full">
                            <FiAlertCircle className="w-3 h-3" /> {a}
                            <button onClick={() => removeItem(allergies, setAllergies, a)} className="hover:text-amber-900"><FiX className="w-3 h-3" /></button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2 mb-3">
                    <input value={newAllergy} onChange={e => setNewAllergy(e.target.value)} onKeyDown={e => e.key === "Enter" && addItem(allergies, setAllergies, newAllergy, setNewAllergy)}
                        placeholder="Add allergy (e.g. Penicillin)…"
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                    <button onClick={() => addItem(allergies, setAllergies, newAllergy, setNewAllergy)}
                        className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all">
                        <FiPlus className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {commonAllergies.filter((a: string) => !allergies.includes(a)).map((a: string) => (
                        <button key={a} onClick={() => setAllergies((prev: string[]) => [...prev, a])}
                            className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-bold rounded-full hover:border-amber-200 hover:text-amber-600 hover:bg-amber-50 transition-all">
                            + {a}
                        </button>
                    ))}
                </div>
            </div>

            {/* Current Medications */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-1 flex items-center gap-2">
                    <HiOutlineBeaker className="w-4 h-4 text-primary" /> Current Medications
                </h3>
                <p className="text-xs text-slate-500 mb-5">All active prescriptions and supplements</p>
                <div className="space-y-2 mb-4">
                    {medications.map((m: string) => (
                        <div key={m} className="flex items-center justify-between p-3 bg-primary/5 border border-primary/10 rounded-xl">
                            <span className="text-sm font-bold text-primary">{m}</span>
                            <button onClick={() => removeItem(medications, setMedications, m)} className="text-primary/40 hover:text-red-500 transition-colors">
                                <FiX className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input value={newMed} onChange={e => setNewMed(e.target.value)} onKeyDown={e => e.key === "Enter" && addItem(medications, setMedications, newMed, setNewMed)}
                        placeholder="e.g. Metformin 500mg – once daily…"
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all" />
                    <button onClick={() => addItem(medications, setMedications, newMed, setNewMed)}
                        className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                        <FiPlus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Surgical History & Family */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-5">History &amp; Lifestyle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Surgical History</label>
                        <textarea value={surgeries} onChange={e => setSurgeries(e.target.value)} rows={3}
                            placeholder="List past surgeries with approximate dates…"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all resize-none" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Family Medical History</label>
                        <textarea value={familyHistory} onChange={e => setFamilyHistory(e.target.value)} rows={3}
                            placeholder="Known hereditary conditions in immediate family…"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all resize-none" />
                    </div>

                    {[
                        { label: "Smoking Status", val: smoking, set: setSmoking, options: ["Never", "Former Smoker", "Occasional", "Daily"] },
                        { label: "Alcohol Consumption", val: alcohol, set: setAlcohol, options: ["Never", "Occasional", "Moderate", "Heavy"] },
                        { label: "Exercise Frequency", val: exercise, set: setExercise, options: ["Sedentary", "Light (1-2x/week)", "Moderate (3x/week)", "Active (5x/week)", "Athlete"] },
                    ].map(f => (
                        <div key={f.label} className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{f.label}</label>
                            <select value={f.val} onChange={e => f.set(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all">
                                {f.options.map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                {saved && (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                        <FiCheckCircle className="w-4 h-4" /> Medical history saved
                    </span>
                )}
                <div className={`flex gap-3 ${saved ? "" : "ml-auto"}`}>
                    <Button variant="outline">Discard</Button>
                    <Button onClick={save} leftIcon={<FiHeart className="w-4 h-4" />}>Save Medical History</Button>
                </div>
            </div>
        </div>
    );
};

export default MedicalHistorySettings;

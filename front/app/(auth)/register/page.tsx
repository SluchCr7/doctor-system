'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Mail, Lock, User, Phone, MapPin, Briefcase, 
  GraduationCap, ArrowRight, Building2, Eye, EyeOff,
  Stethoscope, HeartPulse, ShieldCheck
} from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [viewPassword, setViewPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileData: {
      phone: '',
      address: '',
      specialization: '',
      qualifications: '',
      clinicName: '',
      clinicAddress: '',
      age: 0,
      gender: 'male'
    }
  });

  const { register, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('profileData.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        profileData: { ...prev.profileData, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ ...formData, role });
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Form Section - Left Side */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8 md:p-16 bg-slate-50 relative overflow-y-auto">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none lg:hidden" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-2xl relative z-10 py-12"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <HeartPulse className="text-primary w-8 h-8" />
            <span className="text-xl font-black text-slate-900 italic">Doc<span className="text-primary not-italic">Sync</span></span>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3 italic">System <span className="text-primary not-italic underline decoration-slate-200 decoration-8 underline-offset-[-2px]">Initialization</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Create your professional health profile</p>
          </div>

          {/* Role Toggle */}
          <div className="flex p-1.5 bg-slate-200/50 rounded-[1.5rem] mb-10 max-w-sm">
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-[1.25rem] transition-all ${role === 'patient' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Patient Portal
            </button>
            <button
              type="button"
              onClick={() => setRole('doctor')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-[1.25rem] transition-all ${role === 'doctor' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Clinician Hub
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* General Fields */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Designation</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                    placeholder="Dr. Alexander Hayes"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Communication Channel</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                    placeholder="name@clinic.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={viewPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setViewPassword(!viewPassword)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-primary transition-colors"
                  >
                    {viewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Contact</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    name="profileData.phone"
                    value={formData.profileData.phone}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                    placeholder="+1 (212) 555-0199"
                    required
                  />
                </div>
              </div>

              {/* Role Specific Fields */}
              {role === 'doctor' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Medical Specialty</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <Stethoscope size={18} />
                      </div>
                      <input
                        type="text"
                        name="profileData.specialization"
                        value={formData.profileData.specialization}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                        placeholder="Interventional Cardiology"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Degrees & Titles</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <GraduationCap size={18} />
                      </div>
                      <input
                        type="text"
                        name="profileData.qualifications"
                        value={formData.profileData.qualifications}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                        placeholder="MD, PhD, FACC"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-[2px] bg-primary rounded-full" />
                      <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Clinical Facility Data</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Facility Name</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                            <Building2 size={18} />
                          </div>
                          <input
                            type="text"
                            name="profileData.clinicName"
                            value={formData.profileData.clinicName}
                            onChange={handleChange}
                            className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                            placeholder="Grand Central Medical"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Location</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                            <MapPin size={18} />
                          </div>
                          <input
                            type="text"
                            name="profileData.clinicAddress"
                            value={formData.profileData.clinicAddress}
                            onChange={handleChange}
                            className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                            placeholder="789 Wellness St, Suite 500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chronological Age (Optional)</label>
                    <input
                      type="number"
                      name="profileData.age"
                      value={formData.profileData.age || ''}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                      placeholder="25"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Biological Gender</label>
                    <select
                      name="profileData.gender"
                      value={formData.profileData.gender}
                      onChange={handleChange}
                      className="block w-full px-5 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2394a3b8%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1.25rem_center] bg-no-repeat"
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Personal Mailing Address (Optional)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    name="profileData.address"
                    value={formData.profileData.address}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                    placeholder="123 Medical Dr, New York, NY"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-primary hover:shadow-primary/40 active:scale-[0.99] transition-all disabled:opacity-70 flex items-center justify-center gap-3 overflow-hidden group mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Engage Deployment
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Protocol Secured</span>
            </div>
            
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
              Existing operator?{' '}
              <Link href="/login" className="text-primary hover:text-secondary underline decoration-primary/20 decoration-2 underline-offset-4">
                Access Terminal
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Visual Section - Right Side */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex lg:w-2/5 relative bg-slate-900"
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/40 to-secondary/10 z-10 mix-blend-multiply" />
        <img 
          src="/images/auth/register-bg.png" 
          alt="Health Tech" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-75 transition-transform duration-10000 hover:scale-110"
        />
        
        {/* Branding Overlay */}
        <div className="relative z-20 flex flex-col justify-end p-16 w-full h-full">
          <div className="max-w-md">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-8">
              <Stethoscope className="text-primary w-7 h-7" />
            </div>
            <h2 className="text-4xl font-black text-white leading-tight mb-4 italic">
              Digital health <br />
              ecosystem <br />
              <span className="text-primary not-italic">reimagined.</span>
            </h2>
            <div className="h-1 w-20 bg-primary/50 rounded-full mb-6" />
            <p className="text-slate-300 text-sm font-medium leading-relaxed uppercase tracking-[0.1em]">
              Join the future of medical <br /> management today.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

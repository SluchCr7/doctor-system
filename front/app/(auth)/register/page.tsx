'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, User, Phone, MapPin, Briefcase, GraduationCap, ArrowRight, Building2, Eye, EyeOff } from 'lucide-react';

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
      specialization: '', // Doctor only
      qualifications: '', // Doctor only
      clinicName: '', // Doctor only
      clinicAddress: '', // Doctor only
      age: 0, // Patient only
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
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 border border-slate-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2">Join our medical network today</p>
        </div>

        {/* Role Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
          <button
            onClick={() => setRole('patient')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${role === 'patient' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            I&apos;m a Patient
          </button>
          <button
            onClick={() => setRole('doctor')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${role === 'doctor' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            I&apos;m a Doctor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Fields */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                placeholder="Dr. Alexander Hayes"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                placeholder="doctor@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={viewPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setViewPassword(!viewPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-colors"
              >
                {viewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                name="profileData.phone"
                value={formData.profileData.phone}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
          </div>

          {/* Role Specific Fields */}
          {role === 'doctor' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Specialization</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <Briefcase size={18} />
                  </div>
                  <input
                    type="text"
                    name="profileData.specialization"
                    value={formData.profileData.specialization}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                    placeholder="General Internal Medicine"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Qualifications</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <GraduationCap size={18} />
                  </div>
                  <input
                    type="text"
                    name="profileData.qualifications"
                    value={formData.profileData.qualifications}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                    placeholder="MD, Board Certified"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2 mt-4 space-y-4">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Building2 size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Clinic Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Clinic Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <Building2 size={18} />
                      </div>
                      <input
                        type="text"
                        name="profileData.clinicName"
                        value={formData.profileData.clinicName}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                        placeholder="Grand Central Medical"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Clinic Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <MapPin size={18} />
                      </div>
                      <input
                        type="text"
                        name="profileData.clinicAddress"
                        value={formData.profileData.clinicAddress}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
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
                <label className="text-sm font-semibold text-slate-700 ml-1">Age</label>
                <input
                  type="number"
                  name="profileData.age"
                  value={formData.profileData.age}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  placeholder="25"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Gender</label>
                <select
                  name="profileData.gender"
                  value={formData.profileData.gender}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2394a3b8%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat"
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
            <label className="text-sm font-semibold text-slate-700 ml-1">Postal Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                name="profileData.address"
                value={formData.profileData.address}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                placeholder="123 Medical Dr, New York, NY"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Register Account
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-primary hover:underline underline-offset-4 cursor-pointer">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

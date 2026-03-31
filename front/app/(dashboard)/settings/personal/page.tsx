'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  User, Mail, Phone, MapPin, Camera, Save,
  Briefcase, GraduationCap, Calendar, Droplet,
  Users, Building2, DollarSign, Globe, Clock,
  Stethoscope, HeartPulse, X, Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

type Tab = 'personal' | 'professional' | 'clinic' | 'medical';

export default function PersonalInfoSettings() {
  const { user, loading: authLoading, updateProfile, uploadProfileImage } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [saving, setSaving] = useState(false);
  const [langInput, setLangInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    profileImage: '',
    profileData: {
      phone: '',
      address: '',
      gender: 'male' as 'male' | 'female' | 'other',
      specialization: '',
      qualifications: '',
      experience: '',
      bio: '',
      languages: [] as string[],
      clinicName: '',
      clinicAddress: '',
      consultationFee: '',
      age: '',
      bloodType: '',
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        profileImage: user.profileImage || '',
        profileData: {
          phone: user.profileData?.phone || '',
          address: user.profileData?.address || '',
          gender: user.profileData?.gender || 'male',
          specialization: user.profileData?.specialization || '',
          qualifications: user.profileData?.qualifications || '',
          experience: user.profileData?.experience ?? '',
          bio: user.profileData?.bio || '',
          languages: user.profileData?.languages || [],
          clinicName: user.profileData?.clinicName || '',
          clinicAddress: user.profileData?.clinicAddress || '',
          consultationFee: user.profileData?.consultationFee ?? '',
          age: user.profileData?.age ?? '',
          bloodType: user.profileData?.bloodType || '',
        }
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (['name', 'profileImage'].includes(name)) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        profileData: { ...prev.profileData, [name]: value }
      }));
    }
  };

  const addLanguage = () => {
    const lang = langInput.trim();
    if (!lang) return;
    if (formData.profileData.languages.includes(lang)) {
      toast.error('Language already added');
      return;
    }
    setFormData(prev => ({
      ...prev,
      profileData: {
        ...prev.profileData,
        languages: [...prev.profileData.languages, lang]
      }
    }));
    setLangInput('');
  };

  const removeLanguage = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      profileData: {
        ...prev.profileData,
        languages: prev.profileData.languages.filter(l => l !== lang)
      }
    }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);

      try {
        await uploadProfileImage(file);
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = {
        name: formData.name,
        profileImage: (formData.profileImage && !formData.profileImage.startsWith('data:image')) ? formData.profileImage : undefined,
        profileData: {
          phone: formData.profileData.phone || undefined,
          address: formData.profileData.address || undefined,
          gender: formData.profileData.gender || undefined,
        }
      };

      if (user?.role === 'doctor') {
        Object.assign(payload.profileData, {
          specialization: formData.profileData.specialization || undefined,
          qualifications: formData.profileData.qualifications || undefined,
          experience: formData.profileData.experience !== '' ? Number(formData.profileData.experience) : undefined,
          bio: formData.profileData.bio || undefined,
          languages: formData.profileData.languages.length ? formData.profileData.languages : undefined,
          clinicName: formData.profileData.clinicName || undefined,
          clinicAddress: formData.profileData.clinicAddress || undefined,
          consultationFee: formData.profileData.consultationFee !== '' ? Number(formData.profileData.consultationFee) : undefined,
        });
      } else if (user?.role === 'patient') {
        Object.assign(payload.profileData, {
          age: formData.profileData.age !== '' ? Number(formData.profileData.age) : undefined,
          bloodType: formData.profileData.bloodType || undefined,
        });
      }

      await updateProfile(payload);
    } catch (error: any) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  const isDoctor = user.role === 'doctor';

  const tabs: { id: Tab; label: string; icon: React.ReactNode; show: boolean }[] = [
    { id: 'personal' as Tab, label: 'Personal Info', icon: <User size={16} />, show: true },
    { id: 'professional' as Tab, label: 'Professional', icon: <Stethoscope size={16} />, show: isDoctor },
    { id: 'clinic' as Tab, label: 'Clinic Details', icon: <Building2 size={16} />, show: isDoctor },
    { id: 'medical' as Tab, label: 'Medical Info', icon: <HeartPulse size={16} />, show: !isDoctor },
  ].filter(t => t.show);

  const InputField = ({
    label, name, value, placeholder = '', type = 'text', icon, disabled = false,
    onChange
  }: {
    label: string; name: string; value: string | number; placeholder?: string;
    type?: string; icon?: React.ReactNode; disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-600">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        )}
        <input
          name={name}
          value={value as string}
          onChange={onChange || handleChange}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${icon ? 'pl-10' : 'px-4'} pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in w-full">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left: Avatar Card */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center gap-4">
              <div className="relative group">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={formData.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity cursor-pointer">
                  <Camera className="text-white w-6 h-6" />
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">{user.name}</h2>
                <span className="inline-block mt-1 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
              <div className="w-full pt-3 border-t border-slate-100 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.profileData?.phone && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Phone size={14} className="text-slate-400 flex-shrink-0" />
                    <span>{user.profileData.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Image URL Fallback */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Or Provide Image URL</label>
              <input
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Right: Tabs + Form */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-1.5 flex gap-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 whitespace-nowrap flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">

              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Full Name" name="name" value={formData.name} placeholder="Name" icon={<User size={15} />} />
                    <InputField label="Email Address" name="email" value={user.email} disabled icon={<Mail size={15} />} />
                    <InputField label="Phone Number" name="phone" value={formData.profileData.phone} placeholder="+1 234 567 8900" icon={<Phone size={15} />} />
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-600">Gender</label>
                      <div className="relative">
                        <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                          name="gender"
                          value={formData.profileData.gender}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Address</label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <textarea
                        name="address"
                        value={formData.profileData.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'professional' && isDoctor && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Specialization" name="specialization" value={formData.profileData.specialization} icon={<Briefcase size={15} />} />
                    <InputField label="Qualifications" name="qualifications" value={formData.profileData.qualifications} icon={<GraduationCap size={15} />} />
                    <InputField label="Years of Experience" name="experience" type="number" value={formData.profileData.experience} icon={<Clock size={15} />} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Professional Bio</label>
                    <textarea
                      name="bio"
                      value={formData.profileData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Languages Spoken</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          value={langInput}
                          onChange={e => setLangInput(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                          placeholder="Add a language..."
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={addLanguage}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-xl font-semibold"
                      >
                         <Plus size={16} />
                      </button>
                    </div>
                    {formData.profileData.languages.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.profileData.languages.map(lang => (
                          <span key={lang} className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                            {lang}
                            <button type="button" onClick={() => removeLanguage(lang)} className="hover:text-red-500 transition-colors">
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'clinic' && isDoctor && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <InputField label="Clinic / Hospital Name" name="clinicName" value={formData.profileData.clinicName} icon={<Building2 size={15} />} />
                    </div>
                    <InputField label="Consultation Fee ($)" name="consultationFee" type="number" value={formData.profileData.consultationFee} icon={<DollarSign size={15} />} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Clinic Address</label>
                    <textarea
                      name="clinicAddress"
                      value={formData.profileData.clinicAddress}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'medical' && !isDoctor && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Age" name="age" type="number" value={formData.profileData.age} icon={<Calendar size={15} />} />
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-600">Blood Type</label>
                      <div className="relative">
                        <Droplet size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                          name="bloodType"
                          value={formData.profileData.bloodType}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                        >
                          <option value="">Select blood type</option>
                          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => (
                            <option key={bt} value={bt}>{bt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={saving || authLoading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-60"
                >
                  {saving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

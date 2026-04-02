'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  User, Mail, Phone, MapPin, Camera, Save,
  Users, Globe, FileText, Activity
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';

export default function PersonalInfoSettings() {
  const { user, loading: authLoading, updateProfile, uploadProfileImage } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    profileImage: '',
    profileData: {
      phone: '',
      address: '',
      gender: 'male' as 'male' | 'female' | 'other',
      bio: '',
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
          bio: user.profileData?.bio || '',
        }
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        profileData: { ...prev.profileData, [name]: value }
      }));
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      await updateProfile({
        name: formData.name,
        profileData: {
          phone: formData.profileData.phone || undefined,
          address: formData.profileData.address || undefined,
          gender: formData.profileData.gender || undefined,
          bio: formData.profileData.bio || undefined,
        }
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  const InputField = ({
    label, name, value, placeholder = '', type = 'text', icon: Icon, disabled = false,
  }: {
    label: string; name: string; value: string | number; placeholder?: string;
    type?: string; icon?: any; disabled?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
        )}
        <input
          name={name}
          value={value as string}
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-11' : 'px-4'} pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all placeholder:text-slate-300 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-700">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-sky-100 to-transparent relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_#0ea5e9_1px,_transparent_0)] bg-[size:20px_20px]" />
          </div>
          
          <div className="px-10 pb-10 relative">
            <div className="flex flex-col md:flex-row gap-8 items-end -mt-16 relative z-10">
              <div className="relative group p-1 bg-white rounded-[2.5rem] shadow-xl">
                <div className="w-32 h-32 rounded-[2.2rem] overflow-hidden bg-slate-100 relative">
                  <img
                    src={user.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {authLoading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                >
                  <Camera size={18} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              <div className="flex-1 pb-2">
                 <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h1>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest">
                       {user.role}
                    </span>
                 </div>
                 <p className="text-slate-400 font-bold text-sm tracking-wide">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Identity Section */}
              <div className="space-y-6">
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" /> Identity & Bio
                 </h3>
                 <InputField label="Full Name" name="name" value={formData.name} placeholder="Your legal name" icon={User} />
                 
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Personal Biography</label>
                    <textarea 
                       name="bio"
                       value={formData.profileData.bio}
                       onChange={handleChange}
                       placeholder="Tell patients or colleagues about your journey..."
                       className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all min-h-[160px] resize-none shadow-sm"
                    />
                 </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <Globe className="w-4 h-4 text-sky-500" /> Contact & Localization
                 </h3>
                 <InputField label="Phone Number" name="phone" value={formData.profileData.phone} placeholder="+1 (555) 000-0000" icon={Phone} />
                 
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender Identification</label>
                    <div className="relative group">
                       <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                       <select 
                         name="gender" 
                         value={formData.profileData.gender} 
                         onChange={handleChange}
                         className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2394a3b8%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat"
                       >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Address</label>
                    <div className="relative group">
                       <MapPin className="absolute left-4 top-4 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                       <textarea 
                          name="address"
                          value={formData.profileData.address}
                          onChange={handleChange}
                          placeholder="Your residential address..."
                          className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all min-h-[100px] resize-none shadow-sm"
                       />
                    </div>
                 </div>
              </div>
            </div>

            <div className="pt-10 flex justify-end gap-4">
               <button type="button" className="px-8 py-3.5 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
                  Discard
               </button>
               <Button 
                type="submit"
                disabled={saving || authLoading}
                className="px-10 py-3.5 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
               >
                 {saving ? (
                   <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                   </>
                 ) : (
                   <><Save size={16} /> Save Identity Details</>
                 )}
               </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import api from '@/context/api';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiFileText, FiUser } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: any;
}

const BookAppointmentModal = ({ isOpen, onClose, onSuccess, initialData }: BookAppointmentModalProps) => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: initialData?.doctorId?._id || '',
    date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
    time: initialData?.date ? new Date(initialData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '',
    notes: initialData?.notes || '',
  });

  useEffect(() => {
    if (isOpen && user?.role === 'patient') {
      const fetchDoctors = async () => {
        try {
          const res = await api.get('/patient/doctors');
          if (res.data.success) {
            setDoctors(res.data.data);
            if (res.data.data.length > 0 && !formData.doctorId) {
              setFormData(prev => ({ ...prev, doctorId: res.data.data[0]._id }));
            }
          }
        } catch (err) {
          toast.error('Could not load doctors');
        }
      };
      fetchDoctors();
    }
  }, [isOpen, user, formData.doctorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Combine date and time for backend
      const fullDate = new Date(`${formData.date}T${formData.time}`);
      
      let res;
      if (initialData?._id) {
        // Reschedule
        res = await api.patch(`/appointments/${initialData._id}`, {
          date: fullDate,
          notes: formData.notes
        });
      } else {
        // New booking
        res = await api.post('/appointments', {
          doctorId: formData.doctorId,
          date: fullDate,
          notes: formData.notes
        });
      }

      if (res.data.success) {
        toast.success('Your appointment request was sent successfully!');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <HiOutlineSparkles size={20} />
          </div>
          <span className="font-black text-slate-900">{initialData ? 'Update Session' : 'Schedule Session'}</span>
        </div>
      }
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-8 py-4">
        {/* Doctor Selection */}
        <div className="space-y-3">
          <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Select Professional</label>
          <div className="grid grid-cols-1 gap-3">
            {doctors.map((doc) => (
              <div 
                key={doc._id}
                onClick={() => handleChange('doctorId', doc._id)}
                className={`p-4 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center gap-4 ${formData.doctorId === doc._id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-slate-50 bg-slate-50/50 hover:border-slate-200'}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary font-bold shadow-sm">
                  {doc.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-slate-900">{doc.name}</p>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{doc.profileData?.specialization || 'Clinical Specialist'}</p>
                </div>
                {formData.doctorId === doc._id && (
                  <div className="ml-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Date of Visit" 
            type="date" 
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
            className="rounded-3xl bg-slate-50 border-0 focus:ring-primary/20"
          />
          <Input 
            label="Preferred Time" 
            type="time" 
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            required
            className="rounded-3xl bg-slate-50 border-0 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Reason for consultation</label>
          <textarea 
            rows={4}
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full rounded-[2rem] bg-slate-50 border-0 focus:ring-2 focus:ring-primary/20 p-6 text-sm font-bold text-slate-700 placeholder:text-slate-300 transition-all outline-none"
            placeholder="Please describe your symptoms briefly..."
          />
        </div>

        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-bold max-w-[240px]">
            By confirming, you agree to our clinic's cancellation policy.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" type="button" onClick={onClose} className="rounded-2xl font-bold px-8">Discard</Button>
            <Button type="submit" isLoading={loading} className="rounded-2xl font-bold px-10 shadow-xl shadow-primary/30">Confirm Session</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default BookAppointmentModal;

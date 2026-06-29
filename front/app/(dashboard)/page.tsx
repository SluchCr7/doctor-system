'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import DoctorDashboard from '@/components/dashboard/DoctorDashboard';
import PatientDashboard from '@/components/dashboard/PatientDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
        {user?.role === 'admin' ? (
          <AdminDashboard user={user} />
        ) : user?.role === 'doctor' ? (
          <DoctorDashboard user={user} />
        ) : (
          <PatientDashboard user={user} />
        )}
      </div>
    </ProtectedRoute>
  );
}

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from './api';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  profileImage?: string;
  profileData?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (data: any) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.post('/auth/me');
        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Session check failed');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: any) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', credentials);
      if (response.data.success) {
        setUser(response.data.user);
        toast.success(`Welcome back, ${response.data.user.name}!`);

        // Redirect to dashboard
        router.push('/');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/register', data);
      if (response.data.success) {
        setUser(response.data.user);
        toast.success('Registration successful!');

        // Redirect to dashboard (role-specific view handled there)
        router.push('/');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: any) => {
    try {
      setLoading(true);
      const endpoint = user?.role === 'doctor' ? '/doctor/profile' : '/patient/profile';
      const response = await api.put(endpoint, data);
      if (response.data.success) {
        setUser(response.data.data);
        toast.success('Profile updated successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/auth/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setUser(response.data.data);
        toast.success(response.data.message || 'Profile image updated!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Image upload failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout error');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user, updateProfile, uploadProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

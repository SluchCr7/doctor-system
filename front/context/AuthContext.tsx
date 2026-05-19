'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  profileImage?: string;
  profileData?: Record<string, any>;
  theme?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: Record<string, any>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (data: Record<string, any>) => Promise<void>;
  updateAvailability: (data: Record<string, any>) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
  uploadClinicImage: (file: File) => Promise<void>;
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
        const response = await authService.me();
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
      const response = await authService.login(credentials);
      if (response.data.success) {
        setUser(response.data.data);
        toast.success(`Welcome back, ${response.data.data.name}!`);
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
      const response = await authService.register(data);
      if (response.data.success) {
        setUser(response.data.data);
        toast.success('Registration successful!');
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
      if (!user) {
        toast.error('No user session found');
        return;
      }

      setLoading(true);
      
      // Validate data structure
      if (!data || typeof data !== 'object') {
        toast.error('Invalid profile data');
        return;
      }

      const response = await authService.updateProfile(user?.role || 'patient', data);
      
      if (response.data.success) {
        setUser(response.data.data);
        toast.success(response.data.message || 'Profile updated successfully!');
      } else {
        toast.error(response.data.message || 'Failed to update profile');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Profile update failed';
      console.error('Profile update error:', error);
      toast.error(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateAvailability = async (data: any) => {
    try {
      if (!user) {
        toast.error('No user session found');
        return;
      }

      setLoading(true);
      
      if (!data || typeof data !== 'object') {
        toast.error('Invalid availability data');
        return;
      }

      const response = await authService.updateAvailability(data);
      
      if (response.data.success) {
        // Refresh user data to get updated availability
        const resMe = await authService.me();
        if (resMe.data.success) {
          setUser(resMe.data.data);
        }
        toast.success(response.data.message || 'Availability schedule updated!');
      } else {
        toast.error(response.data.message || 'Failed to update availability');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Availability update failed';
      console.error('Availability update error:', error);
      toast.error(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      if (!user) {
        toast.error('No user session found');
        return;
      }

      if (!file) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      setLoading(true);
      const response = await authService.uploadProfileImage(file);
      
      if (response.data.success) {
        setUser(response.data.data);
        toast.success(response.data.message || 'Profile image updated!');
      } else {
        toast.error(response.data.message || 'Failed to upload profile image');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Image upload failed';
      console.error('Profile image upload error:', error);
      toast.error(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadClinicImage = async (file: File) => {
    try {
      setLoading(true);
      const response = await authService.uploadClinicImage(file);
      if (response.data.success) {
        setUser(response.data.data);
        toast.success(response.data.message || 'Clinic image updated!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Clinic image upload failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout error');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user, updateProfile, updateAvailability, uploadProfileImage, uploadClinicImage }}>
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

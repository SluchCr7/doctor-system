import api from '@/context/api';

const authService = {
  me: () => api.get('/auth/me'),
  login: (credentials: { email: string; password: string }) => api.post('/auth/login', credentials),
  register: (data: any) => api.post('/auth/register', data),
  logout: () => api.get('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh-token', {}, { withCredentials: true }),
  updateProfile: (role: string, data: any) => {
    const endpoint = role === 'doctor' ? '/doctor/profile' : '/patient/profile';
    return api.put(endpoint, data);
  },
  updateAvailability: (data: any) => api.put('/doctor/availability', data),
  uploadProfileImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file, file.name);

    return api.post('/auth/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  uploadClinicImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file, file.name);

    return api.post('/auth/clinic-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateTheme: (theme: 'light' | 'dark') => api.patch('/auth/theme', { theme })
};

export default authService;

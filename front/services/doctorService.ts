import api from '@/context/api';

const doctorService = {
  getDashboard: () => api.get('/doctor/dashboard'),
  getPatients: () => api.get('/doctor/patients'),
  getDoctorById: (id: string) => api.get(`/doctor/${id}`),
  searchDoctors: (query: string) => api.get(`/doctor/search?q=${encodeURIComponent(query)}`),
};

export default doctorService;

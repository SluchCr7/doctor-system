import api from '@/context/api';

const patientService = {
  getDashboard: () => api.get('/patient/dashboard'),
  getDoctors: () => api.get('/patient/doctors'),
  getPatientById: (id: string) => api.get(`/patient/${id}`),
  updatePatientById: (id: string, data: any) => api.put(`/patient/${id}`, data),
  searchPatients: (query: string) => api.get(`/patient/search?q=${encodeURIComponent(query)}`),
};

export default patientService;

import api from '@/context/api';

const searchService = {
  findDoctors: (query: string) => api.get(`/doctor/search?q=${encodeURIComponent(query)}`),
  findPatients: (query: string) => api.get(`/patient/search?q=${encodeURIComponent(query)}`),
  findAppointments: (query: string) => api.get(`/appointments/search?q=${encodeURIComponent(query)}`),
};

export default searchService;

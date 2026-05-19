import api from '@/context/api';

const medicalService = {
  getRecords: (patientId?: string) => api.get(patientId ? `/medical?patientId=${encodeURIComponent(patientId)}` : '/medical'),
};

export default medicalService;

import api from '@/context/api';

export interface AppointmentPayload {
  doctorId: string;
  date: string | Date;
  notes?: string;
}

const appointmentService = {
  list: () => api.get('/appointments'),
  create: (payload: AppointmentPayload) => api.post('/appointments', payload),
  update: (id: string, payload: Pick<AppointmentPayload, 'date' | 'notes'>) => api.patch(`/appointments/${id}`, payload),
  cancel: (id: string) => api.delete(`/appointments/${id}`),
  respond: (id: string, action: 'accept' | 'reject') => api.patch(`/appointments/${id}/${action}`),
  listByPatient: (patientId: string) => api.get(`/appointments?patientId=${encodeURIComponent(patientId)}`),
};

export default appointmentService;

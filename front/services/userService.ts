import api from '@/context/api';

const userService = {
  registerPatient: (data: any) => api.post('/auth/register', data),
  updateUser: (id: string, data: any) => api.patch(`/admin/users/${id}`, data),
};

export default userService;

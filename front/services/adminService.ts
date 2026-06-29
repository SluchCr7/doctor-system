import api from '@/context/api';

const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
};

export default adminService;

import api from '@/context/api';

const financialService = {
  getInvoices: () => api.get('/financial/invoices'),
  getTransactions: () => api.get('/financial/transactions'),
  getStats: () => api.get('/financial/stats'),
  pay: (data: any) => api.post('/financial/pay', data),
};

export default financialService;

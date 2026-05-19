import api from '@/context/api';

const financialService = {
  getInvoices: () => api.get('/financial/invoices'),
};

export default financialService;

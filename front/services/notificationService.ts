import api from '@/context/api';

export interface NotificationPayload {
  _id: string;
  title: string;
  message: string;
  type: 'appointment' | 'medical_record' | 'invoice' | 'system' | 'message';
  isRead: boolean;
  createdAt: string;
}

const notificationService = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
};

export default notificationService;

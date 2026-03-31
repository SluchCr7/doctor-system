import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for handling token refreshes or common errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If token expired (401) and it's not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Try to refresh token
        await axios.post(`${api.defaults.baseURL}/auth/refresh-token`, {}, { withCredentials: true });
        return api(originalRequest);
      } catch (refreshError) {
        // Redirect to login or clear state
        console.error('Session expired');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

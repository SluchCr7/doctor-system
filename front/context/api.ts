import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Interceptor for handling token refreshes or common errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${api.defaults.baseURL}/auth/refresh-token`, {}, { withCredentials: true });
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Session expired');
        if (
          typeof window !== 'undefined' && 
          !window.location.pathname.startsWith('/login') &&
          !window.location.pathname.startsWith('/register') &&
          !window.location.pathname.startsWith('/forgot-password') &&
          !window.location.pathname.startsWith('/reset-password')
        ) {
          window.location.href = `/login?redirect=${window.location.pathname}`;
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

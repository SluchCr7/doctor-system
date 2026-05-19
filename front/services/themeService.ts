import api from '@/context/api';

type Theme = 'light' | 'dark';

const themeService = {
  updateTheme: (theme: Theme) => api.patch('/auth/theme', { theme }),
};

export default themeService;

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Interceptor to attach Authorization JWT token automatically
API.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    } catch (e) {
      console.error('Error parsing stored user auth state', e);
    }
  }
  return config;
});

export default API;

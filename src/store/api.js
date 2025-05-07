// API yapılandırması için ortak servis
import axios from 'axios';

// API Base URL
export const API_BASE_URL = 'https://phamorabackend-production.up.railway.app/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek göndermeden önce token kontrolü
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Cevap geldiğinde hata kontrolü
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Token geçersiz olduğunda (401 hatası)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 
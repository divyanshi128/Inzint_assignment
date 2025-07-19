import axios from 'axios';
import { BACKEND_BASE_URL } from './config';

const API_BASE = BACKEND_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

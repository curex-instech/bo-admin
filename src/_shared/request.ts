import axios, { type InternalAxiosRequestConfig } from 'axios';
import { API_SERVER } from 'src/environment';
import { STORAGE_KEYS } from './constants';
import { getEncryptedItem, removeEncryptedItem } from './storage';

export const request = axios.create({
  baseURL: API_SERVER,
  // withCredentials: true,
});

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getEncryptedItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// TODO: add response interceptor
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      removeEncryptedItem(STORAGE_KEYS.USER_INFO);
      window.location.href = '/login-fallback';
    }
    return Promise.reject(error);
  },
);

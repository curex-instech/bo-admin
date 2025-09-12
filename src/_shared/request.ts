import axios, { type InternalAxiosRequestConfig } from 'axios';
import { API_SERVER } from 'src/environment';
import { getEncryptedItem } from './storage';

export const request = axios.create({
  baseURL: API_SERVER,
  withCredentials: true,
});

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getEncryptedItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

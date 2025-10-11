import axios, { type AxiosError } from 'axios';
import { STORAGE_KEYS } from './constants';
import { removeEncryptedItem } from './storage';

export const request = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const requestUrl = error?.config?.url;
    console.log('requestUrl', requestUrl);
    if (error?.response?.status === 401) {
      removeEncryptedItem(STORAGE_KEYS.USER_INFO);
      if (requestUrl !== '/api/auth/login/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);

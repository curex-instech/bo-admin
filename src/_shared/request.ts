import axios from 'axios';
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
  (error) => {
    if (error.response.status === 401) {
      removeEncryptedItem(STORAGE_KEYS.USER_INFO);
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

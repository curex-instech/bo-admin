import { encryptData, decryptData, encryptKey } from './encryption';

export const setEncryptedItem = (key: any, value: any) => {
  const encryptedKey = encryptKey(key) as string;
  const encryptedValue = encryptData(JSON.stringify(value));
  if (encryptedValue) {
    localStorage.setItem(encryptedKey, encryptedValue);
  }
};

export const getEncryptedItem = (key: any) => {
  const encryptedKey = encryptKey(key) as string;
  const encryptedValue = localStorage.getItem(encryptedKey);
  if (encryptedValue) {
    return JSON.parse(decryptData(encryptedValue));
  }
  return null;
};

export const removeEncryptedItem = (key: any) => {
  const encryptedKey = encryptKey(key);
  if (encryptedKey) {
    localStorage.removeItem(encryptedKey);
  }
};

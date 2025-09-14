declare let __ENV__: 'test' | 'uat' | 'live';
declare let __LOCALE__: 'vn' | 'id' | 'th';
declare let __PUBLIC_PATH__: string;
declare let __GIT_HASH__: string;
declare let __NODE_ENV__: string;

export const ENV = __ENV__;
export const NODE_ENV = __NODE_ENV__;
export const LOCALE = __LOCALE__;
export const PUBLIC_PATH = __PUBLIC_PATH__;
export const GIT_HASH =
  typeof __GIT_HASH__ === 'string' ? __GIT_HASH__ : undefined;

// App config
export const HOST = import.meta.env.VITE_APP_HOST;
export const API_SERVER = import.meta.env.VITE_API_SERVER;
export const LOCAL_PORT = import.meta.env.VITE_APP_LOCAL_PORT;

// Security
export const LOCAL_STORAGE_SECRET_KEY = import.meta.env
  .VITE_SECURE_LOCAL_STORAGE_HASH_KEY;
export const LOCAL_STORAGE_IV_KEY = import.meta.env
  .VITE_SECURE_LOCAL_STORAGE_IV_KEY;

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

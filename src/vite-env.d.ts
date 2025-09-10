/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_AUTH_SERVER: string;
  readonly VITE_API_SERVER: string;
  readonly VITE_SECURE_LOCAL_STORAGE_HASH_KEY: string;
  readonly VITE_SECURE_LOCAL_STORAGE_IV_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

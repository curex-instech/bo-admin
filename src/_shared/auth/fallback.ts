import type { UserLoginInfo } from '@mymind/banh-mi';
import { STORAGE_KEYS } from '../constants';
import { getEncryptedItem, removeEncryptedItem } from '../storage';

export const fallbackOAuthConfig = {
  fallbackFunctions: {
    /**
     * Check if user is logged in - should be fast and reliable
     * The wrapper calls this first to determine auth state
     */
    isLoggedInFallback: async (): Promise<boolean> => {
      return true;
    },

    getLoginInfoFallback: async (): Promise<UserLoginInfo | null> => {
      const data = getEncryptedItem(STORAGE_KEYS.USER_INFO);
      console.log('data', data);
      return data;
    },

    goLoginFallback: async (returnUrl?: string): Promise<void> => {},

    goLogoutFallback: async (): Promise<void> => {
      // try {
      //   // Optional: notify backend about logout
      //   await request.post('/api/auth/logout');
      // } catch (error) {
      //   console.warn('Backend logout failed:', error);
      // }
      // Clear local storage
      removeEncryptedItem(STORAGE_KEYS.USER_INFO);
      // Redirect to home
      window.location.href = '/';
    },
  },
};

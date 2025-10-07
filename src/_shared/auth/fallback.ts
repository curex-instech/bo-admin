import type { UserLoginInfo } from '@mymind/banh-mi';
import { STORAGE_KEYS } from '../constants';
import { request } from '../request';
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
      return data;
    },

    goLoginFallback: async (returnUrl?: string): Promise<void> => {},

    goLogoutFallback: async (): Promise<void> => {
      try {
        await request.post('/api/auth/logout/');
        // Clear local storage
        removeEncryptedItem(STORAGE_KEYS.USER_INFO);
        // Redirect to home
        window.location.href = '/';
      } catch (error) {
        console.warn('Backend logout failed:', error);
      }
    },
  },
};

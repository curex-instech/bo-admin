import { useCallback, useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    async <T>(asyncFunction: () => Promise<T>): Promise<T | undefined> => {
      setLoading(true);
      try {
        const result = await asyncFunction();
        return result;
      } catch (error) {
        console.error(error);
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { loading, withLoading };
};

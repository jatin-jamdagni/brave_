import { useState, useCallback } from 'react';
import DeviceInfo from 'react-native-device-info';

export const useAndroidId = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [androidId, setAndroidId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchAndroidId = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const id = await DeviceInfo.getAndroidId();
      setAndroidId(id);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch Android ID'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, androidId, error, fetchAndroidId };
};


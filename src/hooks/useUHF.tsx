import {useState, useEffect, useCallback} from 'react';
import UHFBarcodeModule from './useUHFSdk';

const useUHFScanner = () => {
  const [scannedData, setScannedData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const initializeUHF = useCallback(async () => {
    try {
      await new Promise<void>((resolve, reject) => {
        UHFBarcodeModule.toggleScanMode(false, (message: string) => {
          console.log('UHF initialization message:', message);
          if (message.toLowerCase().includes('error')) {
            reject(new Error(message));
          } else {
            resolve();
          }
        });
      });

      const uhfListener = UHFBarcodeModule.addListener(
        'onUHFScanned',
        (event: {scannedData: string}) => {
          console.log('event onUHFScanned', event);
          const data = event.scannedData;

          // Update scannedData with unique keys
          setScannedData(prevData => {
            // Add the scanned data only if it's not already in the list
            if (!prevData.includes(data)) {
              return [...prevData, data];
            }
            return prevData;
          });
        },
      );

      setLoading(false);

      return () => {
        UHFBarcodeModule.removeListener(uhfListener);
      };
    } catch (error) {
      console.error('Failed to initialize UHF scanner:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const cleanup: any = initializeUHF();
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [initializeUHF]);

  return {scannedData, loading};
};

export default useUHFScanner;

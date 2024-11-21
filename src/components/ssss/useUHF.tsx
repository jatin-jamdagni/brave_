import {useState, useEffect, useCallback} from 'react';
import UHFBarcodeModule from '../../hooks/useUHFSdk';

type ScannedData = Record<string, number>;

const useUHFScanner = () => {
  const [scannedData, setScannedData] = useState<ScannedData>({});
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

          setScannedData(prevData => {
            const newData = {...prevData};
            if (newData[data]) {
              newData[data] += 1;
            } else {
              newData[data] = 1;
            }
            return newData;
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

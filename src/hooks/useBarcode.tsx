import {useState, useEffect} from 'react';
import UHFBarcodeModule from './useUHFSdk';

const useBarcodeScanner = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UHFBarcodeModule.toggleScanMode(true, (message: string) => {
      console.log('Scan mode toggled:', message);
      if (message.toLowerCase().includes('error')) {
        console.error('Error initializing scanner:', message);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    const uhfListener = UHFBarcodeModule.addListener(
      'onBarcodeScanned',
      (event: {scannedData: string}) => {
        console.log('Barcode scanned event:', event);
        setScannedData(event.scannedData);
      },
    );

    return () => {
      UHFBarcodeModule.removeListener(uhfListener);
    };
  }, []);

  return {scannedData, loading};
};

export default useBarcodeScanner;

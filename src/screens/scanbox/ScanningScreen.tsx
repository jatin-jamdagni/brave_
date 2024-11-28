import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AppWrapper from '../../components/AppWrapper';
import ScanningScreenComponent from '../../components/ScaningScreenComponent';
import {useModuleStore} from '../../store/entireModuleStore';
import useUHFScanner from '../../hooks/useUHF';
import {Color} from '../../constants/color';

const ScanningScreen = ({route}: any) => {
  const {toView} = route.params;
  const {scannedData, loading} = useUHFScanner();
  const {setEpcid} = useModuleStore();

  // const [uniqueScannedData, setUniqueScannedData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (scannedData.length > 0) {
      setIsLoading(true);

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }, [scannedData]);

  const handleEPCData = () => {
    setEpcid(scannedData);
  };

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <AppWrapper>
      <View style={styles.container}>
        {scannedData.length !== 0 && (
          <View
            style={[styles.loadingContainer, {backgroundColor: 'transparent'}]}>
            <Text style={{color: Color.lightGray, fontWeight: 'bold'}}>
              Total Scanned:{'  '}
              <Text style={{color: Color.primary}}>{scannedData.length}</Text>
            </Text>
          </View>
        )}
        {/* Activity Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.countText}>
              Total Unique Scanned Items: {scannedData.length}
            </Text>
          </View>
        )}

        <ScanningScreenComponent
          isScannedData={scannedData.length === 0 ? true : false}
          handleEPC={handleEPCData}
          toView={toView}
        />
      </View>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 135,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  countContainer: {
    marginBottom: 10,
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

export default ScanningScreen;

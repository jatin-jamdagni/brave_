import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import useUHFScanner from '../../hooks/useUHF';

const UHFTest = () => {
  // const [scannedData, setScannedData] = useState<{[key: string]: number}>({});
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const initializeUHF = async () => {
  //     try {
  //       await new Promise<void>((resolve, reject) => {
  //         UHFBarcodeModule.toggleScanMode(false, (message: string) => {
  //           console.log('UHF initialization message:', message);
  //           if (message.toLowerCase().includes('error')) {
  //             reject(new Error(message));
  //           } else {
  //             resolve();
  //           }
  //         });
  //       });

  //       const uhfListener = UHFBarcodeModule.addListener(
  //         'onUHFScanned',
  //         event => {
  //           console.log('event onUHFScanned', event);
  //           const data = event.scannedData;

  //           setScannedData(prevData => {
  //             const newData = {...prevData};
  //             if (newData[data]) {
  //               newData[data] += 1;
  //             } else {
  //               newData[data] = 1;
  //             }
  //             return newData;
  //           });
  //         },
  //       );

  //       setLoading(false);

  //       return () => {
  //         UHFBarcodeModule.removeListener(uhfListener);
  //       };
  //     } catch (error) {
  //       console.error('Failed to initialize UHF scanner:', error);
  //       setLoading(false);
  //     }
  //   };

  //   initializeUHF();
  // }, []);

  const {scannedData, loading} = useUHFScanner();

  const renderScannedData = () => {
    return scannedData.map(key => (
      <View key={key} style={styles.tableRow}>
        <Text style={styles.tableCell}>{key}</Text>
        {/* <Text style={styles.tableCell}>{scannedData[key]}</Text> */}
      </View>
    ));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.loadingText}>Initializing UHF Scanner...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scanned Data:</Text>
      <ScrollView style={styles.table}>{renderScannedData()}</ScrollView>
      <Text style={styles.distinctCount}>
        Total Distinct Entries: {Object.keys(scannedData).length}
      </Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter data to send"
        onChangeText={text => {
          setScannedData({
            ...scannedData,
            [text]: (scannedData[text] || 0) + 1,
          });
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  table: {
    maxHeight: 300,
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  tableCell: {
    color: 'black',
    fontSize: 16,
  },
  distinctCount: {
    marginTop: 10,
    fontSize: 18,
    color: 'black',
  },
  input: {
    marginTop: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    width: '90%',
    paddingHorizontal: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
  },
});

export default UHFTest;

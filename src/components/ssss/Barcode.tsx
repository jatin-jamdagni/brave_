import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import useBarcodeScanner from './useBarcode';

const BarcodeTest = () => {
  const {loading} = useBarcodeScanner();
  // useEffect(() => {
  //   UHFBarcodeModule.toggleScanMode(true, (message: any) => {
  //     console.log('this is msg:', message);
  //   });

  //   const uhfListener = UHFBarcodeModule.addListener(
  //     'onBarcodeScanned',
  //     event => {
  //       console.log('event onBarcodeScanned', event);
  //       const data = event.scannedData;

  //       setScannedData(data);
  //     },
  //   );

  //   return () => {
  //     UHFBarcodeModule.removeListener(uhfListener);
  //   };
  // }, []);
  // console.log('this is scannedData:', scannedData);

  const [scannedData, setScannedData] = React.useState('');
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Initializing UHF Scanner...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scanned Data: {scannedData}</Text>

      <TextInput
        style={styles.input}
        autoFocus
        placeholder="Enter data to send"
        onChangeText={text => setScannedData(text)}
      />
    </View>
  );
};

export default BarcodeTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  header: {
    fontSize: 20,
    // color: 'white',
    marginBottom: 10,
  },
  table: {
    maxHeight: 300,
    width: '90%',
    borderWidth: 1,
    // borderColor: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    // borderBottomColor: 'white',
  },
  tableCell: {
    // color: 'white',
    fontSize: 16,
  },
  distinctCount: {
    marginTop: 10,
    fontSize: 18,
    // color: '/white',
  },
  input: {
    marginTop: 20,
    height: 40,
    // borderColor: 'gray',
    borderWidth: 1,
    // color: 'white',
    width: '90%',
    paddingHorizontal: 10,
  },
});

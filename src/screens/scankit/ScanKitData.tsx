import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScanKitDataCard from '../../components/scankit/ScanKitDataCard';
import {IMAGE} from '../../constants/images';

export default function ScanKitData({navigation}: {navigation: any}) {
  const kitData = {
    kitName: 'Sample Kit',
    totalQuantity: 6,
    boxes: [
      {id: '1', number: 1, color: '#FFB3BA'},
      {id: '2', number: 2, color: '#BAFFC9'},
      {id: '3', number: 3, color: '#BAE1FF'},
      {id: '4', number: 4, color: '#FFFFBA'},
      {id: '5', number: 5, color: '#FFDFBA'},
      {id: '7', number: 7, color: '#FFB347'},
      {id: '6', number: 6, color: '#CBAACB'},
    ],
  };

  const handleDone = () => {
    console.log('Kit  configuration completed');
    navigation.navigate('HOME');
  };

  const handleBack = () => {
    console.log('Back button pressed');
    navigation.navigate('SCANANDIDENTIFY');
  };

  return (
    <View style={styles.container}>
      <ScanKitDataCard
        kitName={kitData.kitName}
        totalQuantity={kitData.totalQuantity}
        boxes={kitData.boxes}
        kitImage={IMAGE.PlaceholderImage}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 16,
    padding: 16,
  },
  doneButton: {
    backgroundColor: '#e6f2ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  doneButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

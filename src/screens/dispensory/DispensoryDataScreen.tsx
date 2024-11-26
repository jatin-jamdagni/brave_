import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AppWrapper from '../../components/AppWrapper';
import {IMAGE} from '../../constants/images';

export default function DispensoryDataScreen({navigation}: {navigation: any}) {
  const route = useRoute();
  const {action} = route.params as {action: 'add' | 'dispense'};

  const handleDone = () => {
    // Handle the done action here
    navigation.navigate('HOME');
  };

  const handleUndo = () => {
    // Handle the undo action here
    navigation.goBack();
  };

  return (
    <AppWrapper>
      <Image source={IMAGE.PlaceholderImage} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>
          {action === 'dispense' ? 'Dispense Medicine' : 'Add Medicine'}
        </Text>
        <Text style={styles.medicineTitle}>Paracetamol 650mg</Text>
        <Text style={styles.medicineInfo}>Med Quantity: 10</Text>
        <Text style={styles.detailsText}>
          Following are the details of the medicine:
        </Text>
        <Text style={styles.medicineInfo}>
          Previous Quantity: {action === 'dispense' ? '180' : '170'}
        </Text>
        <Text style={styles.medicineInfo}>
          Present Quantity: {action === 'dispense' ? '170' : '180'}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={handleUndo}>
            <Text style={styles.backButtonText}>Undo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  medicineInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  medicineTitle: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    marginBottom: 10,
  },
  image: {
    width: 'auto',
    height: 250,
    // resizeMode: 'contain',
    // marginBottom: 20,
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 16,
  },
  doneButton: {
    backgroundColor: '#e6f2ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
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

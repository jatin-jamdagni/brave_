import React from 'react';
import InstructionsCarousel from '../../components/carousel/InstructionsCarousel';
import {IMAGE} from '../../constants/images';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppWrapper from '../../components/AppWrapper';
import ScanbingScreenComponent from '../../components/ScaningScreenComponent';
import {useModuleStore} from '../../store/entireModuleStore';
import useUHFScanner from '../../hooks/useUHF';

const instructions = [
  {step: 'Pick the box you want to scan'},
  {step: 'Place the box in a well-lit area'},
  {step: 'Ensure the box is 10 feet away from other objects'},
];

function Card() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>How to Scan</Text>
      <View style={styles.imageContainer}>
        <Image source={IMAGE.hhttrigerImg} style={styles.image} />
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Instructions</Text>
        <ScrollView style={styles.instructionsList}>
          {instructions.map((instruction, index) => (
            <Text key={index} style={styles.instructionItem}>
              {index + 1}. {instruction.step}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const ScanningScreen = ({route}: any) => {
  const {toView} = route.params;

  const {scannedData, loading} = useUHFScanner();

  const {setEpcid} = useModuleStore();

  const handleEPCData = () => {
    setEpcid(scannedData);
  };
  return (
    <AppWrapper>
      <ScanbingScreenComponent handleEPC={handleEPCData} toView={toView} />
    </AppWrapper>
  );
};

export default ScanningScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {fontSize: 16, color: '#99aaa9', fontWeight: '500'},
  cardContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  cardtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  imageContainer: {
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
    aspectRatio: 4 / 3,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  instructionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructionsList: {
    maxHeight: 120,
  },
  instructionItem: {
    fontSize: 14,
    marginBottom: 4,
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
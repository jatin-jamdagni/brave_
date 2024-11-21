import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {modules} from '../../constants/module';
import ScanedUnitCard from '../../components/unit/ScannedUnitCard';
import AppWrapper from '../../components/AppWrapper';
import {CustomButton} from '../../components/ui/CustomButton';
import InfoMessage from '../../components/InfoMessage';

const UnitScannedScreen = ({navigation}: {navigation: any}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [boxes, setBoxes] = useState(() => {
    let boxesData: any[] = [];
    let boxCounter = 1;

    modules.forEach(module => {
      for (let i = 0; i < module.boxQuantity; i++) {
        if (boxCounter <= 55) {
          boxesData.push({
            id: `${module.id}-${i + 1}`,
            moduleId: module.id,
            boxNumber: boxCounter,
            color: module.colorHex,
            isFound: Math.random() > 0.1,
          });
          boxCounter++;
        }
      }
    });

    return boxesData;
  });

  const handleBoxPress = (boxData: any) => {
    console.log(
      `Box ${boxData.boxNumber} from Module ${boxData.moduleId} pressed`,
    );
    navigation.navigate('SINGLEBOXTABLE');

    // Add your logic here
  };
  return (
    <AppWrapper>
      <ScanedUnitCard boxes={boxes} onBoxPress={handleBoxPress} />

      <InfoMessage message="Click on box to view status of selected box." />
      <View style={styles.customButtonContainer}>
        <CustomButton
          buttonStyle={styles.buttonStyleBack}
          onPress={() => navigation.navigate('SCANBOX')}
          title="Back"
          textStyle={styles.backButtonText}
        />
        <CustomButton
          buttonStyle={styles.buttonStyleData}
          onPress={() => navigation.navigate('ENTIREUNITTABLE')}
          title="View Data"
        />
      </View>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  customButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 16,
    backgroundColor: '#EEEEEE',
    elevation: 5,
  },
  buttonStyleBack: {
    backgroundColor: '#e6f2ff',
    width: 100,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  backButtonText: {
    color: '#007AFF',
  },
  buttonStyleData: {
    backgroundColor: '#007AFF',
    width: 220,
  },
});

export default UnitScannedScreen;

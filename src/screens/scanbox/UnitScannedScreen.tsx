import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ScanedUnitCard from '../../components/unit/ScannedUnitCard';
import AppWrapper from '../../components/AppWrapper';
import {CustomButton} from '../../components/ui/CustomButton';
import InfoMessage from '../../components/InfoMessage';
import {useModuleStore} from '../../store/entireModuleStore';
import {getScannedUnitBoxesDataFromMainMaster} from '../../services/databaseService';
import {Color} from '../../constants/color';

const UnitScannedScreen = ({navigation}: {navigation: any}) => {
  const {epcId} = useModuleStore();
  const [boxes, setBoxes] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result: any = await getScannedUnitBoxesDataFromMainMaster(epcId);

      const transformedBoxes = result
        .sort((a: any, b: any) => a.mcepc.localeCompare(b.mcepc))
        .map((box: any) => ({
          id: `${box.ccno}`,
          moduleId: box.mcepc,
          boxNumber: box.ccno,
          color: box.color,
          isFound: box.status === 'active',
          status: box.status,
        }));

      setBoxes(transformedBoxes);
    };

    fetch();
  }, [epcId]);

  const handleBoxPress = (boxData: string) => {
    navigation.navigate('SINGLEBOXTABLE', {
      ccno: boxData,
    });
  };

  return (
    <AppWrapper>
      <ScanedUnitCard boxes={boxes} onBoxPress={handleBoxPress} />
      <InfoMessage message="Click on box to view the status of the selected box." />
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
    backgroundColor: Color.black,
    elevation: 5,
  },
  buttonStyleBack: {
    backgroundColor: Color.black,
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

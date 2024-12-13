import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScanKitDataCard from '../../components/scankit/ScanKitDataCard';
import {IMAGE} from '../../constants/images';
import {getSingleKitFromUnitFromMainMaster} from '../../services/databaseService';
import {useModuleStore} from '../../store/entireModuleStore';
import {Color} from '../../constants/color';

// Define TypeScript types
type Box = {
  id: number;
  number: number;
  color: string;
  quantity: number;
};

type KitData = {
  kitName: string;
  totalQuantity: number;
  boxes: Box[];
};

type ResponseData = {
  CC_NO: number;
  PACK_NAME: string;
  QTY: number;
  TOTAL_QTY: number;
  color: string;
};

export default function ScanKitData({navigation}: {navigation: any}) {
  const [kits, setKits] = useState<KitData[]>([]); // Multiple kits supported

  const handleDone = () => {
    navigation.navigate('HOME');
  };

  const handleBack = () => {
    navigation.navigate('SCANANDIDENTIFY');
  };

  const {epcId} = useModuleStore();

  useEffect(() => {
    const fetch = async () => {
      const response: ResponseData[] | any =
        await getSingleKitFromUnitFromMainMaster(epcId);

        console.log("this is response form the app for the kit scan",response )
      if (response && response.length > 0) {
        const processedKits = processResponseData(response);
        setKits(processedKits);
      }
    };

    fetch();
  }, [epcId]);

  // Process response into kits
  const processResponseData = (response: ResponseData[]): KitData[] => {
    const kitMap = new Map<string, KitData>();

    response.forEach(({PACK_NAME, TOTAL_QTY, CC_NO, QTY, color}) => {
      if (!kitMap.has(PACK_NAME)) {
        kitMap.set(PACK_NAME, {
          kitName: PACK_NAME,
          totalQuantity: TOTAL_QTY,
          boxes: [],
        });
      }

      const kit = kitMap.get(PACK_NAME)!;
      kit.boxes.push({id: CC_NO, number: CC_NO, color, quantity: QTY});
    });

    return Array.from(kitMap.values());
  };

  // Render only the first kit (if multiple exist)
  const activeKit = kits.length > 0 ? kits[0] : null;

  return (
    <View style={styles.container}>
      {activeKit ? (
        <ScanKitDataCard
          kitName={activeKit.kitName}
          totalQuantity={activeKit.totalQuantity}
          boxes={activeKit.boxes as any}
          kitImage={IMAGE.PlaceholderImage}
        />
      ) : (
        <Text style={styles.noDataText}>Kit not found.</Text>
      )}

      <View style={styles.buttonContainer}>
        {activeKit && (
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: Color.background,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  noDataText: {
    fontSize: 18,
    color: Color.error,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 16,
    padding: 16,
    width: '100%',
  },
  doneButton: {
    backgroundColor: Color.background,
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

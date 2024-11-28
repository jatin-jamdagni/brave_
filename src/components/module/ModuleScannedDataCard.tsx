import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {getContrastingColor} from '../../hooks/useContrastingColor';
import {getModulesBoxCountNoData} from '../../services/databaseService';
import {Color} from '../../constants/color';
import {useNavigation} from '@react-navigation/native';

type ModuleData = {
  boxQuantity: number;
  colorHex: string;
  description: string;
  epcId: string;
  id: string;
  image: number;
  name: string;
};

type ModuleScannedDataCardProps = {
  module: ModuleData;
  onCheckModule: (id: string) => void;
};

const ModuleScannedDataCard: React.FC<ModuleScannedDataCardProps> = ({
  module,
  onCheckModule,
}) => {
  const navigation: any = useNavigation();
  const [box, setBox] = useState<any[]>([]);

  useEffect(() => {
    const fetchId = async () => {
      const results: any = await getModulesBoxCountNoData(module.epcId);
      setBox(results);
      console.log('this is box getModulesBoxCountNoData', results);
    };
    fetchId();
  }, [module.epcId]);

  const handleBox = (ccno: string) => {
    navigation.navigate('SINGLEBOXTABLE', {
      ccno: ccno,
    });
  };

  const textColor = getContrastingColor(module.colorHex);

  // Separate BOX and non-BOX items
  const boxItems = box.filter(item => item.UNIT === 'BOX');
  const nonBoxItems = box.filter(item => item.UNIT !== 'BOX');

  const renderBox = ({item}: {item: any}) => (
    <TouchableOpacity
      onPress={() => handleBox(item.CC_NO)}
      style={[styles.box, {backgroundColor: module.colorHex}]}>
      <Text style={[styles.boxText, {color: textColor}]}>{item.CC_NO}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.card,
        {borderColor: module.colorHex, shadowColor: module.colorHex},
      ]}>
      <Text style={styles.moduleName}>{module.name}</Text>

      <View style={styles.flatListContainer}>
        <Text style={styles.totalBoxes}>Total Boxes: {module.boxQuantity}</Text>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.scrollViewContent}>
          {boxItems.length > 0 && (
            <FlatList
              data={boxItems}
              renderItem={renderBox}
              keyExtractor={(_, index) => `box-${index}`}
              numColumns={7}
              scrollEnabled={false} // Disable scrolling within FlatList
              contentContainerStyle={styles.boxesContainer}
            />
          )}
          {nonBoxItems.length > 0 && (
            <ScrollView horizontal={true} style={styles.nonBoxContainer}>
              {nonBoxItems.map((item, index) => (
                <TouchableOpacity
                  key={`nonbox-${index}`}
                  onPress={() => handleBox(item.CC_NO)}>
                  <Text
                    style={[
                      styles.nonBoxText,
                      {color: textColor, backgroundColor: module.colorHex},
                    ]}>
                    {item.UNIT} - {item.CC_NO}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={[styles.checkButton, {backgroundColor: module.colorHex}]}
        onPress={() => onCheckModule(module.epcId)}>
        <Text style={[styles.checkButtonText, {color: textColor}]}>
          {module.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.black,
    borderRadius: 10,
    borderWidth: 2,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 240,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: Color.primary,
  },
  totalBoxes: {
    fontSize: 14,
    marginBottom: 12,
    color: Color.secondary,
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxesContainer: {
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 10,
  },
  boxText: {
    color: Color.primary,
    fontWeight: 'bold',
  },
  nonBoxContainer: {
    flex: 1,
    marginVertical: 8,
    gap: 10,
    paddingHorizontal: 10,
  },
  nonBoxText: {
    fontSize: 14,
    height: 35,
    marginBottom: 4,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  checkButton: {
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  checkButtonText: {
    fontWeight: 'bold',
  },
});

export default ModuleScannedDataCard;

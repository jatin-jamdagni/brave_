import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
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
  const [box, setBox] = useState<ModuleScannedDataCardProps[]>();
  useEffect(() => {
    const fetchId = async () => {
      const results: any = await getModulesBoxCountNoData(module.epcId);
      setBox(results);
    };

    fetchId();
  }, [module.epcId]);

  const handleBox = (ccno: string) => {
    navigation.navigate('SINGLEBOXTABLE', {
      ccno: ccno,
    });
  };

  const textColor = getContrastingColor(module.colorHex);
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
        <FlatList
          data={box}
          renderItem={renderBox}
          keyExtractor={item => item.toString()}
          numColumns={7}
          scrollEnabled={true}
          contentContainerStyle={styles.boxesContainer}
        />
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
    height: 200,
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
    height: 82,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxesContainer: {
    marginBottom: 12,
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
  checkButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  checkButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ModuleScannedDataCard;

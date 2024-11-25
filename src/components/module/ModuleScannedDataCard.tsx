import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {getContrastingColor} from '../../hooks/useContrastingColor';
import {getModulesBoxCountNoData} from '../../services/databaseService';

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
  const [box, setBox] = useState<ModuleScannedDataCardProps[]>();
  useEffect(() => {
    const fetchId = async () => {
      const results: any = await getModulesBoxCountNoData(module.epcId);
      setBox(results);
    };

    fetchId();
  }, []);

  const textColor = getContrastingColor(module.colorHex);
  const renderBox = ({item}: {item: any}) => (
    <View style={[styles.box, {backgroundColor: module.colorHex}]}>
      <Text style={[styles.boxText, {color: textColor}]}>{item.CC_NO}</Text>
    </View>
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
    backgroundColor: 'white',
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
  },
  totalBoxes: {
    fontSize: 14,
    marginBottom: 12,
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
    color: 'black',
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

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface BoxData {
  id: string;
  moduleId: string;
  boxNumber: number;
  color: string;
  isFound: boolean;
}

interface BoxProps {
  data: BoxData;
  onPress: (boxData: BoxData) => void;
}

const Box: React.FC<BoxProps> = ({data, onPress}) => (
  <TouchableOpacity
    // eslint-disable-next-line react-native/no-inline-styles
    style={[styles.box, {backgroundColor: data.isFound ? data.color : 'red'}]}
    onPress={() => onPress(data)}>
    {data.boxNumber <= 56 && (
      <Text style={styles.boxText}>{data.boxNumber}</Text>
    )}
  </TouchableOpacity>
);

interface UnitBoxGridProps {
  boxes: BoxData[];
  onBoxPress: (boxData: BoxData) => void;
}

export default function ScanedUnitCard({boxes, onBoxPress}: UnitBoxGridProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scaned Unit</Text>
      <Text style={styles.subtitle}>Something also need here</Text>
      <View style={styles.gridContainer}>
        {boxes.map(boxData => (
          <Box key={boxData.id} data={boxData} onPress={onBoxPress} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderColor: '#007AFF',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 10,
  },
  box: {
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

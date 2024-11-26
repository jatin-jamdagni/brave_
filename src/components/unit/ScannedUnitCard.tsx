import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {getContrastingColor} from '../../hooks/useContrastingColor';
import {Color} from '../../constants/color';

interface BoxData {
  id: string;
  moduleId: string;
  boxNumber: number;
  color: string;
  isFound: boolean;
}

interface BoxProps {
  data: BoxData;
  onPress: (id: string) => void;
}

const Box: React.FC<BoxProps> = ({data, onPress}) => {
  const textColor = getContrastingColor(data.color);

  return (
    <TouchableOpacity
      style={[
        styles.box,
        {
          backgroundColor: data.isFound
            ? data.color
            : fadeColor(data.color, 0.5), // Faded color for missing/expired
        },
      ]}
      disabled={!data.isFound}
      onPress={() => onPress(data.id)}>
      <Text style={[styles.boxText, {color: textColor}]}>{data.boxNumber}</Text>
    </TouchableOpacity>
  );
};

const fadeColor = (color: string, opacity: number) => {
  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

interface UnitBoxGridProps {
  boxes: BoxData[];
  onBoxPress: (ccno: string) => void;
}

export default function ScannedUnitCard({boxes, onBoxPress}: UnitBoxGridProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanned Unit</Text>
      <Text style={styles.subtitle}>Click on any box to view its details</Text>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {boxes.map(boxData => (
            <Box key={boxData.id} data={boxData} onPress={onBoxPress} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: Color.primary,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: Color.secondary,
  },
  scrollContainer: {
    height: 390, // Fixed height for scrollable grid
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.black,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  boxText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

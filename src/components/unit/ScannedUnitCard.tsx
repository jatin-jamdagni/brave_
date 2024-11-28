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
  unit: string;
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
      <Text style={[styles.boxText, {color: textColor}]}>
        {data.unit === 'BOX' ? data.boxNumber : data.unit}
      </Text>
    </TouchableOpacity>
  );
};

const Box2: React.FC<BoxProps> = ({data, onPress}) => {
  const textColor = getContrastingColor(data.color);

  return (
    <TouchableOpacity
      style={[
        styles.box,
        {
          width: 100,
          backgroundColor: data.isFound
            ? data.color
            : fadeColor(data.color, 0.5), // Faded color for missing/expired
        },
      ]}
      disabled={!data.isFound}
      onPress={() => onPress(data.id)}>
      <Text style={[styles.boxText, {color: textColor}]}>
        {data.unit === 'BOX'
          ? data.boxNumber
          : `${data.unit} - ${data.boxNumber}`}
      </Text>
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
  // Separate boxes into two groups: "BOX" units and others
  const boxUnits = boxes.filter(box => box.unit === 'BOX');
  const otherUnits = boxes.filter(box => box.unit !== 'BOX');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanned Unit</Text>
      <Text style={styles.subtitle}>Click on any box to view its details</Text>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.gridContainer}
          horizontal={false} // Default vertical scrolling
        >
          {boxUnits.map(boxData => (
            <Box key={boxData.id} data={boxData} onPress={onBoxPress} />
          ))}
        </ScrollView>
        <ScrollView
          contentContainerStyle={styles.gridContainer}
          horizontal // Enable horizontal scrolling for other units
        >
          {otherUnits.map(boxData => (
            <Box2 key={boxData.id} data={boxData} onPress={onBoxPress} />
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
    flex: 1, // Ensures the container takes up available space
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
    flex: 1, // Allows the scroll container to grow with available space
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.black,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Distributes space evenly
    alignItems: 'center', // Aligns items vertically
    paddingVertical: 10,
  },
  box: {
    margin: 8, // Increased margin for better spacing
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 60, // Larger width for better visibility
    height: 60, // Larger height for better visibility
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  boxText: {
    color: '#fff',
    fontSize: 14, // Adjusted font size for better readability
    fontWeight: 'bold',
    textAlign: 'center', // Ensures text is centered
  },
});

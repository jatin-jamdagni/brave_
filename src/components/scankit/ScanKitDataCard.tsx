import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
  Image,
} from 'react-native';
import {Color} from '../../constants/color';

interface BoxData {
  id: string;
  number: number;
  color: string;
}

interface BoxProps {
  data: BoxData;
}

const Box = ({data}: BoxProps) => {
  return (
    <View style={[styles.box, {backgroundColor: data.color}]}>
      <Text style={styles.boxText}>{data.number}</Text>
    </View>
  );
};

interface KitConfigurationProps {
  kitName: string;
  totalQuantity?: number; // Optional, calculated dynamically if not provided
  boxes: BoxData[];
  kitImage: ImageSourcePropType;
}

const ScanKitDataCard = ({
  kitName,
  totalQuantity,
  boxes,
  kitImage,
}: KitConfigurationProps) => {
  // Dynamically calculate total quantity if not explicitly provided
  const calculatedTotalQuantity = totalQuantity || boxes.length;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={kitImage}
        style={styles.imageContainer}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.input}>{kitName}</Text>
        <Text style={styles.label}>
          Total Quantity: {calculatedTotalQuantity}
        </Text>
        <Text style={styles.description}>
          This kit is available in {boxes.length} boxes. The boxes are as
          follows:
        </Text>
        <View style={styles.boxContainer}>
          {boxes.map(box => (
            <Box key={box.id} data={box} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background, // Light background for better aesthetics
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
    backgroundColor: Color.background,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    marginTop: -8, // Align with image
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.primary,
  },
  input: {
    backgroundColor: Color.white,

    borderRadius: 10,
    padding: 10,
    color: Color.success,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    borderColor: Color.accent,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
    color: Color.secondary,
  },
  description: {
    marginBottom: 10,
    fontSize: 16,
    color: Color.lightGray,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  box: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScanKitDataCard;

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
  Image,
} from 'react-native';

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
  totalQuantity?: number;
  boxes: BoxData[];

  kitImage: ImageSourcePropType;
}

const ScanKitDataCard = ({kitName, boxes, kitImage}: KitConfigurationProps) => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={kitImage}
        style={styles.imageContainer}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.input}>{kitName}</Text>
        <Text style={styles.label}>Total Quantity: {boxes.length}</Text>
        <Text style={styles.description}>
          This kit is available in {boxes.length} boxed and boxes are the
          following:
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
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopEndRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  boxText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScanKitDataCard;

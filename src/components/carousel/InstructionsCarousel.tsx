import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import {Image} from 'react-native';
import Video, {ReactVideoSource} from 'react-native-video';
import {Color} from '../../constants/color';

interface Instruction {
  step: string;
}

interface CarouselItem {
  title: string;
  imageSource?: ImageSourcePropType;
  videoSource?: ReactVideoSource;
  instructions: Instruction[];
  backLabel: string;
  nextLabel: string;
  onPressFirst?: () => void;
}

interface CarouselProps {
  items: CarouselItem[];
}

function Card({title, imageSource, instructions, videoSource}: CarouselItem) {
  return (
    // console.log('Title:', title);
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.imageContainer}>
        {videoSource ? (
          <Video
            source={videoSource}
            style={styles.video}
            resizeMode="cover"
            volume={0.0}
            repeat
          />
        ) : (
          <Image source={imageSource} style={styles.image} />
        )}
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Instructions</Text>
        <ScrollView style={styles.instructionsList}>
          {instructions.map((instruction, index) => (
            <Text key={index} style={styles.instructionItem}>
              {index + 1}. {instruction.step}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default function CarouselWithCards({items}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(items.length - 1, prevIndex + 1));
  };

  const currentItem = items[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Card {...currentItem} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={
            currentIndex === items.length - 1
              ? currentItem.onPressFirst
              : handleNext
          }>
          <Text style={styles.doneButtonText}>
            {currentIndex === items.length - 1
              ? 'Ready to Scan'
              : currentItem.nextLabel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={currentIndex === 0 ? currentItem.onPressFirst : handleBack}>
          <Text style={styles.backButtonText}>
            {currentIndex === 0 ? 'Back' : currentItem.backLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    backgroundColor: Color.black,
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Color.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Color.secondary,
    marginBottom: 16,
  },
  imageContainer: {
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
    aspectRatio: 4 / 3,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  instructionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Color.accent,
  },
  instructionsList: {
    maxHeight: 120,
  },
  instructionItem: {
    fontSize: 14,
    marginBottom: 4,
    color: Color.lightGray,
  },
  buttonContainer: {
    marginTop: 16,
  },
  doneButton: {
    backgroundColor: '#e6f2ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
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

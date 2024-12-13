import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import {Color} from '../../constants/color';

interface CustomCardProps {
  imageSource: ImageSourcePropType;
  title?: string;
  subtitle?: string;
  onPress: () => void;
  imageStyle?: StyleProp<ImageStyle>;
  buttonTitle: string;
}

const {width} = Dimensions.get('window');

export default function CustomCard({
  imageSource,
  title,
  subtitle,
  onPress,
  buttonTitle,
}: CustomCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={imageSource}
        style={[styles.image, subtitle ? {} : {height: 115,}]}
      />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          {title && (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonTitle}</Text>
          {/* <Icon name="arrow-forward" size={20} color={Color.darkGray} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // borderWidth: 2,
    // borderColor: 'red',
    backgroundColor: Color.surface,
    flex: 1,
    width: width - 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  textContainer: {
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Color.white,
  },
  subtitle: {
    fontSize: 14,
    color: Color.lightGray,
  },
  button: {
    backgroundColor: Color.info,
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  buttonText: {
    color: Color.darkGray,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    // marginRight: 8,
    width: '100%',
  },
});

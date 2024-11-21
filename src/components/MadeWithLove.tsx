import React, {useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MadeWithLove = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  const handleLinkPress = () => {
    Linking.openURL('https://awlindia.com');
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <Text style={styles.text}>Made with</Text>
      <Icon name="heart" size={18} color="red" style={styles.icon} />
      <Text style={styles.text}>by</Text>
      <TouchableOpacity onPress={handleLinkPress}>
        <Text style={styles.link}>AWL INDIA</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 'auto',
    padding: 10,
    // width: 200,
    borderRadius: 10,
    backgroundColor: '#feffff',
    shadowColor: 'red',
  },
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginHorizontal: 2,
  },
  icon: {
    marginHorizontal: 2,
  },
  link: {
    fontSize: 14,
    color: '#FF0000',
    fontWeight: 'bold',
    marginLeft: 2,
  },
});

export default MadeWithLove;

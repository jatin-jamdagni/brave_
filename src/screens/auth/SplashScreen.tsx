import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import {IMAGE} from '../../constants/images';
import {Color} from '../../constants/color';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
        <Image source={IMAGE.DarkLogo} style={styles.logo} />
        {/* <MadeWithLove /> */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingDot} />
          <View style={styles.loadingDot} />
          <View style={styles.loadingDot} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.black,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },

  loadingContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
    marginHorizontal: 5,
    opacity: 0.3,
  },
});

export default SplashScreen;

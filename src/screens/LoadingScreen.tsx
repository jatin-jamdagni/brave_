import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useAuth} from '../hooks/useAuth';

const LoadingScreen = () => {
  const {syncProgress} = useAuth();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading... {syncProgress.toFixed(2)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default LoadingScreen;

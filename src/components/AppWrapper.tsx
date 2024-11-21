import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  ViewStyle,
  Platform,
} from 'react-native';
import { Color } from '../constants/color';

interface AppWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
}

export default function AppWrapper({
  children,
  style,
  backgroundColor = Color.background,
}: AppWrapperProps) {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      <SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:,
  },
  safeArea: {
    flex: 1,

    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginBottom: 10,
  },
});

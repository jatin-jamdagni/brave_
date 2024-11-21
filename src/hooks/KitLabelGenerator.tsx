import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Rect, Text} from 'react-native-svg';
import {Color} from '../constants/color';

export function generateKitLabel({
  kitName = 'I-GEL KIT',
  boxNo = '38',
  boxName = 'AIRWAY BOX',
} = {}) {
  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 800 800">
        <Rect x="10" y="10" width="780" height="780" fill="#FFE600" />
        <Rect x="30" y="30" width="740" height="100" fill="#FFFFFF" />
        <Rect x="30" y="150" width="740" height="100" fill="#FFFFFF" />
        <Rect x="100" y="400" width="600" height="300" fill="#FFFFFF" />

        <Text
          x="400"
          y="90"
          fontSize="36"
          fontWeight="bold"
          textAnchor="middle"
          fill={Color.success}>
          LIFENITY
        </Text>
        <Text
          x="400"
          y="210"
          fontSize="44"
          fontWeight="bold"
          textAnchor="middle"
          fill="#000000">
          {kitName}
        </Text>
        <Text
          x="400"
          y="480"
          fontSize="28"
          fontWeight="bold"
          textAnchor="middle"
          fill="#000000">
          PUT THE KIT BACK IN
        </Text>
        <Text
          x="400"
          y="560"
          fontSize="36"
          fontWeight="bold"
          textAnchor="middle"
          fill="#000000">
          BOX NO. {boxNo}
        </Text>
        <Text
          x="400"
          y="630"
          fontSize="36"
          fontWeight="bold"
          textAnchor="middle"
          fill="#000000">
          {boxName}
        </Text>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: Color.primary,
  },
});

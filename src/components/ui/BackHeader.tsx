import React from 'react';
import {CustomButton} from './CustomButton';
import {StyleSheet, Text, View} from 'react-native';
import {Color} from '../../constants/color';
interface CustomeButtonProps {
  onPress: () => void;
  title: string;
  subTitle: string;
  buttonLabel?: string;
}

const BackHeader = ({
  onPress,
  subTitle,
  title,
  buttonLabel,
}: CustomeButtonProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <CustomButton
        buttonStyle={{backgroundColor: Color.darkGray}}
        textStyle={styles.buttonText}
        onPress={onPress}
        title={buttonLabel ?? 'Button'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBlockColor: Color.lightGray,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.white,
    marginBottom: 5,
  },
  subTitle: {fontSize: 16, color: Color.lightGray, fontWeight: '500'},
  buttonText: {fontSize: 16, fontWeight: 'bold', color: Color.white},
});

export default BackHeader;

import React from 'react';
import InstructionsCarousel from '../../components/carousel/InstructionsCarousel';
import {IMAGE} from '../../constants/images';
import {StyleSheet, Text, View} from 'react-native';
import AppWrapper from '../../components/AppWrapper';

const DispensoryInstructionScreen = ({navigation}: {navigation: any}) => {
  const goBack = () => {
    navigation.goBack();
  };
  const handleViewData = () => {
    navigation.navigate('DISPENSORYCONTROL');
  };
  const carouselItems = [
    {
      title: 'Scan Dispensory',
       imageSource: IMAGE.ScanMedicineInstruction1,
      instructions: [
        {step: 'Pick the Dispensory you want to scan'},
        {step: 'Place the Dispensory in a well-lit area'},
      ],
      backLabel: 'Exit',
      nextLabel: 'Next',
      onPressFirst: goBack,
    },

    {
      title: 'Scan Dispensory',
      videoSource: IMAGE.ScanMedicineInstruction2,
      instructions: [
        {step: 'Hold your device steady'},
        {step: 'Tap the scan button when ready'},
      ],
      backLabel: 'Back',
      nextLabel: 'Finish',
      onPressFirst: handleViewData,
    },
  ];

  return (
    <AppWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Scan Dispensory</Text>
        <Text style={styles.subTitle}>
          Here you can Dispense and Add medicine
        </Text>
      </View>
      <InstructionsCarousel items={carouselItems} />
    </AppWrapper>
  );
};

export default DispensoryInstructionScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 6},
  subTitle: {fontSize: 16, color: '#99aaa9', fontWeight: '500'},
});

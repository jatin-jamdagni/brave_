import React from 'react';
import InstructionsCarousel from '../../components/carousel/InstructionsCarousel';
import {IMAGE} from '../../constants/images';
import {StyleSheet, Text, View} from 'react-native';
import AppWrapper from '../../components/AppWrapper';

const BoxInstructionScreen = ({navigation}: {navigation: any}) => {
  const goBack = () => {
    navigation.goBack();
  };
  const handleViewData = () => {
    navigation.navigate('SINGLEBOXTABLE');
  };
  const carouselItems = [
    {
      title: 'Scan single box',
      imageSource: IMAGE.singleBoxInstruction1,
      instructions: [
        {step: 'Pick the box you want to scan'},
        {step: 'Place the box in a well-lit area'},
      ],
      backLabel: 'Exit',
      nextLabel: 'Next',
      onPressFirst: goBack,
    },
    {
      title: 'Position the box',
      imageSource: IMAGE.singleBoxInstruction2,
      instructions: [
        {step: 'Ensure the box is 10 feet away from other objects'},
        {step: 'Center the box in your camera view'},
      ],
      backLabel: 'Previous',
      nextLabel: 'Continue',
    },
    {
      title: 'Position the HHT',
      imageSource: IMAGE.hhttrigerImg,
      instructions: [
        {step: 'Ensure the box is 10 feet away from other objects'},
        {step: 'Center the box in your camera view'},
      ],
      backLabel: 'Previous',
      nextLabel: 'Continue',
    },
    {
      title: 'Scan the box',
      videoSource: IMAGE.singleBoxInstruction3,
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
        <Text style={styles.title}>Scan Single Box</Text>
        <Text style={styles.subTitle}>Something Should be Here</Text>
      </View>
      <InstructionsCarousel items={carouselItems} />
    </AppWrapper>
  );
};

export default BoxInstructionScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 6},
  subTitle: {fontSize: 16, color: '#99aaa9', fontWeight: '500'},
});

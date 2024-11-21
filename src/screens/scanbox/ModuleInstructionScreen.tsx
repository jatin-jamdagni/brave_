import React from 'react';
import InstructionsCarousel from '../../components/carousel/InstructionsCarousel';
import {IMAGE} from '../../constants/images';
import {StyleSheet, Text, View} from 'react-native';
import AppWrapper from '../../components/AppWrapper';

const ModuleInstructionScreen = ({navigation}: {navigation: any}) => {
  const goBack = () => {
    navigation.goBack();
  };
  const handleViewData = () => {
    navigation.navigate('ENTIREMODULESCANNED');
  };
  const carouselItems = [
    {
      title: 'Scan Module',
      imageSource: IMAGE.scanModuleInstruction1,
      instructions: [
        {step: 'Pick the box you want to scan'},
        {step: 'Place the box in a well-lit area'},
      ],
      backLabel: 'Exit',
      nextLabel: 'Next',
      onPressFirst: goBack,
    },
    {
      title: 'Position the Module',
      imageSource: IMAGE.scanModuleInstruction2,
      instructions: [
        {step: 'Ensure the box is 10 feet away from other objects'},
        {step: 'Center the box in your camera view'},
      ],
      backLabel: 'Previous',
      nextLabel: 'Continue',
    },
    {
      title: 'Position the Module',
      imageSource: IMAGE.hhttrigerImg,
      instructions: [
        {step: 'Ensure the box is 10 feet away from other objects'},
        {step: 'Center the box in your camera view'},
      ],
      backLabel: 'Previous',
      nextLabel: 'Continue',
    },
    {
      title: 'Scan the module',
      videoSource: IMAGE.scanModuleInstruction3,
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
        <Text style={styles.title}>Scan Entire Module</Text>
        <Text style={styles.subTitle}>Something Should be Here</Text>
      </View>
      <InstructionsCarousel items={carouselItems} />
    </AppWrapper>
  );
};

export default ModuleInstructionScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 6},
  subTitle: {fontSize: 16, color: '#99aaa9', fontWeight: '500'},
});

import React from 'react';
import InstructionsCarousel from '../../components/carousel/InstructionsCarousel';
import {IMAGE} from '../../constants/images';
import {StyleSheet, Text, View} from 'react-native';
import AppWrapper from '../../components/AppWrapper';

const ScanKitInstructions = ({navigation}: {navigation: any}) => {
  const goBack = () => {
    navigation.navigate('SCANANDIDENTIFY');
  };

  const handleViewData = () => {
    navigation.navigate('SCANNINGSCREEN', {
      toView: 'SCANKITDATA',
    });
  };

  const carouselItems = [
    {
      title: 'Scan Kit',
      imageSource: IMAGE.ScanKitInstruction1,
      instructions: [
        {step: 'Pick the Kit you want to scan'},
        {step: 'Place the Kit in a well-lit area'},
      ],
      backLabel: 'Exit',
      nextLabel: 'Next',
      onPressFirst: goBack,
    },
    {
      title: 'Scan Kit',
      imageSource: IMAGE.ScanKitInstruction2,
      instructions: [
        {step: 'Hold your device steady'},
        {step: 'Tap the scan button when ready'},
      ],
      backLabel: 'Previous',
      nextLabel: 'Finish',
      onPressFirst: handleViewData,
    },
  ];

  return (
    <AppWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Scan Kit</Text>
        <Text style={styles.subTitle}>Something Should be Here</Text>
      </View>
      <InstructionsCarousel items={carouselItems} />
    </AppWrapper>
  );
};

export default ScanKitInstructions;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 6},
  subTitle: {fontSize: 16, color: '#99aaa9', fontWeight: '500'},
});

import React, {useEffect} from 'react';
import InstructionsCarousel from '../../components/carousel/InstructionsCarousel';
import {IMAGE} from '../../constants/images';
import {StyleSheet, Text, View} from 'react-native';
import AppWrapper from '../../components/AppWrapper';
import {useModuleStore} from '../../store/entireModuleStore';
import {Color} from '../../constants/color';

const BoxInstructionScreen = ({navigation}: {navigation: any}) => {
  const {setEpcid} = useModuleStore();

  useEffect(() => {
    setEpcid([]);
  }, []);

  const goBack = () => {
    navigation.navigate('SCANBOX');
  };
  const handleViewData = () => {
    navigation.navigate('SCANNINGSCREEN', {
      toView: 'SINGLEBOXTABLE',
    });
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
        {step: 'Place the box on a flat surface'},
      ],
      backLabel: 'Previous',
      nextLabel: 'Continue',
    },
    {
      title: 'Position the HHT',
      videoSource: IMAGE.singleBoxInstruction3,

      instructions: [
        {step: 'Hold the HHT in your hand'},
        {step: 'Point the HHT at the box'},
      ],
      backLabel: 'Previous',
      nextLabel: 'Finish',
      onPressFirst: handleViewData,
    },
  ];

  return (
    <AppWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Scan Single Box</Text>
        <Text style={styles.subTitle}>Please read the instructions</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primary,
    marginBottom: 6,
  },
  subTitle: {fontSize: 16, color: Color.lightGray, fontWeight: '500'},
});

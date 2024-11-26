import React, {useEffect} from 'react';
import InstructionsCarousel from '../../components/carousel/InstructionsCarousel';
import {IMAGE} from '../../constants/images';
import {StyleSheet, Text, View} from 'react-native';
import AppWrapper from '../../components/AppWrapper';
import {useModuleStore} from '../../store/entireModuleStore';

const UnitInstructionScreen = ({navigation}: {navigation: any}) => {
  const {setEpcid} = useModuleStore();

  useEffect(() => {
    setEpcid([]);
  }, []);

  const goBack = () => {
    navigation.navigate('SCANBOX');
  };
  const handleViewData = () => {
    navigation.navigate('SCANNINGSCREEN', {
      toView: 'ENTIREUNITCANNED',
    });
  };
  const carouselItems = [
    {
      title: 'Scan Unit',
      imageSource: IMAGE.scanUnitInstruction1,
      instructions: [
        {step: 'Pick the box you want to scan'},
        {step: 'Place the box in a well-lit area'},
      ],
      backLabel: 'Exit',
      nextLabel: 'Next',
      onPressFirst: goBack,
    },
    {
      title: 'Position the Unit',
      imageSource: IMAGE.scanUnitInstruction2,
      instructions: [
        {step: 'Ensure the box is 10 feet away from other objects'},
        {step: 'Center the box in your camera view'},
      ],
      backLabel: 'Previous',
      nextLabel: 'Continue',
    },
    {
      title: 'Position the Unit',
      videoSource: IMAGE.scanUnitInstruction3,
      instructions: [
        {step: 'Ensure the box is 10 feet away from other objects'},
        {step: 'Center the box in your camera view'},
      ],
      backLabel: 'Previous',
      nextLabel: 'Finish',
      onPressFirst: handleViewData,
    },
  ];

  return (
    <AppWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Scan Entire Unit</Text>
        <Text style={styles.subTitle}>Something Should be Here</Text>
      </View>
      <InstructionsCarousel items={carouselItems} />
    </AppWrapper>
  );
};

export default UnitInstructionScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 6},
  subTitle: {fontSize: 16, color: '#99aaa9', fontWeight: '500'},
});

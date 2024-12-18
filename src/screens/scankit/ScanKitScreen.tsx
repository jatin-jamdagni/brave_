import React, {useEffect} from 'react';
import InstructionsCarousel from '../../components/carousel/InstructionsCarousel';
import {IMAGE} from '../../constants/images';
import {StyleSheet, Text, View} from 'react-native';
import AppWrapper from '../../components/AppWrapper';
import {useModuleStore} from '../../store/entireModuleStore';
import {Color} from '../../constants/color';

const ScanKitInstructions = ({navigation}: {navigation: any}) => {
  const goBack = () => {
    navigation.navigate('SCANANDIDENTIFY');
  };

  const handleViewData = () => {
    navigation.navigate('SCANNINGSCREEN', {
      toView: 'SCANKITDATA',
    });
  };

  const {setEpcid} = useModuleStore();

  useEffect(() => {
    setEpcid([]);
  }, []);

  const carouselItems = [
    {
      title: 'Scan Kit',
      imageSource: IMAGE.ScanKitInstruction1,
      instructions: [
        {step: 'Pick the Kit you want to scan'},
        {step: 'Place the Kit in a well-lit area or in hand'},
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
        <Text style={styles.subTitle}>Please read the instructions</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primary,
    marginBottom: 6,
  },
  subTitle: {fontSize: 16, color: Color.lightGray, fontWeight: '500'},
});

import React from 'react';
import {StyleSheet} from 'react-native';
import AppWrapper from '../../components/AppWrapper';
import {IMAGE} from '../../constants/images';

import BackHeader from '../../components/ui/BackHeader';
import CustomCard from '../../components/ui/CustomCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Color} from '../../constants/color';
import {useModuleStore} from '../../store/entireModuleStore';

const ScanBoxScreen = ({navigation}: {navigation: any}) => {
  const {clearEpcid} = useModuleStore();

  const handleGoBack = async () => {
    navigation.goBack();
  };
  const handleNavigationToModule = () => {
    clearEpcid();
    navigation.navigate('ENTIREMODULESELECTION');
  };
  const handleNavigationToUnit = () => {
    navigation.navigate('ENTIREUNITINSTRUCTION');
  };
  return (
    <AppWrapper>
      <BackHeader
        onPress={handleGoBack}
        title="Scan box"
        subTitle="Something also need here..."
        buttonLabel="Back"
      />
      <ScrollView contentContainerStyle={styles.container}>
        <CustomCard
          imageSource={IMAGE.SingleBox}
          onPress={() => navigation.navigate('SINGLEBOXINSTRUCTION')}
          buttonTitle="SCAN SINGLE BOX"
          imageStyle={styles.imageStyle}
        />
        <CustomCard
          imageSource={IMAGE.ScanModule}
          onPress={handleNavigationToModule}
          buttonTitle="SCAN MODULE"
          imageStyle={styles.imageStyle}
        />
        <CustomCard
          imageSource={IMAGE.EntireUnit}
          onPress={handleNavigationToUnit}
          buttonTitle="SCAN ENTIRE UNIT"
          imageStyle={styles.imageStyle}
        />
      </ScrollView>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {height: 100, backgroundColor: Color.darkGray},
});

export default ScanBoxScreen;

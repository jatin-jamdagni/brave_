import {StyleSheet} from 'react-native';
import React from 'react';
import ModuleSelector from '../../components/module/ModuleSelector';
import AppWrapper from '../../components/AppWrapper';
import {modules} from '../../constants/module';
import BackHeader from '../../components/ui/BackHeader';
import {useModuleStore} from '../../store/entireModuleStore';

const ModuleSelectionScreen = ({navigation}: {navigation: any}) => {
  const {setEpcid, epcId, clearEpcid} = useModuleStore();

  const handleStartScan = (selectedModules: any) => {
    clearEpcid();
    console.log(' before entring', epcId);

    setEpcid(selectedModules);

    navigation.navigate('ENTIREMODULEINSTRUCTION');
  };
  const handleGoBack = async () => {
    navigation.goBack();
  };

  return (
    <AppWrapper style={styles.container}>
      <BackHeader
        onPress={handleGoBack}
        title="Scan box"
        subTitle="Something also need here..."
        buttonLabel="Back"
      />
      <ModuleSelector modules={modules} onStartScan={handleStartScan} />
    </AppWrapper>
  );
};

export default ModuleSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

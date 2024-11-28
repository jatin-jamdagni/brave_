import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import ModuleSelector from '../../components/module/ModuleSelector';
import AppWrapper from '../../components/AppWrapper';
import {modules} from '../../constants/module';
import BackHeader from '../../components/ui/BackHeader';
import {useModuleStore} from '../../store/entireModuleStore';
import {getModulesDisplayData} from '../../services/databaseService';
import {Color} from '../../constants/color';

const ModuleSelectionScreen = ({navigation}: {navigation: any}) => {
  const {setEpcid, epcId, clearEpcid} = useModuleStore();
  const [modules, setModules] = useState<any[]>([]);
  const handleStartScan = (selectedModules: any) => {
    clearEpcid();

    setEpcid(selectedModules);

    navigation.navigate('ENTIREMODULEINSTRUCTION');
  };
  const handleGoBack = async () => {
    navigation.navigate('SCANBOX');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results: any = await getModulesDisplayData();

        setModules(results);
      } catch (error) {
        console.error('Error fetching box table data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppWrapper style={styles.container}>
      <BackHeader
        onPress={handleGoBack}
        title="Select Module"
        subTitle="Select modules you want to scan"
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
    backgroundColor: Color.background,
  },
});

import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ModuleScannedDataCard from '../../components/module/ModuleScannedDataCard';
import AppWrapper from '../../components/AppWrapper';
import {CustomButton} from '../../components/ui/CustomButton';
import DataHeader from '../../components/ui/DataHeader';
import {useModuleStore} from '../../store/entireModuleStore';
import {getModulesDisplayData} from '../../services/databaseService';

const ModuleScannedScreen = ({navigation}: {navigation: any}) => {
  const {getSelectedModule} = useModuleStore();
  const [modules, setModules] = useState<any[]>([]);

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

  const data = getSelectedModule(modules);

  const moduleEpcIds = data.map(item => item.epcId);

  console.log('moduleEpcIds', moduleEpcIds);
  const handleCheckModule = (id: string) => {
    navigation.navigate('ENTIREMODULETABLE', {
      moduleEpcIds: id,
    });
  };

  return (
    <AppWrapper>
      <DataHeader
        subTitle="Something also neeed here"
        title="Scaned Module Box"
      />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ModuleScannedDataCard
            module={item}
            onCheckModule={handleCheckModule}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.customButtonContainer}>
        <CustomButton
          buttonStyle={styles.buttonStyleBack}
          onPress={() => navigation.navigate('ENTIREMODULESELECTION')}
          title="Back"
          textStyle={styles.backButtonText}
        />
        <CustomButton
          buttonStyle={styles.buttonStyleData}
          onPress={() =>
            navigation.navigate('ENTIREMODULETABLE', {
              moduleEpcIds: moduleEpcIds,
            })
          }
          title="View Data"
        />
      </View>
    </AppWrapper>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 16,
  },
  customButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 16,
    backgroundColor: '#EEEEEE',
    elevation: 5,
  },
  buttonStyleBack: {
    backgroundColor: '#e6f2ff',
    width: 100,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  backButtonText: {
    color: '#007AFF',
  },
  buttonStyleData: {
    backgroundColor: '#007AFF',
    width: 220,
  },
});

export default ModuleScannedScreen;

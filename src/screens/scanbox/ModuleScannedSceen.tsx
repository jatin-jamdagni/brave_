import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ModuleScannedDataCard from '../../components/module/ModuleScannedDataCard';
import AppWrapper from '../../components/AppWrapper';
import {CustomButton} from '../../components/ui/CustomButton';
import DataHeader from '../../components/ui/DataHeader';
import {useModuleStore} from '../../store/entireModuleStore';

const ModuleScannedScreen = ({navigation}: {navigation: any}) => {
  const {getSelectedModule} = useModuleStore();

  const data = getSelectedModule();

  const handleCheckModule = (id: string) => {
    console.log(`Checking module with id: ${id}`);
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
          onPress={() => navigation.navigate('ENTIREMODULETABLE')}
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
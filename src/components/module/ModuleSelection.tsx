import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface Module {
  id: string;
  name: string;
  description: string;
  color: string;
  imageSource: string;
}

interface ModuleSelectionScreenParentProps {
  modules: Module[];
  onStartScan: (selectedModules: Module[]) => void;
}

const ModuleSelectionScreenParent: React.FC<
  ModuleSelectionScreenParentProps
> = ({modules, onStartScan}) => {
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);

  const toggleModuleSelection = (module: Module) => {
    setSelectedModules(prev =>
      prev.some(m => m.id === module.id)
        ? prev.filter(m => m.id !== module.id)
        : [...prev, module],
    );
  };

  const renderModule = ({item}: {item: Module}) => (
    <View style={[styles.moduleItem, {backgroundColor: item.color}]}>
      <Image source={{uri: item.imageSource}} style={styles.moduleImage} />
      <View style={styles.moduleInfo}>
        <Text style={styles.moduleName}>{item.name}</Text>
        <Text style={styles.moduleDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => toggleModuleSelection(item)}>
        <Text style={styles.selectButtonText}>SELECT</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={modules}
        renderItem={renderModule}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <Text style={styles.totalSelected}>
          Total modules selected: {selectedModules.length}
        </Text>
        <TouchableOpacity
          style={styles.startScanButton}
          onPress={() => onStartScan(selectedModules)}>
          <Text style={styles.startScanButtonText}>Start Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface SelectedModulesScreenProps {
  selectedModules: Module[];
}

const SelectedModulesScreen: React.FC<SelectedModulesScreenProps> = ({
  selectedModules,
}) => {
  const renderBox = (index: number) => (
    <View key={index} style={styles.box}>
      <Text style={styles.boxText}>{index + 1}</Text>
    </View>
  );

  const renderModule = (module: Module) => (
    <View
      key={module.id}
      style={[styles.selectedModule, {backgroundColor: module.color}]}>
      <Text style={styles.selectedModuleName}>{module.name}</Text>
      <Text style={styles.totalBoxes}>Total Boxes in Module: 10</Text>
      <View style={styles.boxesContainer}>
        {[...Array(10)].map((_, index) => renderBox(index))}
      </View>
      <TouchableOpacity style={styles.checkModuleButton}>
        <Text style={styles.checkModuleButtonText}>Check Module</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {selectedModules.map(renderModule)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  moduleItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  moduleImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  moduleInfo: {
    flex: 1,
    marginLeft: 10,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moduleDescription: {
    fontSize: 14,
  },
  selectButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 10,
  },
  selectButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalSelected: {
    fontSize: 16,
    marginBottom: 10,
  },
  startScanButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  startScanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedModule: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  selectedModuleName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalBoxes: {
    fontSize: 14,
    marginBottom: 10,
  },
  boxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
    borderRadius: 10,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkModuleButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkModuleButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export {ModuleSelectionScreenParent, SelectedModulesScreen};

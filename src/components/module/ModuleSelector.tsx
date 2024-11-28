import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import {ModuleTypes} from '../../types';
import {getContrastingColor} from '../../hooks/useContrastingColor';
import {Color} from '../../constants/color';

type ModuleSelectorProps = {
  modules: ModuleTypes[];
  onStartScan: (selectedModules: string[]) => void;
};

export default function ModuleSelector({
  modules,
  onStartScan,
}: ModuleSelectorProps) {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const toggleModule = useCallback((epcId: string) => {
    setSelectedModules(prev =>
      prev.includes(epcId)
        ? prev.filter(moduleId => moduleId !== epcId)
        : [...prev, epcId],
    );
  }, []);

  const renderModule: ListRenderItem<ModuleTypes> = useCallback(
    ({item}) => {
      const textColor = getContrastingColor(item.colorHex);
      return (
        <TouchableOpacity
          key={item.arrangeIndex}
          onPress={() => toggleModule(item.epcId)}
          style={[
            styles.moduleItem,
            {backgroundColor: item.colorHex},
            selectedModules.includes(item.epcId) && styles.selectedModule,
          ]}
          accessibilityRole="checkbox"
          accessibilityState={{checked: selectedModules.includes(item.epcId)}}
          accessibilityLabel={`${item.name} module, ${
            selectedModules.includes(item.epcId) ? 'selected' : 'unselected'
          }`}>
          <View style={styles.textContainer}>
            <Text style={[styles.moduleName, {color: textColor}]}>
              {item.name}
            </Text>
            {/* <Text style={[styles.moduleDescription, {color: textColor}]}>
              {item.description}
            </Text> */}
          </View>
        </TouchableOpacity>
      );
    },
    [selectedModules, toggleModule],
  );

  const keyExtractor = useCallback((item: ModuleTypes) => item.id, []);

  // Sort modules by arrangeIndex
  const sortedModules = [...modules].sort(
    (a, b) => parseInt(a.arrangeIndex) - parseInt(b.arrangeIndex),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedModules}
        renderItem={renderModule}
        keyExtractor={keyExtractor}
        numColumns={1}
        contentContainerStyle={styles.moduleList}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.contentContainer}>
        <View style={styles.selectedTextContainer}>
          <Text style={[styles.selectedCount, {color: Color.lightGray}]}>
            Total modules selected:
          </Text>
          <Text style={[styles.selectedCount, {color: Color.accent}]}>
            {selectedModules.length}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.startButton,
            selectedModules.length === 0 && styles.startButtonDisabled,
          ]}
          onPress={() => onStartScan(selectedModules)}
          disabled={selectedModules.length === 0}
          accessibilityRole="button"
          accessibilityLabel={`Start Scan with ${selectedModules.length} modules selected`}
          accessibilityState={{disabled: selectedModules.length === 0}}>
          <Text style={styles.startButtonText}>Start Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  moduleItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    height: 60,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  moduleName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
  moduleDescription: {
    marginTop: 4,
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '400',
  },
  contentContainer: {
    borderTopWidth: 1,
  },
  selectedModule: {
    borderWidth: 3,
    borderColor: Color.white,
  },
  selectedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginHorizontal: 16,
  },
  selectedCount: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  startButtonDisabled: {
    backgroundColor: '#b3d9ff',
    elevation: 0,
    shadowOpacity: 0,
  },
  startButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  moduleList: {
    paddingVertical: 8,
  },
});

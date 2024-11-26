import React, {useCallback, useMemo} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Color} from '../constants/color';

interface ColumnDefinition {
  key: string;
  title: string;
  width: number;
  style?: object;
}

interface TableProps {
  title: string;
  subtitle: string;
  columns: ColumnDefinition[];
  data: any[];
  onDone: () => void;
  onBack: () => void;
}

const TableHeader = ({data}: {data: ColumnDefinition[]}) => {
  return (
    <View style={styles.tableHeader}>
      {data.map(column => (
        <Text
          key={column.key}
          style={[styles.headerCell, {flex: column.width}, column.style]}>
          {column.title}
        </Text>
      ))}
    </View>
  );
};

const CustomizableTableComponent: React.FC<TableProps> = ({
  title,
  subtitle,
  columns,
  data,
  onDone,
  onBack,
}) => {
  const renderItem = useCallback(
    ({item}: {item: any}) => (
      <View style={styles.tableRow}>
        {columns.map(column => (
          <Text
            key={column.key}
            style={[styles.cell, {flex: column.width}, column.style]}>
            {item[column.key]}
          </Text>
        ))}
      </View>
    ),
    [columns],
  );

  const keyExtractor = useCallback(
    (item: any, index: number) => item.id || index.toString(),
    [],
  );

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: 50, // height of a row
      offset: 50 * index, // distance from the top
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.tableContainer}>
        <TableHeader data={columns} />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          initialNumToRender={10} // Adjust as needed
          maxToRenderPerBatch={10} // Limit number of items rendered in a batch
          windowSize={5} // Set window size to control how many items in memory
          removeClippedSubviews={true} // Unmount off-screen items
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.doneButton} onPress={onDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Color.background,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: Color.primary,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.secondary,
  },
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Color.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.white,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    fontSize: 12,
    padding: 8,
    textAlign: 'center',
    color: Color.white,
  },
  buttonContainer: {
    marginTop: 16,
  },
  doneButton: {
    backgroundColor: '#e6f2ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  doneButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomizableTableComponent;

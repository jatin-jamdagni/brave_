import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const DataHeader = ({title, subTitle}: {title: string; subTitle: string}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subTitle}</Text>
    </View>
  );
};

export default DataHeader;

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#888',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

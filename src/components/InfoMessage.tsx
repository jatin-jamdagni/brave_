import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface InfoMessageProps {
  message: string;
}

export default function InfoMessage({message}: InfoMessageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="info" size={24} color="#3B82F6" />
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 8,
    marginHorizontal:16,
    marginVertical: 25,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 16,
    color: '#1E40AF',
    fontWeight: '500',
  },
});

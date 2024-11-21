import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DispensoryInstructionScreen from '../screens/dispensory/DispensoryInstructionScreen';
import DispensoryControlScreen from '../screens/dispensory/DispensoryControlScreen';
import DispensoryDataScreen from '../screens/dispensory/DispensoryDataScreen';

type DespensoryStackParamList = {
  DISPENSORYINTRUCTION: undefined;
  DISPENSORYCONTROL: undefined;
  DISPENSORYDATA: undefined;
};
const DespensoryStack = createNativeStackNavigator<DespensoryStackParamList>();

export const DispensoryStackNavigator = () => (
  <DespensoryStack.Navigator screenOptions={{headerShown: false}}>
    <DespensoryStack.Screen
      name="DISPENSORYINTRUCTION"
      component={DispensoryInstructionScreen}
    />
    <DespensoryStack.Screen
      name="DISPENSORYCONTROL"
      component={DispensoryControlScreen}
    />
    <DespensoryStack.Screen
      name="DISPENSORYDATA"
      component={DispensoryDataScreen}
    />
  </DespensoryStack.Navigator>
);

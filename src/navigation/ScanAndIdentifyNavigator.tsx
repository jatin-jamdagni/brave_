import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanAndIdentify from '../screens/ScanAndIdentifyScreen';
import ScanBoxScreen from '../screens/scanbox/ScanBoxScreen';
import ScanKitScreen from '../screens/scankit/ScanKitScreen';
import BoxInstructionScreen from '../screens/scanbox/BoxInstructionScreen';
import BoxTableScreen from '../screens/scanbox/BoxTableScreen';
import ModuleSelectionScreen from '../screens/scanbox/ModuleSelectionScreen';
import ModuleInstructionScreen from '../screens/scanbox/ModuleInstructionScreen';
import ModuleScannedSceen from '../screens/scanbox/ModuleScannedSceen';
import ModuleTableScreen from '../screens/scanbox/ModuleTableScreen';
import UnitInstructionScreen from '../screens/scanbox/UnitInstructionScreen';
import UnitScannedScreen from '../screens/scanbox/UnitScannedScreen';
import UnitTableScreen from '../screens/scanbox/UnitTableScreen';
import ScanKitData from '../screens/scankit/ScanKitData';
import ScanningScreen from '../screens/scanbox/ScanningScreen';

type ScanAndIdentifyStackParamList = {
  // Home: undefined
  SCANANDIDENTIFY: undefined;
  // box
  SCANBOX: undefined;

  /* box */
  SCANSINGLEBOX: undefined;
  SINGLEBOXINSTRUCTION: undefined;
  SINGLEBOXTABLE: undefined;

  /* Module */
  SCANENTIREMODULE: undefined;
  ENTIREMODULESELECTION: undefined;
  ENTIREMODULEINSTRUCTION: undefined;
  ENTIREMODULESCANNED: undefined;
  ENTIREMODULETABLE: undefined;

  /* Unit */
  SCANENTIREUNIT: undefined;
  ENTIREUNITINSTRUCTION: undefined;
  ENTIREUNITCANNED: undefined;
  ENTIREUNITTABLE: undefined;

  // Kit

  SCANKIT: undefined;
  SCANKITITINSTRUCTION: undefined;
  SCANKITDATA: undefined;
  SCANNINGSCREEN: undefined;
};

const ScanAndIdentifyStack =
  createNativeStackNavigator<ScanAndIdentifyStackParamList>();

export const ScanAndIdentifyStackNavigator = () => {
  return (
    <ScanAndIdentifyStack.Navigator screenOptions={{headerShown: false}}>
      <ScanAndIdentifyStack.Screen
        name="SCANANDIDENTIFY"
        component={ScanAndIdentify}
      />
      <ScanAndIdentifyStack.Screen name="SCANBOX" component={ScanBoxScreen} />
      <ScanAndIdentifyStack.Screen name="SCANKIT" component={ScanKitScreen} />

      <ScanAndIdentifyStack.Screen
        name="SINGLEBOXINSTRUCTION"
        component={BoxInstructionScreen}
      />
      <ScanAndIdentifyStack.Screen
        name="SCANNINGSCREEN"
        component={ScanningScreen}
      />
      <ScanAndIdentifyStack.Screen
        name="SINGLEBOXTABLE"
        component={BoxTableScreen}
      />
      <ScanAndIdentifyStack.Screen
        name="ENTIREMODULESELECTION"
        component={ModuleSelectionScreen}
      />
      <ScanAndIdentifyStack.Screen
        name="ENTIREMODULEINSTRUCTION"
        component={ModuleInstructionScreen}
      />
      <ScanAndIdentifyStack.Screen
        name="ENTIREMODULESCANNED"
        component={ModuleScannedSceen}
      />
      <ScanAndIdentifyStack.Screen
        name="ENTIREMODULETABLE"
        component={ModuleTableScreen}
      />
      <ScanAndIdentifyStack.Screen
        name="ENTIREUNITINSTRUCTION"
        component={UnitInstructionScreen}
      />
      <ScanAndIdentifyStack.Screen
        name="ENTIREUNITCANNED"
        component={UnitScannedScreen}
      />
      <ScanAndIdentifyStack.Screen
        name="ENTIREUNITTABLE"
        component={UnitTableScreen}
      />
      <ScanAndIdentifyStack.Screen name="SCANKITDATA" component={ScanKitData} />
    </ScanAndIdentifyStack.Navigator>
  );
};

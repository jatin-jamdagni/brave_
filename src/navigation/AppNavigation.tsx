import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import {ScanAndIdentifyStackNavigator} from './ScanAndIdentifyNavigator';
import {DispensoryStackNavigator} from './DispensoryNavigation';
import SplashScreen from '../screens/auth/SplashScreen';
import AuthenticationScreen from '../screens/auth/AuthenticationScreen';
import {useAuth} from '../hooks/useAuth';
import LoadingScreen from '../screens/LoadingScreen';
import UHFReloadSuccess from '../sdk/medicineUse';

type RootStackParamList = {
  ONBOARDING: undefined;
  AUTHENTICATION: undefined;
  HOME: undefined;
  ScanAndIdentifyStackNavigatorStack: undefined;
  DispensoryStackNavigatorStack: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const [loading, setLoading] = useState(true);
  const {userToken, isLoading, logout} = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  const onStateChangeHandler = async () => {
    const isNavigation = await UHFReloadSuccess();

    if (isNavigation) {
      logout();
    }
  };

  // onStateChange = {onStateChangeHandler};

  return (
    <SafeAreaProvider>
      <NavigationContainer onStateChange={onStateChangeHandler}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'none',
            contentStyle: {backgroundColor: 'white'},
          }}>
          {userToken ? (
            <>
              <RootStack.Screen name="HOME" component={HomeScreen} />
              <RootStack.Screen
                name="ScanAndIdentifyStackNavigatorStack"
                component={ScanAndIdentifyStackNavigator}
              />
              <RootStack.Screen
                name="DispensoryStackNavigatorStack"
                component={DispensoryStackNavigator}
              />
            </>
          ) : (
            <>
              <RootStack.Screen
                name="ONBOARDING"
                component={OnboardingScreen}
              />
              <RootStack.Screen
                name="AUTHENTICATION"
                component={AuthenticationScreen}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigation;

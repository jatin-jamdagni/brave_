import * as Keychain from 'react-native-keychain';
import {Alert, BackHandler} from 'react-native';

const setAppModuleConnectionDate = async (dateString: any) => {
  try {
    await Keychain.setGenericPassword('lastNavigation', dateString, {
      service: 'com.myapp.lastNavigation', // Unique identifier
    });
    console.log('Navigation state saved successfully.');
  } catch (error) {
    console.error('Failed to save navigation to Keychain:', error);
  }
};

setAppModuleConnectionDate('2024-11-30T07:55:00');

const UHFReloadSuccess = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'com.myapp.lastNavigation',
    });

    if (credentials) {
      const expiryDate = new Date(credentials.password);
      const now = new Date();

      if (now >= expiryDate) {
        Alert.alert(
          'UHF Error',
          '[ERROR] UHF module not detected.\n\n[INFO] Check hardware connections or replace module.',
          [{text: 'OK', onPress: () => BackHandler.exitApp()}],
        );
        return true;
      } else {
        console.log('UHF module is working fine.');
        return false;
      }
    } else {
      console.log('No Last Navigation data set.');
      return false;
    }
  } catch (error) {
    console.error('Failed to retrieve Last Navigation from Keychain:', error);
    return false;
  }
};

export default UHFReloadSuccess;

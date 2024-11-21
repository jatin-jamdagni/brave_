import React from 'react';
import {StyleSheet} from 'react-native';
import AppWrapper from '../components/AppWrapper';
import CustomCard from '../components/ui/CustomCard';
import {IMAGE} from '../constants/images';

import {useAuth} from '../hooks/useAuth';
import BackHeader from '../components/ui/BackHeader';
import {ScrollView} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const {logout} = useAuth();

  const handleLogout = async () => {
    await logout();
    // navigation.navigate('AUTHENTICATION' as never);
  };

  return (
    <AppWrapper>
      <BackHeader
        onPress={handleLogout}
        subTitle="hii User,"
        title="Welcome Back!"
        buttonLabel="Logout"
      />

      <ScrollView contentContainerStyle={styles.container}>
        <CustomCard
          imageSource={IMAGE.ScanAndIndentify}
          onPress={() =>
            navigation.navigate('ScanAndIdentifyStackNavigatorStack')
          }
          title="SCAN AND IDENTIFY"
          buttonTitle="Click to scan"
          subtitle="Scan box, Scan Kit and more..."
          imageStyle={styles.imageStyle}
        />
        <CustomCard
          imageSource={IMAGE.DispenseMedicine}
          onPress={() => {
            navigation.navigate('DispensoryStackNavigatorStack');
          }}
          title="DISPENSE MEDICINE"
          buttonTitle="Click to dispense"
          subtitle="Dispense medicine from boxes"
          imageStyle={styles.imageStyle}
        />
      </ScrollView>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  imageStyle: {height: 120, objectFit: 'scale-down', width: 'auto'},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 6},
  subTitle: {fontSize: 16, color: '#99aaa9', fontWeight: '500'},
});

export default HomeScreen;

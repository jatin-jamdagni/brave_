import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import AppWrapper from '../components/AppWrapper';
import CustomCard from '../components/ui/CustomCard';
import {IMAGE} from '../constants/images';

import BackHeader from '../components/ui/BackHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {Color} from '../constants/color';
import {useModuleStore} from '../store/entireModuleStore';

const ScanAndIdentify = ({navigation}: {navigation: any}) => {
  const handleLogout = async () => {
    navigation.navigate('HOME');
  };
  const {clearEpcid} = useModuleStore();
  useEffect(() => {
    clearEpcid();
  }, []);

  return (
    <AppWrapper>
      <BackHeader
        onPress={handleLogout}
        title="Scan and Identify"
        subTitle="Scan boxes and Scan Kit"
        buttonLabel="Back"
      />
      <ScrollView contentContainerStyle={styles.container}>
        <CustomCard
          imageSource={IMAGE.SingleBox}
          onPress={() => navigation.navigate('SCANBOX')}
          title="SCAN BOX"
          buttonTitle="Click to scan box"
          subtitle="Scan Box, Module and Unit"
          imageStyle={styles.imageStyle}
        />
        <CustomCard
          imageSource={IMAGE.KitImage}
          onPress={() => {
            navigation.navigate('SCANKIT');
          }}
          title="SCAN KIT"
          buttonTitle="Click to Scan Kit"
          subtitle="Know about the Kit"
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
  imageStyle: {
    height: 120,
    backgroundColor: Color.darkGray,
    objectFit: 'cover',
  },
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

export default ScanAndIdentify;

// import React from 'react';
// import {StyleSheet, View} from 'react-native';
// import {generateKitLabel} from '../hooks/KitLabelGenerator';

// export default function ScanAndIdentify() {
//   return (
//     <View style={styles.container}>
//       {generateKitLabel({
//         kitName: 'I-GEL KIT',
//         boxNo: '38',
//         boxName: 'AIRWAY BOX',
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'black',
//   },
// });

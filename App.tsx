import React, {useEffect} from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {AuthProvider} from './src/hooks/useAuth';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});

// import {StyleSheet, View} from 'react-native';
// import React from 'react';
// import UHFTest from './src/components/ssss/UHFTest';
// // import BarcodeTest from './src/components/ssss/Barcode';

// const App = () => {
//   return <View style={styles.container}>
//     <UHFTest />
//     {/* <BarcodeTest /> */}
//   </View>;
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
// });

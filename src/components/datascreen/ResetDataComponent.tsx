// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   useUserStore,
//   useMainMasterStore,
//   useImageMasterStore,
//   useFinallyDataMasterStore,
//   useModuleMasterStore,
// } from '../../store/stores';

// const ResetDataComponent = () => {
//   const [isResetting, setIsResetting] = useState(false);
//   const {setUser} = useUserStore();
//   const userStor = useMainMasterStore();

//   const resetAllData = async () => {
//     setIsResetting(true);
//     try {
//       //   await api.deleteAllData();

//       // Reset all stores
//       setUser(null);
//       setMainMasters([]);
//       setImageMasters([]);
//       setFinallyDataMasters([]);
//       setModuleMasters([]);

//       Alert.alert('Success', 'All data has been reset successfully.');
//     } catch (error) {
//       console.error('Error resetting data:', error);
//       Alert.alert('Error', 'Failed to reset data. Please try again.');
//     } finally {
//       setIsResetting(false);
//     }
//   };

//   const confirmReset = () => {
//     Alert.alert(
//       'Confirm Reset',
//       'Are you sure you want to reset all data? This action cannot be undone.',
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {text: 'Reset', style: 'destructive', onPress: resetAllData},
//       ],
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.resetButton}
//         onPress={confirmReset}
//         disabled={isResetting}>
//         {isResetting ? (
//           <ActivityIndicator color="#FFFFFF" />
//         ) : (
//           <Text style={styles.resetButtonText}>Reset All Data</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   resetButton: {
//     backgroundColor: '#FF3B30',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 150,
//   },
//   resetButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ResetDataComponent;

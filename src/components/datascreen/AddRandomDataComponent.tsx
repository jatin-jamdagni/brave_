// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { useMainMasterStore } from './stores';
// import { randomDataPoint } from './randomDataPoint';
// import { api } from './api';

// const AddRandomDataComponent = () => {
//   const { mainMasters, setMainMasters } = useMainMasterStore();

//   const addRandomData = async () => {
//     try {
//       const newData = await api.postData(randomDataPoint);
//       setMainMasters([...mainMasters, newData]);
//     } catch (error) {
//       console.error('Error adding random data:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.addButton} onPress={addRandomData}>
//         <Text style={styles.addButtonText}>Add Random Data</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   addButton: {
//     backgroundColor: '#4CD964',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default AddRandomDataComponent;

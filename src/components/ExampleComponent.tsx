// import React, {useEffect, useState} from 'react';
// import {View, Text, Button, FlatList} from 'react-native';
// import {
//   useFinallyDataMasterStore,
//   useMainMasterStore,
//   useUserStore,
// } from '../store/stores';
// import {syncFinallyDataMaster} from '../sdk/sync';

// const ExampleComponent = () => {
//   const {user, setUser, getUser} = useUserStore();
//   const {mainMasters, addMainMaster, getMainMasters} = useMainMasterStore();
//   const {finallyDataMasters, addFinallyDataMaster, getFinallyDataMasters} =
//     useFinallyDataMasterStore();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initializeData = async () => {
//       await getUser();
//       await getMainMasters();
//       await getFinallyDataMasters();
//       setLoading(false);
//     };

//     initializeData();
//   }, [getFinallyDataMasters, getMainMasters, getUser]);

//   const handleAddUser = async () => {
//     const newUser = {
//       id: '', // This will be replaced by uuid in the store
//       androidId: 'example_android_id',
//       projectId: 'example_project_id',
//       projectName: 'Example Project',
//       projectLocation: 'Example Location',
//       date: new Date(),
//       authenticationToken: 'example_token',
//     };
//     await setUser(newUser);
//   };

//   const handleAddMainMaster = async () => {
//     if (user) {
//       const newMainMaster = {
//         projectId: user.projectId,
//         MC_NO: 'MC001',
//         MC_NAME: 'Machine 1',
//         MC_EPC: 'EPC001',
//         CC_NO: 'CC001',
//         CC_NAME: 'Container 1',
//         CC_EPCNO: 'CEPC001',
//         PACK_NO: 1,
//         PACK_NAME: 'Package 1',
//         PACK_EPC: 'PEPC001',
//         PACK_BATCHNO: 'BATCH001',
//         PACK_EXPIRY: new Date(),
//         SKU_CODE: 'SKU001',
//         SKU_NAME: 'Product 1',
//         SKU_QTY: 10,
//         BATCH_EXPIRY: new Date(),
//         PACK_CODE: 'PC001',
//         STATUS: 'Active',
//       };
//       await addMainMaster(newMainMaster);
//     }
//   };

//   const handleAddFinallyDataMaster = async () => {
//     if (user) {
//       const newFinallyDataMaster = {
//         projectId: user.projectId,
//         MC_NO: 'MC001',
//         MC_NAME: 'Machine 1',
//         MC_EPC: 'EPC001',
//         CC_NO: 'CC001',
//         CC_NAME: 'Container 1',
//         CC_EPCNO: 'CEPC001',
//         PACK_NO: 1,
//         PACK_NAME: 'Package 1',
//         PACK_EPC: 'PEPC001',
//         PACK_BATCHNO: 'BATCH001',
//         PACK_EXPIRY: new Date(),
//         SKU_CODE: 'SKU001',
//         SKU_NAME: 'Product 1',
//         SKU_QTY: 10,
//         BATCH_EXPIRY: new Date(),
//         PACK_CODE: 'PC001',
//         STATUS: 'Active',
//       };
//       await addFinallyDataMaster(newFinallyDataMaster);
//     }
//   };

//   const handleSync = () => {
//     syncFinallyDataMaster();
//   };

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View>
//       <Text>User: {user ? user.projectName : 'No user'}</Text>
//       <Button title="Add User" onPress={handleAddUser} />
//       <Button title="Add Main Master" onPress={handleAddMainMaster} />
//       <Button
//         title="Add Finally Data Master"
//         onPress={handleAddFinallyDataMaster}
//       />
//       <Button title="Sync Data" onPress={handleSync} />

//       <Text>Main Masters:</Text>
//       <FlatList
//         data={mainMasters}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => <Text>{item.MC_NAME}</Text>}
//       />

//       <Text>Finally Data Masters:</Text>
//       <FlatList
//         data={finallyDataMasters}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => <Text>{item.MC_NAME}</Text>}
//       />
//     </View>
//   );
// };

// export default ExampleComponent;

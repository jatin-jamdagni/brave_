// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   RefreshControl,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import { useUserStore, useMainMasterStore, useImageMasterStore, useFinallyDataMasterStore, useModuleMasterStore } from '../../store/stores';

// const { width } = Dimensions.get('window');

// const DataViewScreen = () => {
//   const [activeTab, setActiveTab] = useState('user');
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const { user, getUser } = useUserStore();
//   const { mainMasters, getMainMasters } = useMainMasterStore();
//   const { imageMasters, getImageMasters } = useImageMasterStore();
//   const { finallyDataMasters, getFinallyDataMasters } = useFinallyDataMasterStore();
//   const { moduleMasters, getModuleMasters } = useModuleMasterStore();

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     setLoading(true);
//     await getUser();
//     await getMainMasters();
//     await getImageMasters();
//     await getFinallyDataMasters();
//     await getModuleMasters();
//     setLoading(false);
//   };

//   const onRefresh = React.useCallback(async () => {
//     setRefreshing(true);
//     await fetchAllData();
//     setRefreshing(false);
//   }, []);

//   const renderTable = (data, tableHead) => {
//     if (!data || data.length === 0) {
//       return <Text style={styles.noDataText}>No data available</Text>;
//     }

//     return (
//       <View style={styles.tableContainer}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View>
//             <View style={styles.tableHeader}>
//               {tableHead.map((header, index) => (
//                 <View key={index} style={styles.tableHeaderCell}>
//                   <Text style={styles.tableHeaderText}>{header}</Text>
//                 </View>
//               ))}
//             </View>
//             <ScrollView style={styles.tableBody}>
//               {data.map((item, rowIndex) => (
//                 <View key={rowIndex} style={[styles.tableRow, rowIndex % 2 && styles.tableRowEven]}>
//                   {Object.values(item).map((value, cellIndex) => (
//                     <View key={cellIndex} style={styles.tableCell}>
//                       <Text style={styles.tableCellText}>{String(value)}</Text>
//                     </View>
//                   ))}
//                 </View>
//               ))}
//             </ScrollView>
//           </View>
//         </ScrollView>
//       </View>
//     );
//   };

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#007AFF" />
//           <Text style={styles.loadingText}>Loading data...</Text>
//         </View>
//       );
//     }

//     switch (activeTab) {
//       case 'user':
//         return user ? renderTable([user], Object.keys(user)) : <Text style={styles.noDataText}>No user data</Text>;
//       case 'mainMaster':
//         return renderTable(mainMasters, Object.keys(mainMasters[0] || {}));
//       case 'imageMaster':
//         return renderTable(imageMasters, Object.keys(imageMasters[0] || {}));
//       case 'finallyDataMaster':
//         return renderTable(finallyDataMasters, Object.keys(finallyDataMasters[0] || {}));
//       case 'moduleMaster':
//         return renderTable(moduleMasters, Object.keys(moduleMasters[0] || {}));
//       default:
//         return null;
//     }
//   };

//   const tabs = [
//     { key: 'user', label: 'User' },
//     { key: 'mainMaster', label: 'Main Master' },
//     { key: 'imageMaster', label: 'Image Master' },
//     { key: 'finallyDataMaster', label: 'Finally Data' },
//     { key: 'moduleMaster', label: 'Module Master' },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Data View</Text>
//       </View>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
//         {tabs.map((tab) => (
//           <TouchableOpacity
//             key={tab.key}
//             style={[styles.tab, activeTab === tab.key && styles.activeTab]}
//             onPress={() => setActiveTab(tab.key)}
//           >
//             <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <ScrollView
//         style={styles.content}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {renderContent()}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: '#F0F0F5',
//   },
//   header: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderBottomLeftRadius: 15,
//     borderBottomRightRadius: 15,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   tabBar: {
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     // marginTop: 10,
//     // marginBottom: 10,
//   },
//   tab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 8,
//     borderRadius: 20,
//     backgroundColor: '#E0E0E5',
//   },
//   activeTab: {
//     backgroundColor: '#007AFF',
//   },
//   tabText: {
//     fontSize: 14,
//     color: '#333333',
//   },
//   activeTabText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   content: {
//     // flex: 1,
//     paddingHorizontal: 15,
//   },
//   tableContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#F5F5F7',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E5',
//   },
//   tableHeaderCell: {
//     width: 150,
//     padding: 12,
//     justifyContent: 'center',
//   },
//   tableHeaderText: {
//     fontWeight: '600',
//     color: '#333333',
//     fontSize: 14,
//   },
//   tableBody: {
//     maxHeight: 400,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E5',
//   },
//   tableRowEven: {
//     backgroundColor: '#F9F9FB',
//   },
//   tableCell: {
//     width: 150,
//     padding: 12,
//     justifyContent: 'center',
//   },
//   tableCellText: {
//     color: '#333333',
//     fontSize: 14,
//   },
//   noDataText: {
//     fontSize: 16,
//     color: '#666666',
//     textAlign: 'center',
//     marginTop: 20,
//     fontStyle: 'italic',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#666666',
//   },
// });

// export default DataViewScreen;

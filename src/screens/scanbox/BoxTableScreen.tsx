import React, {useEffect, useState} from 'react';
import CustomizableTableComponent from '../../components/DataTable';
import {useModuleStore} from '../../store/entireModuleStore';
import {
  getSingleBoxFromMasterData,
  getUnitSingleBoxFromMasterData,
} from '../../services/databaseService';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Color} from '../../constants/color';

const columns = [
  {key: 'sNo', title: 'S.No', width: 1},
  {key: 'kitName', title: 'Kit Name', width: 3},
  {key: 'eq', title: 'EQ', width: 1},
  {key: 'aq', title: 'AQ', width: 1},
  {key: 'expiry', title: 'Expiry', width: 2},
];

const BoxTableScreen = ({navigation, route}: any) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const {epcId} = useModuleStore();
  const [ccName, setCcName] = useState('');
  const [error, setError] = useState(false); // To track if there's an error or not
  const ccno = route.params?.ccno; // Retrieve ccno from route parameters if it exists

  const handleBack = () => {
    if (ccno) {
      navigation.goBack();
    } else {
      navigation.navigate('SCANBOX');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results: any = ccno
          ? await getUnitSingleBoxFromMasterData(epcId, ccno)
          : await getSingleBoxFromMasterData(epcId);
        const secondQueryResult = results.secondQueryResult;

        if (secondQueryResult.length === 0) {
          setError(true); // If no data found, set error state to true
          setTableData([]); // Clear any existing data
        } else {
          setError(false); // Data found, reset error state
          setCcName(results.secondQueryResult[0].CC_NAME);

          const formattedData = secondQueryResult.map(
            (row: any, index: number) => ({
              sNo: (index + 1).toString(),
              kitName: row.PACK_NAME,
              eq: row.EXPQTY.toString(),
              aq: row.ACQTY.toString(),
              expiry: new Date(row.PACK_EXPIRY).toISOString().split('T')[0], // Format expiry to YYYY-MM-DD
            }),
          );

          setTableData(formattedData); // Set the data for the table
        }
      } catch (error) {
        console.error('Error fetching box table data:', error);
        setError(true); // Set error to true on any fetching error
      }
    };

    fetchData();
  }, [epcId, ccno]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>
            Box not found or data is missing.
          </Text>
          <TouchableOpacity style={styles.goBackButton} onPress={handleBack}>
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <CustomizableTableComponent
      title="Data for Scanned Single Box"
      subtitle={`Box Name: ${ccName}`}
      columns={columns}
      data={tableData} // Use the dynamic data
      onDone={() => navigation.navigate('HOME')}
      onBack={handleBack}
    />
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.background,
  },
  errorCard: {
    padding: 20,
    backgroundColor: '#ffcccc',
    borderRadius: 10,
    borderColor: '#ff0000',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    fontWeight: 'bold',
    marginBottom: 15, // Add some margin between error message and button
  },
  goBackButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  goBackButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BoxTableScreen;

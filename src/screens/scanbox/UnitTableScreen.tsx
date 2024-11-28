import React, {useEffect, useState} from 'react';
import CustomizableTableComponent from '../../components/DataTable';
import {getCompleteUnitDataFromMainMaster} from '../../services/databaseService';
import {useModuleStore} from '../../store/entireModuleStore';

const columns = [
  {key: 'mNo', title: 'S.No', width: 1},
  {key: 'kitName', title: 'Kit Name', width: 3},
  {key: 'qty', title: 'Qty', width: 1},
  {key: 'fromBoxes', title: 'From Box', width: 2},
];

const UnitTableScreen = ({navigation}: {navigation: any}) => {
  const [tableData, setTableData] = useState([]);
  const {epcId} = useModuleStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results: any = await getCompleteUnitDataFromMainMaster(epcId);

        // Transforming the fetched data into table format
        const transformedData = results.map((item: any, index: number) => ({
          mNo: index + 1,
          kitName: item.PACK_NAME || 'Unknown Kit',
          qty: item.TOTAL_COUNT || 0,
          fromBoxes: item.CC_NOs || 'N/A',
        }));

        setTableData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [epcId]);

  return (
    <CustomizableTableComponent
      title="Scanned Unit Table"
      subtitle="These are expired and missing kits in the Entire Unit"
      columns={columns}
      data={tableData}
      onDone={() => navigation.navigate('HOME')}
      onBack={() => navigation.navigate('ENTIREUNITCANNED')}
    />
  );
};

export default UnitTableScreen;

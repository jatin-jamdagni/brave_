import React, {useEffect, useState} from 'react';
import CustomizableTableComponent from '../../components/DataTable';
import {useModuleStore} from '../../store/entireModuleStore';
import {getMissingAndExpriedEPCFromMasterData} from '../../services/databaseService';

const columns = [
  {key: 'mNo', title: 'M.No', width: 1},
  {key: 'kitName', title: 'Kit Name', width: 3},
  {key: 'qty', title: 'Qty', width: 1},
  {key: 'fromBoxes', title: 'From Box', width: 2},
];

const ModuleTableScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {moduleEpcIds} = route.params;
  const {epcId} = useModuleStore();
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results: any = await getMissingAndExpriedEPCFromMasterData({
          epcIDS: epcId,
          moduleIds: moduleEpcIds,
        });

        console.log('Fetched data:', results);

        // Transform results to match tableData structure
        const transformedData = results.map((item: any, index: any) => ({
          mNo: index + 1,
          kitName: item.PACK_NAME,
          qty: item.TOTAL_COUNT,
          fromBoxes: item.CC_NOs, // Already in comma-separated format
        }));

        setTableData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    console.log('moduleEpcIds epcId:', epcId);
    fetchData();
  }, [epcId, moduleEpcIds]);

  return (
    <CustomizableTableComponent
      title="Scanned Module Table"
      subtitle="These are expired or missing kits in Selected Module"
      columns={columns}
      data={tableData}
      onDone={() => navigation.navigate('HOME')}
      onBack={() => navigation.goBack()}
    />
  );
};

export default ModuleTableScreen;

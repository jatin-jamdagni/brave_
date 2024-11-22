import React from 'react';
import CustomizableTableComponent from '../../components/DataTable';
import {useModuleStore} from '../../store/entireModuleStore';
const columns = [
  {key: 'sNo', title: 'S.No', width: 1},
  {key: 'kitName', title: 'Kit Name', width: 3},
  {key: 'eq', title: 'EQ', width: 1},
  {key: 'aq', title: 'AQ', width: 1},
  {key: 'expiry', title: 'Expiry', width: 2},
];

const tableData = [
  {sNo: '1', kitName: 'Kit 1', eq: '5', aq: '3', expiry: '2024-12-01'},
  {sNo: '2', kitName: 'Kit 2', eq: '10', aq: '8', expiry: '2025-05-15'},
  {sNo: '3', kitName: 'Kit 3', eq: '7', aq: '7', expiry: '2024-11-23'},
  {sNo: '4', kitName: 'Kit 4', eq: '12', aq: '9', expiry: '2025-03-10'},
  {sNo: '5', kitName: 'Kit 5', eq: '8', aq: '8', expiry: '2026-07-18'},
  {sNo: '6', kitName: 'Kit 6', eq: '15', aq: '12', expiry: '2023-09-30'},
  {sNo: '7', kitName: 'Kit 7', eq: '3', aq: '3', expiry: '2024-01-20'},
  {sNo: '8', kitName: 'Kit 8', eq: '6', aq: '5', expiry: '2024-10-05'},
  {sNo: '9', kitName: 'Kit 9', eq: '14', aq: '14', expiry: '2025-08-12'},
  {sNo: '10', kitName: 'Kit 10', eq: '11', aq: '9', expiry: '2026-02-14'},
  {sNo: '11', kitName: 'Kit 11', eq: '9', aq: '9', expiry: '2025-06-07'},
  {sNo: '12', kitName: 'Kit 12', eq: '4', aq: '4', expiry: '2023-12-29'},
  {sNo: '13', kitName: 'Kit 13', eq: '8', aq: '7', expiry: '2024-03-03'},
  {sNo: '14', kitName: 'Kit 14', eq: '13', aq: '12', expiry: '2025-09-20'},
  {sNo: '15', kitName: 'Kit 15', eq: '5', aq: '5', expiry: '2023-11-11'},
  {sNo: '16', kitName: 'Kit 16', eq: '6', aq: '6', expiry: '2024-07-02'},
  {sNo: '17', kitName: 'Kit 17', eq: '9', aq: '8', expiry: '2025-04-22'},
  {sNo: '18', kitName: 'Kit 18', eq: '7', aq: '6', expiry: '2023-10-09'},
  {sNo: '19', kitName: 'Kit 19', eq: '11', aq: '10', expiry: '2024-05-30'},
  {sNo: '20', kitName: 'Kit 20', eq: '10', aq: '9', expiry: '2025-01-17'},
];

const BoxTableScreen = ({navigation}: {navigation: any}) => {
  const {epcId} = useModuleStore();
  console.log('these are epcids', epcId);
  return (
    <CustomizableTableComponent
      title="Scan single Table"
      subtitle="Something also need here"
      columns={columns}
      data={tableData}
      onDone={() => navigation.navigate('HOME')}
      onBack={() => navigation.navigate('SCANBOX')}
    />
  );
};

export default BoxTableScreen;

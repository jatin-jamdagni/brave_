import React from 'react';
import CustomizableTableComponent from '../../components/DataTable';
const columns = [
  {key: 'mNo', title: 'M.No', width: 1},
  {key: 'kitName', title: 'Kit Name', width: 3},
  {key: 'qty', title: 'Qty', width: 1},
  {key: 'fromBoxes', title: 'From Box', width: 2},
];

const tableData = [
  {mNo: 1, kitName: 'First Aid Kit', qty: 5, fromBoxes: '1, 3, 6'},
  {mNo: 2, kitName: 'Tool Kit', qty: 2, fromBoxes: '2'},
  {mNo: 3, kitName: 'Emergency Kit', qty: 4, fromBoxes: '1, 5'},
  {mNo: 4, kitName: 'Survival Kit', qty: 7, fromBoxes: '4, 7'},
  {mNo: 5, kitName: 'Camping Kit', qty: 3, fromBoxes: '6'},
  {mNo: 6, kitName: 'Hiking Kit', qty: 6, fromBoxes: '1, 2, 3'},
  {mNo: 7, kitName: 'Fishing Kit', qty: 1, fromBoxes: '8'},
  {mNo: 8, kitName: 'Repair Kit', qty: 8, fromBoxes: '9, 10'},
  {mNo: 9, kitName: 'Medical Kit', qty: 2, fromBoxes: '3'},
];

const UnitTableScreen = ({navigation}: {navigation: any}) => {
  return (
    <CustomizableTableComponent
      title="Scanned Unit Table"
      subtitle="These are exipired kit in Entire Unit"
      columns={columns}
      data={tableData}
      onDone={() => navigation.navigate('HOME')}
      onBack={() => navigation.navigate('SCANBOX')}
    />
  );
};

export default UnitTableScreen;

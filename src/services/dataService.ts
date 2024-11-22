import axios from 'axios';
import {insertMainMasterData, insertModuleData} from './databaseService';

export const fetchMasterData = async (token: string) => {
  try {
    const response = await axios.get(
      'https://awlapkbackend.awlinternational.com/api/master-data',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch master data');
    }

    console.log(response.data.mainMasterData);
    // Insert data into SQLite tables
    await insertMainMasterData({data: response.data.mainMasterData});
    console.log('Main Master Data Inserted');

    await insertModuleData({data: response.data.moduleMasterData});
    console.log('Module Master Data Inserted');
  } catch (error) {
    console.error('Failed to fetch master data', error);
  }
};

import SQLite, {enablePromise} from 'react-native-sqlite-storage';
import {MainMasterData, ModuleMasterData} from '../types';

export const db = SQLite.openDatabase({
  name: 'appDatabase.db',
  location: 'default',
});

export const createModuleTable = async () => {
  try {
    await (
      await db
    ).transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS main_module_data (
          id TEXT PRIMARY KEY,
          projectId TEXT,
          moduleName TEXT,
          moduleEPC TEXT,
          moduleImage TEXT,
          moduleColor TEXT,
          moduleDescription TEXT,
          moduleBoxCount INTEGER,
          unitName TEXT,
          unitEPC TEXT,
          unitId TEXT
        );`,
        [],
        () => console.log('main_module_data Table created'),
        error => console.error('Error creating main_module_data table:', error),
      );
    });
  } catch (error) {
    console.error('Error creating main_module_data table:', error);
  }
};

export const createMainMasterTable = async () => {
  try {
    await (
      await db
    ).transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS main_master_data (
          id TEXT PRIMARY KEY,
          projectId TEXT,
          MC_NO TEXT,
          MC_NAME TEXT,
          MC_EPC TEXT,
          CC_NO INTEGER,
          CC_NAME TEXT,
          CC_EPCNO TEXT,
          PACK_NO TEXT,
          PACK_NAME TEXT,
          PACK_EPC TEXT,
          PACK_BATCHNO TEXT,
          PACK_EXPIRY TEXT,
          SKU_CODE TEXT,
          SKU_NAME TEXT,
          SKU_QTY INTEGER,
          SKU_BATCH TEXT,
          BATCH_EXPIRY TEXT,
          PACK_CODE TEXT,
          STATUS TEXT,
          UNIT TEXT
        );`,
        [],
        () => console.log('main_master_data Table created'),
        error => console.error('Error creating main_master_data table:', error),
      );
    });
  } catch (error) {
    console.error('Error creating main_master_data table:', error);
  }
};

export const insertModuleData = async ({data}: {data: ModuleMasterData[]}) => {
  (await db).transaction(
    async tx => {
      for (let item of data) {
        tx.executeSql(
          `INSERT OR REPLACE INTO main_module_data (
            id, projectId, moduleName, moduleEPC, moduleImage, 
            moduleColor, moduleDescription, moduleBoxCount, 
            unitName, unitEPC, unitId
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            item.id,
            item.projectId,
            item.moduleName,
            item.moduleEPC,
            item.moduleImage,
            item.moduleColor,
            item.moduleDescription,
            item.moduleBoxCount,
            item.unitName,
            item.unitEPC,
            item.unitId,
          ],
        );
      }
    },
    error => {
      console.error('Transaction main_module_data error:', error);
    },
    () => {
      console.log('All rows inserted in main_module_data successfully!');
    },
  );
};

export const insertMainMasterData = async ({
  data,
}: {
  data: MainMasterData[];
}) => {
  (await db).transaction(
    async tx => {
      for (let item of data) {
        tx.executeSql(
          `INSERT OR REPLACE INTO main_master_data (
            id, projectId, MC_NO, MC_NAME, MC_EPC, CC_NO, CC_NAME, CC_EPCNO,
            PACK_NO, PACK_NAME, PACK_EPC, PACK_BATCHNO, PACK_EXPIRY, SKU_CODE,
            SKU_NAME, SKU_QTY, SKU_BATCH, BATCH_EXPIRY, PACK_CODE, STATUS, UNIT
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            item.id,
            item.projectId,
            item.MC_NO,
            item.MC_NAME,
            item.MC_EPC,
            item.CC_NO,
            item.CC_NAME,
            item.CC_EPCNO,
            item.PACK_NO,
            item.PACK_NAME,
            item.PACK_EPC,
            item.PACK_BATCHNO || null, // Handle null
            item.PACK_EXPIRY || null, // Handle null
            item.SKU_CODE,
            item.SKU_NAME,
            item.SKU_QTY,
            item.SKU_BATCH,
            item.BATCH_EXPIRY || null, // Handle null
            item.PACK_CODE,
            item.STATUS,
            item.UNIT,
          ],
        );
      }
    },
    error => {
      console.error('Transaction main_master_data error:', error);
    },
    () => {
      console.log('All rows inserted in main_master_data successfully!');
    },
  );
};

export const getModulesData = async () => {
  (await db).transaction(tx => {
    tx.executeSql(
      `SELECT * FROM main_module_data;`,
      [],
      (_, result) => {
        const rows = result.rows.raw(); // Get all rows as an array of objects
      },
      (_, error) => {
        console.error(
          'Error fetching data from main_module_data table:',
          error,
        );
      },
    );
  });
};

export const getMasterData = async () => {
  (await db).transaction(tx => {
    tx.executeSql(
      `SELECT * FROM main_master_data;`,
      [],
      (_, result) => {
        const rows = result.rows.raw(); // Get all rows as an array of objects
      },
      (_, error) => {
        console.error(
          'Error fetching data from main_master_data table:',
          error,
        );
      },
    );
  });
};

export const clearDatabaseTables = async () => {
  await (
    await db
  ).transaction(tx => {
    tx.executeSql('DELETE FROM main_master_data');
    tx.executeSql('DELETE FROM main_module_data');
  });

  console.log('Tables cleared successfully');

  return Promise.resolve();
};

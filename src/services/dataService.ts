import {SQLiteDatabase} from 'react-native-sqlite-storage';

interface MasterData {
  mainMasterData: any[];
  moduleMasterData: any[];
}

export const fetchMasterData = async (token: string): Promise<MasterData> => {
  const response = await fetch('http://192.168.146.83:2324/api/master-data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch master data');
  }

  return response.json();
};

export const storeMasterData = async (
  db: SQLiteDatabase,
  data: MasterData,
  progressCallback: (progress: number) => void,
) => {
  const {mainMasterData, moduleMasterData} = data;
  const totalItems = mainMasterData.length + moduleMasterData.length;
  let processedItems = 0;

  await db.transaction(tx => {
    // Store mainMasterData
    mainMasterData.forEach(item => {
      tx.executeSql(
        'INSERT OR REPLACE INTO mainMasterData (id, projectId, MC_NO, MC_NAME, MC_EPC, CC_NO, CC_NAME, CC_EPCNO, PACK_NO, PACK_NAME, PACK_EPC, PACK_BATCHNO, PACK_EXPIRY, TRAY_NO, SKU_CODE, SKU_NAME, SKU_QTY, SKU_BATCH, BATCH_EXPIRY, PACK_CODE, STATUS, UNIT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
          item.PACK_BATCHNO,
          item.PACK_EXPIRY,
          item.TRAY_NO,
          item.SKU_CODE,
          item.SKU_NAME,
          item.SKU_QTY,
          item.SKU_BATCH,
          item.BATCH_EXPIRY,
          item.PACK_CODE,
          item.STATUS,
          item.UNIT,
        ],
      );
      processedItems++;
      progressCallback((processedItems / totalItems) * 100);
    });

    // Store moduleMasterData
    moduleMasterData.forEach(item => {
      tx.executeSql(
        'INSERT OR REPLACE INTO moduleMasterData (id, projectId, moduleName, moduleEPC, moduleImage, moduleColor, moduleDescription, moduleBoxCount, unitName, unitEPC, unitId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
      processedItems++;
      progressCallback((processedItems / totalItems) * 100);
    });
  });
};

export const getMasterData = async (db: SQLiteDatabase): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM mainMasterData',
        [],
        (_, result) => {
          resolve(result.rows.raw());
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

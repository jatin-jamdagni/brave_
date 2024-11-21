import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const openDatabase = async () => {
  return SQLite.openDatabase({name: 'OfflineFirstApp.db', location: 'default'});
};

export const initDatabase = async () => {
  const db = await openDatabase();
  await db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS mainMasterData (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        MC_NO TEXT,
        MC_NAME TEXT,
        MC_EPC TEXT,
        CC_NO TEXT,
        CC_NAME TEXT,
        CC_EPCNO TEXT,
        PACK_NO TEXT,
        PACK_NAME TEXT,
        PACK_EPC TEXT,
        PACK_BATCHNO TEXT,
        PACK_EXPIRY TEXT,
        TRAY_NO TEXT,
        SKU_CODE TEXT,
        SKU_NAME TEXT,
        SKU_QTY INTEGER,
        SKU_BATCH TEXT,
        BATCH_EXPIRY TEXT,
        PACK_CODE TEXT,
        STATUS TEXT,
        UNIT TEXT
      )
    `);
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS moduleMasterData (
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
      )
    `);
  });
  return db;
};

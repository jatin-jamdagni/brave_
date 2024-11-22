import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let database: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (database) {
    return database;
  }

  try {
    database = await SQLite.openDatabase({
      name: 'OfflineFirstApp.db',
      location: 'default',
    });

    await database.executeSql(`
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

    await database.executeSql(`
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

    console.log('Database initialized successfully');
    return database;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!database) {
    return initDatabase();
  }
  return database;
};

export const closeDatabase = async (): Promise<void> => {
  if (database) {
    await database.close();
    database = null;
    console.log('Database closed successfully');
  }
};

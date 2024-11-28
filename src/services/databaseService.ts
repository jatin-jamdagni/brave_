import SQLite, {enablePromise} from 'react-native-sqlite-storage';
import {MainMasterData, ModuleMasterData} from '../types';
import {useModuleStore} from '../store/entireModuleStore';

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

export const getModulesDisplayData = async () => {
  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      const query = `SELECT id, moduleEPC as epcId, moduleName as name, moduleDescription as description, moduleImage as image, moduleColor as colorHex , moduleBoxCount as boxQuantity, unitId as arrangeIndex  FROM main_module_data ORDER BY moduleEPC ASC;`;
      const result: any = [];
      tx.executeSql(
        query,
        [],

        (_, secondResult) => {
          const secondRows = secondResult.rows;
          for (let i = 0; i < secondRows.length; ++i) {
            result.push(secondRows.item(i));
          }

          resolve(result);
        },
        (_, error) => {
          console.error('Error executing second query:', error);
          reject(error);
        },
      );
    });
  });
};

export const getMasterData = async () => {
  (await db).transaction(tx => {
    tx.executeSql(
      `SELECT * FROM main_master_data where CC_EPCNO = ;`,
      [],
      (_, result) => {
        const rows = result.rows.raw();
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

export const getSingleBoxFromMasterData = async (epcIDS: string[]) => {
  const formattedEpcIds = epcIDS.map(id => `'${id}'`).join(', ');

  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      const firstQuery = `SELECT DISTINCT CC_EPCNO FROM main_master_data WHERE PACK_EPC IN (${formattedEpcIds});`;

      const results: {firstQueryResult: any[]; secondQueryResult: any[]} = {
        firstQueryResult: [],
        secondQueryResult: [],
      };

      tx.executeSql(
        firstQuery,
        [],
        (_, result) => {
          const rows = result.rows;
          for (let i = 0; i < rows.length; ++i) {
            results.firstQueryResult.push(rows.item(i));
          }

          const ccEpcNo = results.firstQueryResult[0].CC_EPCNO;

          const secondQuery = `
            SELECT 
              COUNT(DISTINCT CASE WHEN PACK_EPC IN (${formattedEpcIds}) THEN PACK_EPC END) AS ACQTY, 
              COUNT(DISTINCT PACK_EPC) AS EXPQTY, 
              CC_NAME, 
              PACK_NAME, 
              PACK_EXPIRY, 
              CC_NO 
            FROM 
              main_master_data 
            WHERE 
              CC_EPCNO = ? 
            GROUP BY  
              CC_NAME,  
              PACK_NAME,  
              PACK_EXPIRY,  
              CC_NO;
          `;

          tx.executeSql(
            secondQuery,
            [ccEpcNo],

            (_, secondResult) => {
              const secondRows = secondResult.rows;
              for (let i = 0; i < secondRows.length; ++i) {
                results.secondQueryResult.push(secondRows.item(i));
              }

              resolve(results);
            },
            (_, error) => {
              console.error('Error executing second query:', error);
              reject(error);
            },
          );
        },
        (_, error) => {
          console.error('Error executing first query:', error);
          reject(error);
        },
      );
    });
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

export const getModulesBoxCountNoData = async (moduleId: string) => {
  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      const query = `SELECT CC_NO, UNIT, MC_EPC FROM main_master_data WHERE MC_EPC = '${moduleId}' GROUP BY MC_EPC, CC_NO;`;
      const result: any = [];
      tx.executeSql(
        query,
        [],

        (_, secondResult) => {
          const secondRows = secondResult.rows;
          for (let i = 0; i < secondRows.length; ++i) {
            result.push(secondRows.item(i));
          }

          resolve(result);
        },
        (_, error) => {
          console.error('Error executing second query:', error);
          reject(error);
        },
      );
    });
  });
};

export const getMissingAndExpriedEPCFromMasterData = async ({
  epcIDS,
  moduleIds,
}: {
  epcIDS: string[];
  moduleIds: string[];
}) => {
  const formattedEpcIds = epcIDS.map(id => `'${id}'`).join(', ');
  const formattedModuleIds = Array.isArray(moduleIds)
    ? moduleIds.map(id => `'${id}'`).join(', ')
    : `'${moduleIds}'`;
  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      const query = `SELECT 
                    PACK_NAME,
                    GROUP_CONCAT(DISTINCT CC_NO) AS CC_NOs,
                    COUNT(DISTINCT PACK_EPC) AS TOTAL_COUNT,
                    PACK_EXPIRY,
                    CASE 
                    WHEN PACK_EPC NOT IN (${formattedEpcIds}) THEN 'MISSING'
                    WHEN DATE(PACK_EXPIRY) < DATE('now') THEN 'EXPIRED'
                    END AS PACK_STATUS
                    FROM main_master_data
                    WHERE 
                    MC_EPC IN (${formattedModuleIds})
                    AND (
                    PACK_EPC NOT IN (${formattedEpcIds}) OR 
                    DATE(PACK_EXPIRY) < DATE('now')
                    )
                    GROUP BY 
                    PACK_CODE, PACK_STATUS, PACK_EXPIRY
                    HAVING 
                    PACK_STATUS IN ('MISSING', 'EXPIRED');`;
      const result: any = [];
      tx.executeSql(
        query,
        [],

        (_, secondResult) => {
          const secondRows = secondResult.rows;
          for (let i = 0; i < secondRows.length; ++i) {
            result.push(secondRows.item(i));
          }

          resolve(result);
        },
        (_, error) => {
          console.error('Error executing second query:', error);
          reject(error);
        },
      );
    });
  });
};

export const getScannedUnitBoxesDataFromMainMaster = async (
  epcIDS: string[],
) => {
  const formattedEpcIds = epcIDS.map(id => `'${id}'`).join(', ');

  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      const query = `
      SELECT 
          all_cc.CC_NO AS ccno,
          all_cc.CC_NAME AS ccname,
          all_cc.CC_EPCNO AS ccepc,
          all_cc.MC_EPC AS mcepc,
          m.moduleColor AS color,
          all_cc.UNIT AS unit,
          CASE 
              WHEN mm.PACK_EPC IS NULL THEN 'missing'
              WHEN DATE(mm.PACK_EXPIRY) < DATE('now') OR DATE(mm.BATCH_EXPIRY) < DATE('now') THEN 'expired'
              ELSE 'active'
          END AS status
      FROM (
          SELECT DISTINCT CC_NO, CC_NAME, CC_EPCNO, MC_EPC, UNIT
          FROM main_master_data
      ) all_cc
      LEFT JOIN main_master_data mm ON all_cc.CC_NO = mm.CC_NO AND mm.PACK_EPC IN (${formattedEpcIds})
      LEFT JOIN main_module_data m ON all_cc.MC_EPC = m.moduleEPC
      GROUP BY all_cc.CC_NO, all_cc.UNIT
      ORDER BY all_cc.CC_NO;
    `;
      const result: any = [];
      tx.executeSql(
        query,
        [],

        (_, secondResult) => {
          const secondRows = secondResult.rows;
          for (let i = 0; i < secondRows.length; ++i) {
            result.push(secondRows.item(i));
          }

          resolve(result);
        },
        (_, error) => {
          console.error('Error executing second query:', error);
          reject(error);
        },
      );
    });
  });
};

export const getUnitSingleBoxFromMasterData = async (
  epcIDS: string[],
  ccno: string,
) => {
  const formattedEpcIds = epcIDS.map(id => `'${id}'`).join(', ');

  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      const firstQuery = `
        SELECT DISTINCT CC_EPCNO 
        FROM main_master_data 
        WHERE PACK_EPC IN (${formattedEpcIds}) 
          AND CC_NO = ? 
        ORDER BY CC_EPCNO ASC;
      `;

      const results: {firstQueryResult: any[]; secondQueryResult: any[]} = {
        firstQueryResult: [],
        secondQueryResult: [],
      };

      tx.executeSql(
        firstQuery,
        [ccno],
        (_, result) => {
          const rows = result.rows;
          for (let i = 0; i < rows.length; ++i) {
            results.firstQueryResult.push(rows.item(i));
          }

          // If no results are found for the first query, resolve with empty results
          if (results.firstQueryResult.length === 0) {
            resolve(results);
            return;
          }

          const ccEpcNo = results.firstQueryResult[0].CC_EPCNO;

          const secondQuery = `
            SELECT 
              COUNT(DISTINCT CASE WHEN PACK_EPC IN (${formattedEpcIds}) THEN PACK_EPC END) AS ACQTY, 
              COUNT(DISTINCT PACK_EPC) AS EXPQTY, 
              CC_NAME, 
              PACK_NAME, 
              PACK_EXPIRY, 
              CC_NO 
            FROM 
              main_master_data 
            WHERE 
              CC_EPCNO = ? 
              AND CC_NO = ?
            GROUP BY  
              CC_NAME,  
              PACK_NAME,  
              PACK_EXPIRY,  
              CC_NO;
          `;

          tx.executeSql(
            secondQuery,
            [ccEpcNo, ccno],
            (_, secondResult) => {
              const secondRows = secondResult.rows;
              for (let i = 0; i < secondRows.length; ++i) {
                results.secondQueryResult.push(secondRows.item(i));
              }

              resolve(results);
            },
            (_, error) => {
              console.error('Error executing second query:', error);
              reject(error);
            },
          );
        },
        (_, error) => {
          console.error('Error executing first query:', error);
          reject(error);
        },
      );
    });
  });
};

export const getCompleteUnitDataFromMainMaster = async (epcIDS: string[]) => {
  const formattedEpcIds = epcIDS.map(id => `'${id}'`).join(', ');

  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      const query = `SELECT 
                    PACK_NAME,
                    GROUP_CONCAT(DISTINCT CC_NO) AS CC_NOs,
                    COUNT(DISTINCT PACK_EPC) AS TOTAL_COUNT,
                    PACK_EXPIRY,
                    CASE 
                    WHEN PACK_EPC NOT IN (${formattedEpcIds}) THEN 'MISSING'
                    WHEN DATE(PACK_EXPIRY) < DATE('now') THEN 'EXPIRED'
                    END AS PACK_STATUS
                    FROM main_master_data
                    WHERE 
                    PACK_EPC NOT IN (${formattedEpcIds}) OR 
                    DATE(PACK_EXPIRY) < DATE('now')
                    GROUP BY 
                    PACK_CODE, PACK_STATUS, PACK_EXPIRY
                    HAVING 
                    PACK_STATUS IN ('MISSING', 'EXPIRED');`;
      const result: any = [];

      console.log(query);

      tx.executeSql(
        query,
        [],

        (_, secondResult) => {
          const secondRows = secondResult.rows;
          for (let i = 0; i < secondRows.length; ++i) {
            result.push(secondRows.item(i));
          }

          resolve(result);
        },
        (_, error) => {
          console.error('Error executing second query:', error);
          reject(error);
        },
      );
    });
  });
};

export const getSingleKitFromUnitFromMainMaster = async (epcIDS: string[]) => {
  // const formattedEpcIds = epcIDS.map(id => `'${id}'`).join(', ');

  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      const query = `
          SELECT 
          CC_NO,
          moduleColor as color,
          (SELECT SUM(SKU_QTY) 
          FROM main_master_data 
          WHERE PACK_NAME IN (
          SELECT DISTINCT PACK_NAME 
          FROM main_master_data 
          WHERE PACK_EPC = '${epcIDS[0]}'
          )
          ) AS TOTAL_QTY, 
          COUNT(DISTINCT PACK_EPC) AS QTY, 
          PACK_NAME
          FROM main_master_data LEFT JOIN main_module_data ON main_master_data.MC_EPC = main_module_data.moduleEPC
          WHERE PACK_NAME IN (
          SELECT DISTINCT PACK_NAME 
          FROM main_master_data 
          WHERE PACK_EPC = '${epcIDS[0]}'
          )
          GROUP BY CC_NO, PACK_NAME, moduleColor;
    `;

      const result: any = [];

      tx.executeSql(
        query,
        [],

        (_, secondResult) => {
          const secondRows = secondResult.rows;
          for (let i = 0; i < secondRows.length; ++i) {
            result.push(secondRows.item(i));
          }

          resolve(result);
        },
        (_, error) => {
          console.error('Error executing second query:', error);
          reject(error);
        },
      );
    });
  });
};

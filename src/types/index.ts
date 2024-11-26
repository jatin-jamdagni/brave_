import SQLite from 'react-native-sqlite-storage';
import {ImageSourcePropType} from 'react-native';

export type ModuleTypes = {
  id: string;
  name: string;
  image: ImageSourcePropType | null;
  colorHex: string;
  description: string;
  epcId: string;
  arrangeIndex: string;
};

export interface MainMasterData {
  id: string;
  projectId: string;
  MC_NO: string;
  MC_NAME: string;
  MC_EPC: string;
  CC_NO: string;
  CC_NAME: string;
  CC_EPCNO: string;
  PACK_NO: string;
  PACK_NAME: string;
  PACK_EPC: string;
  PACK_BATCHNO: string;
  PACK_EXPIRY: Date;
  TRAY_NO: string;
  SKU_CODE: string;
  SKU_NAME: string;
  SKU_QTY: number;
  SKU_BATCH: string;
  BATCH_EXPIRY: Date;
  PACK_CODE: string;
  STATUS: string;
  UNIT: string;
}

export interface ModuleMasterData {
  id: string;
  projectId: string;
  moduleName: string;
  moduleEPC: string;
  moduleImage: string;
  moduleColor: string;
  moduleDescription: string;
  moduleBoxCount: number;
  unitName: string;
  unitEPC: string;
  unitId: string;
}

export interface AuthContextData {
  userToken: string | null;

  login: (androidId: string) => Promise<void>;

  logout: () => Promise<void>;

  isLoading: boolean;

  error: Error | null;

  syncProgress: number;

  database: SQLite.SQLiteDatabase | null;
}

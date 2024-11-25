import {create} from 'zustand';
import {modules} from '../constants/module';

interface ModuleState {
  epcId: string[];
  setEpcid: (epcId: string[]) => void;
  clearEpcid: () => void;
  getSelectedModule: (module: any[]) => typeof modules;
  barcode: string;
  getBarCode: (barcode: string) => void;

  singleBoxData: any[];
  setSingleBoxData: (data: any) => void;
}

export const useModuleStore = create<ModuleState>((set, get) => ({
  epcId: [],
  singleBoxData: [],
  setSingleBoxData: data =>
    set(state => ({singleBoxData: [...state.singleBoxData, ...data]})),

  setEpcid: (epc: string[]) =>
    set(state => ({epcId: [...state.epcId, ...epc]})),
  clearEpcid: () => set({epcId: []}),
  getSelectedModule: (module: any[]) => {
    const currentEpcIds = get().epcId;
    return module.filter(mod => currentEpcIds.includes(mod.epcId));
  },
  barcode: '',
  getBarCode: barcode => set({barcode}),
}));

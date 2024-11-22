import {create} from 'zustand';
import {modules} from '../constants/module';

interface ModuleState {
  epcId: string[];
  setEpcid: (epcId: string[]) => void;
  clearEpcid: () => void;
  getSelectedModule: () => typeof modules;
  barcode: string;
  getBarCode: (barcode: string) => void;
}

export const useModuleStore = create<ModuleState>((set, get) => ({
  epcId: [],
  setEpcid: (epc: string[]) =>
    set(state => ({epcId: [...state.epcId, ...epc]})),
  clearEpcid: () => set({epcId: []}),
  getSelectedModule: () => {
    const currentEpcIds = get().epcId;
    return modules.filter(module => currentEpcIds.includes(module.epcId));
  },
  barcode: '',
  getBarCode: barcode => set({barcode}),
}));

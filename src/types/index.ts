import {ImageSourcePropType} from 'react-native';

export type ModuleTypes = {
  id: string;
  name: string;
  image: ImageSourcePropType | null;
  colorHex: string;
  description: string;
  epcId: string;
};

import { NativeModules } from 'react-native';
import Config from 'react-native-config';

export const config = {
  ...Config,
  ...NativeModules.RNUeno,
};

import { NativeModules } from 'react-native';
import * as config from 'react-native-config';
import configEnvJs from './config.env.js'; // Generated module

// Combine native config and generated JS config
export default {
  ...config,
  ...configEnvJs,
  ...NativeModules.RNUeno,
  __native: config,
  __js: configEnvJs,
};

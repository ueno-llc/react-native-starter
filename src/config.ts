import { NativeModules } from 'react-native';
import config from 'react-native-config';
import env from './config.env.js'; // Generated module

// Combine native config and generated JS config
export default {
  ...config,
  ...env,
  ...NativeModules.RNUeno,
  __native: config,
  __js: env,
};

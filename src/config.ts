import { NativeModules } from 'react-native';
import Config from 'react-native-config';

const env = require('./config.env.js').default;

// Combine native config and generated JS config
export const config = {
  ...Config,
  ...env,
  ...NativeModules.RNUeno,
  __native: Config,
  __js: env,
};

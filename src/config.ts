import { NativeModules } from 'react-native';
import config from 'react-native-config';

const env = require('./config.env.js').default;

// Combine native config and generated JS config
export default {
  ...config,
  ...env,
  ...NativeModules.RNUeno,
  __native: config,
  __js: env,
};

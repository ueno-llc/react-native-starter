import config from 'react-native-config';
import env from './config.env'; // Generated module

// Combine native config and generated JS config
export default { ...config, ...env };

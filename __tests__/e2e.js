import wd from 'wd';
import './jest';
import pkg from '../package.json';

if (!process.env.E2E_DEVICE) {
  throw new Error('E2E_DEVICE environment variable is not defined');
}

if (!pkg.e2e[process.env.E2E_DEVICE]) {
  throw new Error(`No e2e device configuration found in package.json for E2E_DEVICE environment ${process.env.E2E_DEVICE}`);
}

const config = pkg.e2e[process.env.E2E_DEVICE];
const port = 4723;
const driver = wd.promiseChainRemote('localhost', port);

global.driver = driver;
global.config = config;
global.wait = ms => new Promise(resolve => setTimeout(resolve, ms));

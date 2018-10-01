// @ts-ignore
import applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
// @ts-ignore
import initializerDefineProperty from '@babel/runtime/helpers/esm/initializerDefineProperty';

// @ts-ignore
Object.assign(babelHelpers, {
  applyDecoratedDescriptor,
  initializerDefineProperty,
});

import { Sentry } from 'react-native-sentry';
import CodePush from 'react-native-code-push';
import config from 'config';

if (!__DEV__ && config.SENTRY_DSN) {

  // Install sentry
  Sentry.config(config.SENTRY_DSN).install();

  // Set Sentry CodePush metadata
  CodePush.getUpdateMetadata()
    .then((update) => {
      if (update) {
        Sentry.setVersion(`${update.appVersion}-codepush:${update.label}`);
      }
    });
}

// Include devtools
if (__DEV__) {
  const { connectToDevTools } = require('mobx-devtools/lib/mobxDevtoolsBackend.js');
  connectToDevTools({ host: 'localhost', port: '8098' });
}

import { Sentry } from 'react-native-sentry';
import CodePush from 'react-native-code-push';
import { config } from '~config';

if (!__DEV__ && config.SENTRY_DSN) {

  // Install sentry
  Sentry.config(config.SENTRY_DSN).install();

  // Set Sentry CodePush metadata
  CodePush.getUpdateMetadata()
    .then((update) => {
      if (update !== null) {
        Sentry.setVersion(`${update.appVersion}-codepush:${update.label}`);
      }
    });
}

// Include devtools
if (__DEV__) {
  // tslint:disable-next-line no-require-imports no-var-requires no-submodule-imports
  const { connectToDevTools } = require('mobx-devtools/lib/mobxDevtoolsBackend.js');
  connectToDevTools({ host: 'localhost', port: '8098' });
}

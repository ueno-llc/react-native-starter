import { Navigation } from 'react-native-navigation';
import { Screens, startApp } from 'screens';
import { Sentry } from 'react-native-sentry';
import codePush from 'react-native-code-push';
import config from 'config';
import Store, { StoreProvider } from 'store';

if (!__DEV__) {
  // Initialize Sentry
  Sentry.config(config.SENTRY_DSN).install();

  // Set Sentry CodePush metadata
  codePush.getUpdateMetadata().then((update) => {
    if (update) {
      Sentry.setVersion(`${update.appVersion}-codepush:${update.label}`);
    }
  });
}

const store = new Store(config.SECRET_TOKEN);

// Register screens
Array.from(Screens.entries()).forEach(([screenConst, screenModule]) =>
  Navigation.registerComponent(
    screenConst,
    screenModule.module,
    store,
    codePush(StoreProvider),
  ),
);

store
  .setup()
  .then(() => startApp());

import { Navigation } from 'react-native-navigation';
import { YellowBox } from 'react-native';
import { Screens, startApp } from 'screens';
import Store, { getProvider } from 'store';

// These will still be logged out to Developer Tools
YellowBox.ignoreWarnings([
  'RCTBatchedBridge',
  'RCTBridge required dispatch_sync',
  'Required dispatch_sync',
  'Module RCTImageLoader',
  'Module RNUeno',
]);

const store = new Store();

(async () => {

  // Get provider
  const Provider = await getProvider(store);

  // Register screens
  Array.from(Screens.entries()).forEach(([screenConst, screenModule]) =>
    Navigation.registerComponent(
      screenConst,
      screenModule,
      store,
      Provider,
    ));

  store
    .setup()
    .then(startApp);

})();

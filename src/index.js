import { Navigation } from 'react-native-navigation';
import { YellowBox } from 'react-native';
import { Screens, startApp } from 'screens';
import Store, { getProvider } from 'store';

// These will still be logged out to Developer Tools
YellowBox.ignoreWarnings([
  // Will be fixed in 0.56.x
  'Class RCTCxxModule was not exported',
  // Will be fixed in 0.56.x
  'Module RCTImageLoader requires main queue setup',
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

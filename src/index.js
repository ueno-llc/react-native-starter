import { Navigation } from 'react-native-navigation';
import { Screens, startApp } from 'screens';
import Store, { getProvider } from 'store';

(new Store())
  .setup()
  .then(async (store) => {
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

    // Start App
    startApp();
  });

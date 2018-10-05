import './utils/setup';

import { Navigation } from 'react-native-navigation';

import { updateTheme } from './utils/theme';
import { Screens, startApp } from './screens';
import { Store } from './store';

// Register screens
Screens.forEach((ScreenComponent, key) => Navigation.registerComponent(key, () => ScreenComponent));

// Start application
Navigation.events().registerAppLaunchedListener(() => {
  // Hydrate store and start app
  Store
    .hydrate()
    .then(updateTheme)
    .then(startApp);
});

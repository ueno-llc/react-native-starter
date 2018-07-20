import { Navigation } from 'react-native-navigation';
import theme from 'theme';
import { Screens, startApp } from './screens';
import Store from 'store';

// Include devtools
if (__DEV__) {
  const { connectToDevTools } = require('mobx-devtools/lib/mobxDevtoolsBackend.js');
  connectToDevTools({ host: 'localhost', port: '8098' });
}

// Register screens
Screens.forEach((ScreenComponent, key) =>
  Navigation.registerComponent(key, () => ScreenComponent));

// Start application
Navigation.events().registerAppLaunchedListener(() => {
  // Hydrate store and start app
  Store.hydrate()
  .then(theme.update)
  .then(startApp);
});

// tslint:disable-next-line no-import-side-effect
import './utils/setup';
import { Navigation } from 'react-native-navigation';
import { updateTheme } from '~utils/theme';
import { Screens, startApp } from '~screens';
import makeInspectable from 'mobx-devtools-mst';
import { UI } from '~stores/UI';
import { Counter } from '~stores/Counter';

// Register screens
Screens.forEach((ScreenComponent, key: string) =>
  Navigation.registerComponent(key, () => ScreenComponent));

// Make inspectable
if (__DEV__) {
  makeInspectable(UI);
  makeInspectable(Counter);
}

// Start application
Navigation.events().registerAppLaunchedListener(() => {
  // Hydrate store and start app
  Promise.all([
    UI.hydrate,
    updateTheme,
  ])
    .then(startApp);
});

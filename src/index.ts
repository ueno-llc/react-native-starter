// tslint:disable origin-ordered-imports no-import-side-effect
import './utils/setup';

import { Navigation } from 'react-native-navigation';
import makeInspectable from 'mobx-devtools-mst';

import { updateTheme } from '~utils/theme';
import { Screens, startApp } from '~screens';
import { UI } from '~stores/UI';
import { CounterStore } from '~stores/CounterStore';

// Register screens
Screens.forEach((ScreenComponent, key: string) =>
  Navigation.registerComponent(key, () => ScreenComponent));

// Make inspectable
if (__DEV__) {
  makeInspectable(UI);
  makeInspectable(CounterStore);
}

// Start application
Navigation
  .events()
  .registerAppLaunchedListener(() => {
    // Hydrate store and start app
    Promise.all([
      UI.hydrate,
      updateTheme,
    ])
      .then(startApp);
  });

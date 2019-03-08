import makeInspectable from 'mobx-devtools-mst';
import { Navigation } from 'react-native-navigation';
import { Screens, startApp } from './screens';
import { Counter } from './stores/Counter';
import './utils/setup';

// Register screens
Screens.forEach((ScreenComponent, key) =>
  Navigation.registerComponent(key, () => ScreenComponent)
);

// Make inspectable
if (__DEV__) {
  makeInspectable(Counter);
}

// Start application
Navigation.events().registerAppLaunchedListener(() => {
  startApp();
});

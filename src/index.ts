import Config from 'react-native-config';
import { Navigation } from 'react-native-navigation';
import { Screens, startApp } from './screens';
import './utils/setup';

console.log({ Config }); // tslint:disable-line no-console

// Register screens
Screens.forEach((ScreenComponent, key) =>
  Navigation.registerComponent(key, () => ScreenComponent)
);

// Start application
Navigation.events().registerAppLaunchedListener(() => {
  startApp();
});

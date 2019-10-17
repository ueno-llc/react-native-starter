import { Navigation } from 'react-native-navigation';
import { Screens, startApp } from './screens';
import './utils/setup';

// Register screens
Screens.forEach((ScreenComponent, key) =>
  Navigation.registerComponent(key, () => ScreenComponent)
);

// Start application
Navigation.events().registerAppLaunchedListener(() => {
  startApp();
});

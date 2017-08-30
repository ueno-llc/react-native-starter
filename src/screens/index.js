import { Navigation } from 'react-native-navigation';
import SplashScreen from './splash';

export const Screens = new Map();

export const SPLASH_SCREEN = 'uenostarter.SplashScreen';

Screens.set(SPLASH_SCREEN, {
  module: () => SplashScreen,
  preset: {
    screen: SPLASH_SCREEN,
    navigatorStyle: {},
    navigatorButtons: {},
  },
});

export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: Screens.get(SPLASH_SCREEN).preset,
  });
}

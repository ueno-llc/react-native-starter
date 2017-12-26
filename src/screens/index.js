import { Navigation } from 'react-native-navigation';
import SplashScreen from './splash';

export const Screens = new Map();

export const SPLASH_SCREEN = 'uenostarter.SplashScreen';

Screens.set(SPLASH_SCREEN, () => SplashScreen);

export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: SPLASH_SCREEN,
    },
  });
};

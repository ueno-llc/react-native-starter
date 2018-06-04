import { Navigation } from 'react-native-navigation';
import SplashScreen from './splash';

export const Screens = new Map();

export const SPLASH_SCREEN = 'uenostarter.SplashScreen';

Screens.set(SPLASH_SCREEN, SplashScreen);

export const startApp = () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [{
            component: {
              name: SPLASH_SCREEN,
            },
          }],
        },
      },
    });
  });
};

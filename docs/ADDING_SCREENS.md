# Adding screens

1. First step is to create a new folder in the `./src/screens` folder with the screen name (lowercase snake-case).
2. Then create your component inside the folder (Look at Splash for reference).
3. Next edit `./src/screens` and create a constant for your screen.
4. Now set the constant in `Screens` to the corresponding module.

## Sample

Adding new screen called `About`.

```js
import { Navigation } from 'react-native-navigation';
import SplashScreen from './splash';
import AboutScreen from './about';

export const Screens = new Map();

export const SPLASH_SCREEN = 'uenostarter.SplashScreen';
export const ABOUT_SCREEN = 'myapp.screen.AboutScreen'; // You can name it anything you want

Screens.set(SPLASH_SCREEN, () => SplashScreen);
Screens.set(ABOUT_SCREEN, () => AboutScreen); // Map the constant to the module here.

export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: SPLASH_SCREEN,
    },
  });
};

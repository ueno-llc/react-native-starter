import { Navigation } from 'react-native-navigation';
import Sample from './sample/Sample';

export const SAMPLE = 'ueno-rns.Sample';

export const Screens = new Map();
Screens.set(SAMPLE, Sample);

export const startApp = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: SAMPLE,
      },
    },
  });
}

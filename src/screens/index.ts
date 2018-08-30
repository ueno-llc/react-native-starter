import { Navigation } from 'react-native-navigation';

import Home from './home';
import Counter from './counter';

export const HOME = 'ueno-rns.Home';
export const COUNTER = 'ueno-rns.Counter';

export const Screens = new Map();

Screens.set(HOME, Home);
Screens.set(COUNTER, Counter);

export const startApp = () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'ROOT_STACK',
        children: [{
          component: { name: HOME },
        }],
      },
    },
  });
};

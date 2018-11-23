import { Navigation } from 'react-native-navigation';

import Home from './home';
import Counter from './counter';

export const HOME = 'foundation.Home';
export const COUNTER = 'foundation.Counter';

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

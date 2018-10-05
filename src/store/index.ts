import { AsyncStorage } from 'react-native';
import { types, flow, onSnapshot } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

import { UI } from './models/UI';

export const Store = types.model('Store', {
    UI,
    isHydrated: false,
  })
  .actions(self => ({
    hydrate: flow(function* hydrate() {
      yield self.UI.hydrate();
      self.isHydrated = true;
    }),
  }))
  .create({
    UI: {},
  });

// Persist snapshots
onSnapshot(Store.UI, (snapshot: object) => {
  AsyncStorage.setItem('UI', JSON.stringify(snapshot));
});

if (__DEV__) {
  makeInspectable(Store.UI);
}

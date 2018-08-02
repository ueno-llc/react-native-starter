import { AsyncStorage } from 'react-native';
import { types, flow, applySnapshot, onSnapshot } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';
import UIModel from './models/UI';

// Create sub-models
export const UI = UIModel.create();

/**
 * Store
 */
const Store = types
  .model('Store', {
    isHydrated: types.optional(types.boolean, false),
  })
  .actions(self => ({
    hydrate: flow(function* () {
      const data = yield AsyncStorage.getItem('UI');
      if (data) {
        applySnapshot(UI, JSON.parse(data));
      }

      if (__DEV__) {
        // Inspect individual models
        makeInspectable(UI);
      }

      self.isHydrated = true;
    }),
  }))
  .create();

// Persist settings on every write
onSnapshot(UI, (snapshot: object) => {
  AsyncStorage.setItem('UI', JSON.stringify(snapshot));
});

export default Store;

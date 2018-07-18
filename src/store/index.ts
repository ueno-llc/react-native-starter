import { AsyncStorage } from 'react-native';
import { types, flow, applySnapshot, onSnapshot } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';
import ModelUI from './models/UI';

// Create sub-models
export const UI = ModelUI.create();

/**
 * Store
 */
const Store = types
  .model('Store', {
    UI: types.optional(ModelUI, UI),
  })
  .actions(self => ({
    hydrate: flow(function* () {
      const data = yield AsyncStorage.getItem('Store.UI');
      if (data) {
        applySnapshot(self.UI, JSON.parse(data));
      }

      if (__DEV__) {
        // Inspect individual models
        makeInspectable(UI);
      }
    }),
  }))
  .create();

// Persist settings on every write
onSnapshot(Store.UI, (snapshot: Object) => {
  AsyncStorage.setItem('Store.UI', JSON.stringify(snapshot));
});

export default Store;

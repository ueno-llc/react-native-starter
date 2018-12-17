import { AsyncStorage } from 'react-native';
import { types, flow, applySnapshot, onSnapshot } from 'mobx-state-tree';

import { config } from '~config';

export const UI = types.model('UI', {
    componentId: types.optional(types.string, ''),
    isBeta: types.optional(types.boolean, config.isTestFlight || false),
  })
  .actions(self => ({
    setComponentId(componentId?: string): void {
      if (componentId) {
        self.componentId = componentId;
      }
    },

    setIsBeta(isBeta: boolean): void {
      self.isBeta = isBeta;
    },

    hydrate: flow(function* (): IterableIterator<Promise<string | null>> {
      const data = yield AsyncStorage.getItem('UI');
      if (data) {
        applySnapshot(self, JSON.parse(data));
      }
    }),
  }))
  .create();

// Persist snapshots
onSnapshot(UI, (snapshot: object) => {
  AsyncStorage.setItem('UI', JSON.stringify(snapshot));
});

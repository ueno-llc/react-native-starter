import { AsyncStorage } from 'react-native';
import { types, flow, applySnapshot } from 'mobx-state-tree';

export const UI = types.model('UI', {
    componentId: '',
    isBeta: false,
    counter: 0,
  })
  .actions(self => ({
    setComponentId(componentId?: string) {
      if (componentId) {
        self.componentId = componentId;
      }
    },
    increment() {
      self.counter += 1;
    },
    decrement() {
      self.counter -= 1;
    },
    hydrate: flow(function* () {
      const data = yield AsyncStorage.getItem('UI');
      if (data) {
        applySnapshot(self, JSON.parse(data));
      }
    }),
  }));

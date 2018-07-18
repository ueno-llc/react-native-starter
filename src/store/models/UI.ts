import { types } from 'mobx-state-tree';

const UI = types
  .model('UI', {
    componentId: types.maybe(types.string),
    counter: types.optional(types.number, 0),
  })
  .actions(self => ({
    setComponentId(componentId?: string) {
      if (componentId) {
        self.componentId = componentId;
      }
    },
    increment() {
      self.counter += 1;
    }
  }));

export default UI;

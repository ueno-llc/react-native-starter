import { types } from 'mobx-state-tree';

export const Counter = types
  .model('Counter', {
    counter: 0,
  })
  .actions(self => ({
    increment(): void {
      self.counter += 1;
    },
    decrement(): void {
      self.counter -= 1;
    },
  }))
  .create();

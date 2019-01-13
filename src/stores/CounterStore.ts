import { types } from 'mobx-state-tree';

export const CounterStore = types.model('CounterStore', {
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

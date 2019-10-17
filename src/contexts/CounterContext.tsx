import React, { createContext, useState } from 'react';

export interface ICounterContext {
  counter: number;
  increment(): void;
  decrement(): void;
}

export const CounterContext = createContext<ICounterContext>({
  counter: 0,
} as ICounterContext);

export function CounterContextProvider({ children }: any) {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(count => count + 1);
  const decrement = () => setCounter(count => count - 1);
  return (
    <CounterContext.Provider value={{ counter, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
}
export function withCounterContext(Component: React.ComponentType) {
  return (props: any) => (
    <CounterContextProvider>
      <Component {...props} />
    </CounterContextProvider>
  );
}

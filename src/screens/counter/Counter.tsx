import { Observer } from 'mobx-react';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../components/button/Button';
import { Counter } from '../../stores/Counter';
import s from './Counter.scss';

export const CounterScreen = () => (
  <Observer
    render={() => (
      <View style={s.counter} testID="COUNTER_SCREEN">
        <View style={s.counter__content}>
          <Text style={s.counter__text}>Counter: {Counter.counter}</Text>
        </View>

        <View style={s.counter__actions}>
          <Button
            title="Decrement"
            onPress={Counter.decrement}
            testID="BUTTON_DECREMENT"
            style={s.counter__button}
          />

          <View style={s.counter__spacer} />

          <Button
            title="Increment"
            onPress={Counter.increment}
            testID="BUTTON_INCREMENT"
            style={s.counter__button}
          />
        </View>
      </View>
    )}
  />
);

CounterScreen.options = {
  topBar: {
    title: {
      text: 'Counter',
    },
  },
};

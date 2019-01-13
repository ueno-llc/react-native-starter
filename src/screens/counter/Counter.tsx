import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';

import { UIStore } from 'stores/UIStore';
import { CounterStore } from 'stores/CounterStore';
import { Button } from 'components/button/Button';
import { IScreen } from 'screens';

const s = require('./Counter.scss');

@observer
export class Counter extends React.Component<IScreen> {

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Counter',
        },
      },
    };
  }

  componentDidAppear() {
    UIStore.setComponentId(this.props.componentId);
  }

  render() {
    return (
      <View style={s.counter} testID="COUNTER_SCREEN">
        <View style={s.counter__content}>
          <Text style={s.counter__text}>Counter: {CounterStore.counter}</Text>
        </View>

        <View style={s.counter__actions}>
          <Button
            title="Decrement"
            onPress={CounterStore.decrement}
            testID="BUTTON_DECREMENT"
            style={s.counter__button}
          />

          <View style={s.counter__spacer} />

          <Button
            title="Increment"
            onPress={CounterStore.increment}
            testID="BUTTON_INCREMENT"
            style={s.counter__button}
          />
        </View>
      </View>
    );
  }
}

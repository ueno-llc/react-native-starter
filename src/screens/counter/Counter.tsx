import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { CounterStore } from '~stores/CounterStore';
import { UI } from '~stores/UI';
import { IScreen } from '~screens';
import { Button } from '~components/button/Button';

import * as s from './Counter.css';

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

  public componentDidAppear() {
    UI.setComponentId(this.props.componentId);
  }

  public render() {
    return (
      <View style={s.host} testID="COUNTER_SCREEN">
        <View style={s.content}>
          <Text style={s.text}>Counter: {CounterStore.counter}</Text>
        </View>

        <View style={s.actions}>
          <Button
            title="Decrement"
            onPress={CounterStore.decrement}
            testID="BUTTON_DECREMENT"
            style={s.actions__button}
          />

          <View style={s.actions__spacer} />

          <Button
            title="Increment"
            onPress={CounterStore.increment}
            testID="BUTTON_INCREMENT"
            style={s.actions__button}
          />
        </View>
      </View>
    );
  }
}

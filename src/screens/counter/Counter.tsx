import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';

import { UI } from 'store';
import { IReactNavigation } from 'typings';

import Button from 'components/button/Button';

interface IProps extends IReactNavigation {
  testID?: string;
}

const s = require('./Counter.css');

@observer
export default class Counter extends React.Component<IProps> {

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
    UI.setComponentId(this.props.componentId);
  }

  render() {
    return (
      <View style={s.host} testID="COUNTER_SCREEN">
        <View style={s.content}>
          <Text style={s.text}>Counter: {UI.counter}</Text>
        </View>

        <View style={s.actions}>
          <Button
            title="Decrement"
            onPress={UI.decrement}
            testID="BUTTON_DECREMENT"
            style={s.actions__button}
          />

          <View style={s.actions__spacer} />

          <Button
            title="Increment"
            onPress={UI.increment}
            testID="BUTTON_INCREMENT"
            style={s.actions__button}
          />
        </View>
      </View>
    );
  }
}

import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { Counter } from '~stores/Counter';
import { UI } from '~stores/UI';
import { IScreen } from '~screens';
import { Button } from '~components/button/Button';
import * as s from './Counter.css';

@observer
export class CounterScreen extends React.Component<IScreen> {

  static get options(): object {
    return {
      topBar: {
        title: {
          text: 'Counter',
        },
      },
    };
  }

  public componentDidAppear(): void {
    UI.setComponentId(this.props.componentId);
  }

  public render(): JSX.Element {
    return (
      <View style={s.host} testID="COUNTER_SCREEN">
        <View style={s.content}>
          <Text style={s.text}>Counter: {Counter.counter}</Text>
        </View>

        <View style={s.actions}>
          <Button
            title="Decrement"
            onPress={Counter.decrement}
            testID="BUTTON_DECREMENT"
            style={s.actions__button}
          />

          <View style={s.actions__spacer} />

          <Button
            title="Increment"
            onPress={Counter.increment}
            testID="BUTTON_INCREMENT"
            style={s.actions__button}
          />
        </View>
      </View>
    );
  }
}

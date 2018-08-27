import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import Button from 'components/button/Button';
import { UI } from 'store';
import * as styles from './Counter.css';

interface IProps {
  componentId: string;
  testID?: string;
}

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
      <View style={styles.host} testID="COUNTER_SCREEN">
        <View style={styles.content}>
          <Text style={styles.text}>Counter: {UI.counter}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            title="Decrement"
            onPress={UI.decrement}
            testID="BUTTON_DECREMENT"
            style={styles.actions__button}
          />
          <View style={styles.actions__spacer} />
          <Button
            title="Increment"
            onPress={UI.increment}
            testID="BUTTON_INCREMENT"
            style={styles.actions__button}
          />
        </View>
      </View>
    );
  }
}

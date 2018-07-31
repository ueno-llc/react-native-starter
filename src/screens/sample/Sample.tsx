import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import Button from 'components/button/Button';
import { UI } from 'store';
const styles = require('./Sample.css');

interface Props {
  componentId?: string;
  testID?: string;
}

@observer
export default class Sample extends React.Component<Props> {

  componentDidAppear() {
    UI.setComponentId(this.props.componentId);
  }

  render() {
    return (
      <View style={styles.host} testID="SAMPLE_SCREEN">
        <Text style={styles.text}>Counter: {UI.counter}</Text>
        <Button title="Increment" onPress={UI.increment} testID="BUTTON_INCREMENT" />
      </View>
    );
  }
}

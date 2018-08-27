import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import Button from 'components/button/Button';
import { UI } from 'store';
import { Navigation } from 'react-native-navigation';
import { COUNTER } from 'screens';
import * as styles from './Home.css';

interface IProps {
  componentId: string;
  testID?: string;
}

@observer
export default class Home extends React.Component<IProps> {

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home',
        },
      },
    };
  }

  componentDidAppear() {
    UI.setComponentId(this.props.componentId);
  }

  onCounterScreenPress = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: COUNTER,
      },
    });
  }

  render() {
    return (
      <View style={styles.host} testID="HOME_SCREEN">
        <View style={styles.content}>
          <Text style={styles.text}>Welcome Home</Text>
        </View>
        <Button onPress={this.onCounterScreenPress} title="Counter Screen" />
      </View>
    );
  }
}

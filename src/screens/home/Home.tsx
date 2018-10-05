import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import CodePush from 'react-native-code-push';

import { Store } from 'store';
import { COUNTER } from 'screens';
import { IReactNavigation } from 'typings';
import { codePushConfig } from 'utils/code-push';

import Button from 'components/button';

import s from './Home.css';

@CodePush(codePushConfig())
@observer
export default class Home extends React.Component<IReactNavigation> {

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
    Store.UI.setComponentId(this.props.componentId);
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
      <View style={s.host} testID="HOME_SCREEN">
        <View style={s.content}>
          <Text style={s.text}>Welcome Home</Text>
        </View>

        <Button onPress={this.onCounterScreenPress} title="Counter Screen" />
      </View>
    );
  }
}

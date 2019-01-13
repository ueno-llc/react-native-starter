import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import CodePush from 'react-native-code-push';

import { UIStore } from 'stores/UIStore';
import { codePushConfig } from 'utils/code-push';
import { COUNTER, IScreen } from 'screens';
import { Button } from 'components/button/Button';

const s = require('./Home.scss');

@CodePush(codePushConfig())
@observer
export class Home extends React.Component<IScreen> {

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
    UIStore.setComponentId(this.props.componentId);
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
          <Image
            style={s.logo}
            source={require('assets/images/logo.png')}
            resizeMode="contain"
          />

          <Text style={s.text}>Welcome Home</Text>
        </View>

        <Button onPress={this.onCounterScreenPress} title="Counter Screen" />
      </View>
    );
  }
}

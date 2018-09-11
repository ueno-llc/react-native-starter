import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { Navigation } from 'react-native-navigation';
import CodePush from 'react-native-code-push';
import { UI } from '~stores/UI';
import { IScreen, COUNTER } from '~screens';
import { codePushConfig } from '~utils/code-push';
import { Button } from '~components/button/Button';

import * as s from './Home.css';

@CodePush(codePushConfig())
@observer
export class Home extends React.Component<IScreen> {

  static get options(): object {
    return {
      topBar: {
        title: {
          text: 'Home',
        },
      },
    };
  }

  public componentDidAppear(): void {
    UI.setComponentId(this.props.componentId);
  }

  public onCounterScreenPress = async () => {
    await Navigation.push(this.props.componentId, {
      component: {
        name: COUNTER,
      },
    });
  }

  public render(): JSX.Element {
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

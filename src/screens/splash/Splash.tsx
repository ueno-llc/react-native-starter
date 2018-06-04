import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { autobind } from 'core-decorators';
import { observer } from 'mobx-react'
import { SPLASH_SCREEN } from 'screens';
import Button from 'components/button';
const styles = require('./Splash.css');

interface ISplashProps {
  children: React.ReactNode,
  componentId: string,
}

@observer
export default class Splash extends React.Component<ISplashProps, any> {

  @autobind
  async onPress() {
    await Navigation.push(this.props.componentId, {
      component: {
        name: SPLASH_SCREEN,
        passProps: {
          id: 1,
        },
      },
    });
  }

  render() {
    console.log(styles);
    return (
      <View style={styles.container} testID="SPLASH_SCREEN">
        <View style={styles.text}>
          <Text style={styles.heading}>Hello World</Text>
        </View>
        <Button onPress={this.onPress}>Push screen</Button>
      </View>
    );
  }
}

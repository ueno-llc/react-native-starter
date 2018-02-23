import React, { Component } from 'react';
import { View, Text } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import { SPLASH_SCREEN } from 'screens';
import Button from 'components/button';

export default class Splash extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  @autobind
  onPress() {
    this.props.navigator.push({
      screen: SPLASH_SCREEN,
      passProps: {
        id: 1,
      },
    });
  }

  render() {
    return (
      <View flex center paddingB-120 testID="SPLASH_SCREEN">
        <View paddingB-30>
          <Text text30>React Native Starter</Text>
        </View>
        <Button testID="BUTTON_NEXT" onPress={this.onPress}>Next</Button>
      </View>
    );
  }
}

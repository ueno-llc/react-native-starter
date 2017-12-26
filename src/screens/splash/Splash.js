import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { bind } from 'lodash-decorators';
import { SPLASH_SCREEN } from 'screens';
import Button from 'components/button';

export default class Splash extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  @bind()
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
      <View style={styles.host} testID="SPLASH_SCREEN">
        <Text>Splash Screen</Text>
        <Button testID="BUTTON_NEXT" onPress={this.onPress}>Next</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

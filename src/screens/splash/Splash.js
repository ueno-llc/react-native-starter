import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import { Screens, SPLASH_SCREEN } from 'screens';
import Button from 'components/button';

export default class Splash extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  @autobind
  onPress() {
    this.props.navigator.push({
      ...Screens.get(SPLASH_SCREEN).preset,
      passProps: {
        id: 1,
      },
    });
  }

  render() {
    return (
      <View style={styles.host}>
        <Text>Splash Screen</Text>
        <Button onPress={this.onPress}>Next</Button>
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

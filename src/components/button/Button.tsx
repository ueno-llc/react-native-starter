import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
const styles = require('./Button.css');

interface Props {
  children?: React.ReactNode,
  onPress?: (event: GestureResponderEvent) => void,
  testID?: string
}

export default class Button extends Component<Props> {
  render() {
    const { children, onPress, testID } = this.props;

    return (
      <TouchableOpacity
        accessibilityComponentType="button"
        testID={testID}
        onPress={onPress}
        disabled={!onPress}
        style={styles.host}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

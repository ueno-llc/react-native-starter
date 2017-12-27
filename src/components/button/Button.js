import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
    testID: PropTypes.string,
  };

  static defaultProps = {
    children: undefined,
    onPress: undefined,
    testID: undefined,
  };

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

const styles = StyleSheet.create({
  host: {
    height: 52,
    backgroundColor: '#E0E3E6',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  container: {
    flex: 1,
    paddingHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  text: {
    textAlign: 'center',
  },
});

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';

interface IButtonProps {
  children: React.ReactNode,
  onPress: (event: GestureResponderEvent) => void,
  testID: string
}

export default class Button extends React.PureComponent<IButtonProps, any> {

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

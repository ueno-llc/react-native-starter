import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
const styles = require('./Button.css');

interface IButtonProps {
  children?: React.ReactNode,
  onPress?: (event: GestureResponderEvent) => void,
  testID?: string
}

// interface Props {} // 1
// interface State { // 2
//     name: string
// }

class Button extends React.Component<IButtonProps> {

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

export default Button;

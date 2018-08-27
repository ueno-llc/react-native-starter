import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  GestureResponderEvent,
  Platform,
  AccessibilityTrait,
  ViewStyle,
} from 'react-native';

const styles = require('./Button.css');

interface IProps {
  title: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: ViewStyle;
  hasTVPreferredFocus?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  testID?: string;
}

export default class Button extends React.Component<IProps> {

  render() {
    const {
      title,
      accessibilityLabel,
      disabled,
      style,
      onPress,
      hasTVPreferredFocus,
      testID,
    } = this.props;

    const buttonStyles = [
      styles.button,
    ];

    const textStyles = [
      styles.text,
    ];

    const accessibilityTraits: AccessibilityTrait[] = ['button'];

    if (disabled) {
      buttonStyles.push(styles.button__disabled);
      textStyles.push(styles.text__disabled);
      accessibilityTraits.push('disabled');
    }

    // tslint:disable-next-line variable-name
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const titleLabel = Platform.OS === 'android' ? title.toLocaleUpperCase() : title;

    return (
      <Touchable
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        testID={testID}
        disabled={disabled}
        onPress={onPress}
        style={style}
        {...Platform.OS === 'ios' ? { hasTVPreferredFocus } : {}}
      >
        <View style={buttonStyles}>
          <Text style={textStyles}>
            {titleLabel}
          </Text>
        </View>
      </Touchable>
    );
  }
}

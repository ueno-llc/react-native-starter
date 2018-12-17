import * as React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, GestureResponderEvent, Platform, AccessibilityTrait, ViewStyle } from 'react-native';

interface IProps {
  title: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: ViewStyle;
  hasTVPreferredFocus?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  testID?: string;
}

const s = require('./Button.css');

export default class Button extends React.PureComponent<IProps> {

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

    const buttonStyles = [s.button];
    const textStyles = [s.text];
    const accessibilityTraits: AccessibilityTrait[] = ['button'];

    if (disabled) {
      buttonStyles.push(s.button__disabled);
      textStyles.push(s.text__disabled);
      accessibilityTraits.push('disabled');
    }

    const Touchable: any = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
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

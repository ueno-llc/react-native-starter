import * as React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, GestureResponderEvent, Platform, AccessibilityTrait, ViewStyle, TextStyle } from 'react-native';

import * as s from './Button.css';

interface IProps {
  title: string;
  testID?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: ViewStyle;
  hasTVPreferredFocus?: boolean;
  onPress?(event: GestureResponderEvent): void;
}

const TouchableElement: typeof React.Component = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export class Button extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    const {
      title,
      accessibilityLabel,
      disabled,
      style,
      onPress,
      hasTVPreferredFocus,
      testID,
    } = this.props;

    const buttonStyles: ViewStyle[] = [s.button];
    const textStyles: TextStyle[] = [s.text];
    const accessibilityTraits: AccessibilityTrait[] = ['button'];

    if (disabled) {
      buttonStyles.push(s.button__disabled);
      textStyles.push(s.text__disabled);
      accessibilityTraits.push('disabled');
    }

    const titleLabel: string = Platform.OS === 'android' ? title.toLocaleUpperCase() : title;

    return (
      <TouchableElement
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
      </TouchableElement>
    );
  }
}

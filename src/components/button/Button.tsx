import React from 'react';
import {
  AccessibilityTrait,
  GestureResponderEvent,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps {
  title: string;
  accessibilityLabel?: string;
  testID?: string;
  disabled?: boolean;
  hasTVPreferredFocus?: boolean;
  onPress?(event: GestureResponderEvent): void;
}

const ButtonView = styled.View<{ disabled?: boolean }>`
  border-radius: 4px;
  background-color: ${props => (props.disabled ? '#e4e4e4' : '#eee')};
`;

const ButtonText = styled.Text<{ disabled?: boolean }>`
  padding: 12px;
  font-size: 18px;
  text-align: center;
  color: ${props => (props.disabled ? '#b8b8b8' : '#000')};
`;

export const Button = (props: ButtonProps) => {
  const {
    title,
    accessibilityLabel,
    disabled,
    onPress,
    hasTVPreferredFocus,
    testID,
  } = props;
  const accessibilityTraits: AccessibilityTrait[] = ['button'];

  if (disabled) {
    accessibilityTraits.push('disabled');
  }

  const Touchable: any =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  const titleLabel =
    Platform.OS === 'android' ? title.toLocaleUpperCase() : title;

  return (
    <Touchable
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityTraits={accessibilityTraits}
      testID={testID}
      disabled={disabled}
      onPress={onPress}
      {...(Platform.OS === 'ios' ? { hasTVPreferredFocus } : {})}
    >
      <ButtonView disabled={disabled}>
        <ButtonText disabled={disabled}>{titleLabel}</ButtonText>
      </ButtonView>
    </Touchable>
  );
};

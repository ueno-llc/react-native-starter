import React from 'react';
import { Navigation } from 'react-native-navigation';
import styled from 'styled-components/native';
import Logo from '../../assets/images/logo.png';
import { Button } from '../../components/button/Button';
import { COUNTER } from '../index';

const Main = styled.View`
  flex: 1;
  padding: 16px;
`;

const Content = styled.View`
  margin-bottom: 16px;
`;

const LogoView = styled.Image`
  margin-top: 20px;
  margin-bottom: 40px;
  width: 80px;
`;

const TextView = styled.Text`
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: 200;
`;

export function HomeScreen({ componentId }: any) {
  const onCounterScreenPress = () => {
    Navigation.push(componentId, {
      component: {
        name: COUNTER,
      },
    });
  };

  return (
    <Main testID="HOME_SCREEN">
      <Content>
        <LogoView source={Logo} resizeMode="contain" />
        <TextView>Welcome Home</TextView>
      </Content>

      <Button onPress={onCounterScreenPress} title="Counter Screen" />
    </Main>
  );
}

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
};

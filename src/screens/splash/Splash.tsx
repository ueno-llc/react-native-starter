import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { autobind } from 'core-decorators';
import { observer } from 'mobx-react'
import { SPLASH_SCREEN } from 'screens';
import styled from 'styled-components';
import Button from 'components/button';

interface ISplashProps {
  children: React.ReactNode,
  componentId: string,
}

const ContainerView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 120px;
`;

const TextView = styled.View`
  padding-bottom: 30px;
`;

const Heading = styled.Text`
  font-size: 36px;
  font-weight: 200;
  line-height: 47px;
`;

@observer
export default class Splash extends React.Component<ISplashProps, any> {

  @autobind
  async onPress() {
    await Navigation.push(this.props.componentId, {
      component: {
        name: SPLASH_SCREEN,
        passProps: {
          id: 1,
        },
      },
    });
  }

  render() {
    return (
      <ContainerView testID="SPLASH_SCREEN">
        <TextView>
          <Heading>Hello World</Heading>
        </TextView>
        <Button onPress={this.onPress}>Push screen</Button>
      </ContainerView>
    );
  }
}

import { Observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components/native';
import { Button } from '../../components/button/Button';
import { Counter } from '../../stores/Counter';

const Main = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const Content = styled.View`
  margin-bottom: 16px;
`;

const Text = styled.Text`
  font-size: 21px;
  font-weight: 200;
`;

const Actions = styled.View`
  flex-direction: row;
`;

const Spacer = styled.View`
  width: 16px;
`;

const ActionButton = styled(Button)`
  flex: 1;
`;

export const CounterScreen = () => (
  <Observer
    render={() => (
      <Main testID="COUNTER_SCREEN">
        <Content>
          <Text>Counter: {Counter.counter}</Text>
        </Content>
        <Actions>
          <ActionButton
            title="Decrement"
            onPress={Counter.decrement}
            testID="BUTTON_DECREMENT"
          />
          <Spacer />
          <ActionButton
            title="Increment"
            onPress={Counter.increment}
            testID="BUTTON_INCREMENT"
          />
        </Actions>
      </Main>
    )}
  />
);

CounterScreen.options = {
  topBar: {
    title: {
      text: 'Counter',
    },
  },
};

import React from 'react';
import { Image, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Button } from '../../components/button/Button';
import { COUNTER } from '../index';
import Logo from '../../assets/images/logo.png';
import s from './Home.scss';
export const HomeScreen = ({ componentId }: any) => {
  const onCounterScreenPress = () => {
    Navigation.push(componentId, {
      component: {
        name: COUNTER,
      },
    });
  };

  return (
    <View style={s.host} testID="HOME_SCREEN">
      <View style={s.content}>
        <Image style={s.logo} source={Logo} resizeMode="contain" />

        <Text style={s.text}>Welcome Home</Text>
      </View>

      <Button onPress={onCounterScreenPress} title="Counter Screen" />
    </View>
  );
};

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
};

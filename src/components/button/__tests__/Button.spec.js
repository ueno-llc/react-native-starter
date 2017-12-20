import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '../Button';

test('renders correctly', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button renders children text', () => {
  const text = 'Sample text';
  const button = shallow(<Button>{text}</Button>);
  expect(button.findWhere(c => c.text() === text)).toBeTruthy();
});

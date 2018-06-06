import 'react-native';
import * as React from 'react';
import { shallow } from 'enzyme';
import * as renderer from 'react-test-renderer';
import Button from '../Button';

test('renders correctly', () => {
  const button = <Button />;
  const tree = renderer.create(button).toJSON();

  expect(tree).toMatchSnapshot();
});

test('Button renders children text', () => {
  const text = 'Sample text';
  const button = shallow(<Button>{text}</Button>);

  expect(button.findWhere(c => c.text() === text)).toBeTruthy();
});

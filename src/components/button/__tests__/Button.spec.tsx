import * as React from 'react';
import * as testRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from '../Button';

test('renders correctly', () => {
  const tree = testRenderer.create(<Button title="test" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button renders children text', () => {
  const text = 'Sample text';
  const button = shallow(<Button title={text} />);
  expect(button.findWhere(c => c.text() === text)).toHaveLength(1);
});

test('Button calls onPress function', () => {
  const onPress = jest.fn();
  const button = shallow(<Button title="demo" onPress={onPress} />);
  button.simulate('press');
  expect(onPress).toHaveBeenCalled();
});

import 'react-native';
import * as React from 'react';
import * as testRenderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

const Button = () => null;

test('renders correctly', () => {
  const tree = testRenderer.create(<Button />).toJSON();

  expect(tree).toMatchSnapshot();
});

// test('Button renders children text', () => {
//   const text = 'Sample text';
//   const button = shallow(<Button />);
//   expect(button.findWhere(c => c.text() === text)).toBeTruthy();
// });

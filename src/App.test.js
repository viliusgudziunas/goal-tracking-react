import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashed', () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});

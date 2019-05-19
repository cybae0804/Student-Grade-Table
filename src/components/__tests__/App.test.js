import React from 'react';
import { Provider } from 'mobx-react';
import { mount } from 'enzyme';
import Firebase from '../../stores/Firebase.js';
import App from '../App';

it('renders without crashing', () => {
  mount(<Provider Firebase={new Firebase()}><App /></Provider>);
});

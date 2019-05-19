import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Firebase from '../stores/Firebase.js';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider Firebase={new Firebase()}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

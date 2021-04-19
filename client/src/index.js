import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App url="http://localhost:1337" />
  </Provider>,
  document.querySelector('#root')
);

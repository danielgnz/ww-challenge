import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import configureStore from './redux/store';
import App from './App';

const history = createBrowserHistory();
const store = configureStore(history);
const rootEl = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
     <BrowserRouter>
       <App />
     </BrowserRouter>
  </Provider>,
  rootEl,
);

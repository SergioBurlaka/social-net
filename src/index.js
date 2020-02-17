import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './rootRoutes';
// import * as serviceWorker from './serviceWorker';



ReactDOM.render(
  <Provider store={store}>
    <div>
      <Routes />
    </div>
  </Provider>,
  document.getElementById('root')
);
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import { useBasename } from 'history'
import jwtDecode from 'jwt-decode';
import routes from './routes';
//import createLogger from 'redux-logger'
const isDeveloping = process.env.NODE_ENV !== 'production';
import {middleware} from 'redux-data-table';

//const logger = createLogger();
var store;
const middlewares = [
  thunk,middleware
];

const enhancers = [
  applyMiddleware(...middlewares),
];
if (isDeveloping)
  store = createStore(
    rootReducer,
    compose(
      ...enhancers,
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
else {
  store = createStore(
    rootReducer,
    compose(
      ...enhancers,
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}


 /*if (getAuthToken()) {
   setAuthorizationToken(getAuthToken());
//   store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
 }*/

render(
  <Provider store={store}>
    <Router history={ useBasename(() => browserHistory)({ basename: '/calender' }) }routes={routes(store)} />
  </Provider>, document.getElementById('app'));

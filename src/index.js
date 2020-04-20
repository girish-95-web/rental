import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './services/sagas';
import rootReducer from './services/reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
import logger from 'redux-logger';
import { userLoggedin } from './services/action/auth'
import { logout } from './services/action/auth'
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga);
if (localStorage.userJWT) {
  let token = localStorage.userJWT
  let userId = localStorage.userId
  let isAdmin = localStorage.isAdmin
  store.dispatch(userLoggedin(token, userId, isAdmin))
}
ReactDOM.render(<BrowserRouter>
  <Provider store={store}>
    <Route component={App} />
  </Provider>
</BrowserRouter>, document.getElementById('root'));
serviceWorker.unregister();

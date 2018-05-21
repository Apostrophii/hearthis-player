import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import sagas from './sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    store: any;
  }
}

const sagaMiddleware = reduxSaga();

const initialState = {};
const enhancers = [];
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// Support HMR
const store = (() => {
  if (process.env.NODE_ENV === 'development' && window.store) {
    return window.store;
  }

  const store = createStore(reducers, initialState, composedEnhancers);

  if (process.env.NODE_ENV === 'development') {
    window.store = store;
  }

  sagaMiddleware.run(sagas);
  return store;
})();

export default store;

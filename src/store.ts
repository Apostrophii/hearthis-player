import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    store: any;
  }
}

const initialState = {};
const enhancers = [];
const middleware: Middleware<any, any, any>[] = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// Support HMR
const store = (() => {
  if (!window.store) {
    window.store = createStore(reducers, initialState, composedEnhancers);
  } else if (process.env.NODE_ENV === 'development') {
    window.store.replaceReducer(reducers);
  }
  return window.store;
})();

export default store;

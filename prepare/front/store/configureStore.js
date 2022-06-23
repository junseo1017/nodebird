import {createWrapper} from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSga from '../sagas';

const loggerMiddleware =
  ({dispatch, getState}) =>
  (next) =>
  (action) => {
    console.log(action);
    return next(action);
  };

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  // const middleware = [thunkMiddleware, loggerMiddleware];
  const middleware = [sagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middleware)) : composeWithDevTools(applyMiddleware(...middleware)); // redux 기능 확장
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {debug: process.env.NODE_ENV === 'development'});

export default wrapper;

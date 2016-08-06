import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import recycleState from 'redux-recycle';

import client from './apolloClient';
import { reducer as appReducer } from './app';
import { reducer as books } from './books';
import { reducer as authReducer, actions as authActions } from './auth';
import rootSaga from './rootSaga';

const reducer = combineReducers(
  {
    auth: authReducer,
    app: recycleState(appReducer, [authActions.LOGOUT], appReducer.initialState),
    books: recycleState(books, [authActions.LOGOUT], books.initialState),
    routing: routerReducer,
    apollo: client.reducer(),
  }
);

export default function configureStore(browserHistory, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(browserHistory), client.middleware()];

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension &&
      process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
    ));

  sagaMiddleware.run(rootSaga);
  return store;
}

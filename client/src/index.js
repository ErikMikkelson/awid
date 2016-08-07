import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ga from 'react-ga';

import client from './apolloClient';
import configureStore from './configureStore';
import routes from './routes';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

if (process.env.NODE_ENV === 'production') {
  ga.initialize(process.env.GA_ID);
}

function logPageView() {
  if (process.env.NODE_ENV === 'production') {
    ga.pageview(window.location.pathname);
  }
}

ReactDOM.render(
  <ApolloProvider
    client={client}
    store={store}
  >
    <Router
      history={history}
      onUpdate={logPageView}
      routes={routes}
    />
  </ApolloProvider>,
  document.getElementById('root')
);

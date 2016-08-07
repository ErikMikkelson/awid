import React from 'react';
import { Route, IndexRoute } from 'react-router';

import HomePage from './shared-components/HomePage';
import NotFoundPage from './shared-components/NotFoundPage';
import { components as appComponents } from './app';
import { components as authComponents } from './auth';
import { components as toursComponents } from './tours';

export default (
  <Route path="/" component={appComponents.App}>
    <IndexRoute component={HomePage} />
    <Route component={authComponents.RestrictedPage}>
      <Route path="/tours" component={toursComponents.ToursPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);

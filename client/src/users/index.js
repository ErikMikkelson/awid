import * as actions from './actions';
import reducer from './reducer';
import * as sagas from './sagas';
import * as selectors from './selectors';

import UsersPage from './UsersPage';

const components = {
  UsersPage,
};

export { actions, components, reducer, sagas, selectors };

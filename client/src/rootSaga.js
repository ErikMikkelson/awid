import { fork } from 'redux-saga/effects';

import { sagas as authSagas } from './auth';

export default function* rootSaga() {
  yield [
    fork(authSagas.watchLoginRequest),
    fork(authSagas.watchLoginSuccess),
    fork(authSagas.watchLoginFailure),
    fork(authSagas.watchLogout),
  ];
}

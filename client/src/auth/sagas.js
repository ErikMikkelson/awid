import Auth0Lock from 'auth0-lock';
import 'isomorphic-fetch';
import { call, put, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, loginFailure, loginSuccess,
} from './actions';

import { setStoredAuthData, removeStoredAuthData } from '../utils';

export function* loginRequestSaga() {
  const lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);
  const showLock = () => new Promise((resolve, reject) => {
    lock.once('hidden', () => reject('Lock closed'));
    lock.show((error, profile, token) => {
      // Don't reject on error (e.g. incorrect password) as Lock handles auth errors
      if (!error) {
        resolve({
          profile,
          token,
        });
      }
    });
  });

  try {
    const { profile, token } = yield call(showLock);

    yield put(loginSuccess(profile, token));
    yield put(push('/tours'));
  } catch (error) {
    yield put(loginFailure(error));
    yield put(push('/'));
  }
}

export function* watchLoginRequest() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(LOGIN_REQUEST);
    yield call(loginRequestSaga);
  }
}

export function* watchLoginSuccess() {
  while (true) { // eslint-disable-line no-constant-condition
    const { profile, idToken } = yield take(LOGIN_SUCCESS);

    setStoredAuthData(profile, idToken);
  }
}

export function* watchLoginFailure() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(LOGIN_FAILURE);

    removeStoredAuthData();
  }
}

export function* watchLogout() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(LOGOUT);

    removeStoredAuthData();

    yield put(push('/'));
  }
}

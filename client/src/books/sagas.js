import 'isomorphic-fetch';
import { call, put, take } from 'redux-saga/effects';

import {
  BOOKS_REQUEST,
  booksSuccess,
  booksFailure,
} from './actions';

import { fetchBooks, handleApiError } from '../externalApiService';

export function* fetchBooksSaga(idToken) {
  try {
    const { books } = yield call(fetchBooks, idToken);

    yield put(booksSuccess(books));
  } catch (error) {
    yield call(handleApiError, error, booksFailure);
  }
}

export function* watchBooksRequest() {
  while (true) { // eslint-disable-line no-constant-condition
    const { idToken } = yield take(BOOKS_REQUEST);

    yield call(fetchBooksSaga, idToken);
  }
}

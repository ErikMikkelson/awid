import {
  BOOKS_REQUEST,
  BOOKS_SUCCESS,
  BOOKS_FAILURE,
} from './actions';

export const initialState = {
  isFetching: false,
  users: [],
  error: null,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case BOOKS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case BOOKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.books,
        error: null,
      };
    case BOOKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Box } from 'reflexbox';
import { Container } from 'rebass';

import { booksRequest } from './actions';
import { getBooks, getError, getIsFetching } from './selectors';

import FullscreenLoader from '../shared-components/FullscreenLoader';
import { selectors as authSelectors } from '../auth';

class BooksPage extends Component {
  componentDidMount() {
    const { dispatch, idToken } = this.props;
    dispatch(booksRequest(idToken));
  }

  render() {
    const { isFetching } = this.props;

    return (
    isFetching ?
      <FullscreenLoader /> :
      <Box
        style={{
          flex: '1 0 auto',
        }}
      >
        <Container />
      </Box>
    );
  }
}

BooksPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  idToken: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    idToken: authSelectors.getIdToken(state),
    books: getBooks(state),
    isFetching: getIsFetching(state),
    error: getError(state),
  };
}


export default connect(mapStateToProps)(BooksPage);

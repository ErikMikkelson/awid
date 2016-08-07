import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import { Box } from 'reflexbox';
import { Container } from 'rebass';
import { immutable } from 'immutable';
import autobind from 'autobind-decorator';

import FullscreenLoader from '../shared-components/FullscreenLoader';

@connect({
  mapQueriesToProps: ({ ownProps, state }) => { // eslint-disable-line
    return {
      data: {
        query: gql`
            query {
              users {
                name
              }
            }
          `,
        forceFetch: false,
        returnPartialData: true,
      },
    };
  },
})
@autobind
export default class UsersPage extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  componentDidMount() {
  }

  render() {
    const { data } = this.props;

    return (
    data.isLoading ?
      <FullscreenLoader /> :
      <Box
        style={{
          flex: '1 0 auto',
        }}
      >
        <Container>
          <Text>{JSON.stringify(data.users)}</Text>
        </Container> />
      </Box>
    );
  }
}

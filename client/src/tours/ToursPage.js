import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import { Box, Flex } from 'reflexbox';
import {
  PageHeader,
  Container,
  Card,
  Text,
} from 'rebass';
import autobind from 'autobind-decorator';

import FullscreenLoader from '../shared-components/FullscreenLoader';

@connect({
  mapQueriesToProps: ({ ownProps, state }) => { // eslint-disable-line
    return {
      data: {
        query: gql`
            query {
              tours {
                name
                location
                description
              }
            }
          `,
        forceFetch: false,
      },
    };
  },
})
@autobind
export default class ToursPage extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  componentDidMount() {
  }

  render() {
    const { data } = this.props;

    return (
    data.loading ?
      <FullscreenLoader /> :
      <Box
        style={{
          flex: '1 0 auto',
        }}
      >
        <Container pt={4} pb={3}>
          <PageHeader my={2} py={2} description="All the tours" heading="Tours" />
          <Flex align="center" justify="center" wrap gutter={2}>
          {
            data.tours.map((t, index) =>
              <Card key={index} m={2} style={{ width: '309px', height: '610px' }} >
                <Text bold>{t.name} ({t.location})</Text>
                <Text small children={t.description} />
              </Card>
            )
          }
          </Flex>
        </Container>
      </Box>
    );
  }
}

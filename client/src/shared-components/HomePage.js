import React from 'react';
import { Flex } from 'reflexbox';
import { Heading, Banner, Container, Section, SectionHeader,
} from 'rebass';

const HomePage = () => (
  <Flex
    column
    style={{
      flex: '1 0 auto',
    }}
  >
    <Container
      pb={3}
    >
      <Section
        pb={0}
      >
        <SectionHeader heading="Please Login" href="#about" />
      </Section>
    </Container>
  </Flex>
);

export default HomePage;

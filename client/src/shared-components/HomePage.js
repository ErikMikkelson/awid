import React from 'react';
import { Flex } from 'reflexbox';
import { Heading, Banner, Container, Section, SectionHeader, Blockquote,
} from 'rebass';

const HomePage = () => (
  <Flex
    column
    style={{
      flex: '1 0 auto',
    }}
  >
    <Banner
      style={{
        minHeight: '75vh',
        backgroundAttachment: 'scroll',
      }}
      backgroundImage="https://img.jch254.com/Banner.jpg"
      m={0}
    >
      <Heading
        size={1}
        big
        children="Starter Pack"
      />
      <Heading
        size={2}
        children="React + Redux + Auth0"
      />
      <a
        href="https://github.com/jch254/starter-pack"
        target="_BLANK"
        style={{
          paddingTop: '16px',
        }}
      />
    </Banner>
    <Container
      pb={3}
    >
      <Section
        pb={0}
      >
        <SectionHeader heading="About" href="#about" />
      </Section>
      <Section pb={0}>
        <SectionHeader heading="Technologies Used" href="#tech" />
      </Section>
      <Section pb={0}>
        <Blockquote mt={3} source="Erik Mikkelson">
          Never rattled. Never frantic. Always hustling and acting with creativity. Never anything
          but deliberate. Never attempting to do the impossible - but everything up to that line.
        </Blockquote>
      </Section>
    </Container>
  </Flex>
);

export default HomePage;

import React from 'react';
import {
  Toolbar,
  Space,
  NavItem,
} from 'rebass';
import { Box } from 'reflexbox';

const AppFooter = () => (
  <Box style={{ flex: 'none' }}>
    <Toolbar backgroundColor="white">
      <Space auto />
      <NavItem color="black" children="© Erik Mikkelson 2016" />
    </Toolbar>
  </Box>
);

export default AppFooter;

import React from 'react';

import { Container, Content } from './styles';

import {
  T1,
} from '~/components';

function Box({ title, children }) {
  return (
    <Container>
      <T1 style={{ fontWeight: '400' }}>{title}</T1>
      <Content>
        {children}
      </Content>
    </Container>
  );
}

export default Box;

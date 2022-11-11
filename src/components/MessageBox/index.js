import React from 'react';
import { Container } from './styles';

function MessageBox({ children, ...props }) {
  return (
    <Container {...props}>
      {children}
    </Container>
  );
}

export default MessageBox;

import React from 'react';
import { StyledP } from './styles';

function P({
  children,
  ...props
}) {
  return (
    <StyledP {...props}>
      {children}
    </StyledP>
  );
}

export default P;

import React from 'react';
import { StyledP } from './styles';

function Pre({
  children,
  ...props
}) {
  return (
    <StyledP {...props}>
      {children}
    </StyledP>
  );
}

export default Pre;

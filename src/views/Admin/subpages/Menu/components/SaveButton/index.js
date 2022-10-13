import React from 'react';

import { Container, Ico } from './styles';

function SaveButton(props) {
  return (
    <Container type="submit" {...props}>
      <Ico />
    </Container>
  );
}

export default SaveButton;

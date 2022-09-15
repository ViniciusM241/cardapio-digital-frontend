import React from 'react';

import { MdImage } from 'react-icons/md';
import { Container } from './styles';

function EmptyImage(props) {
  return (
    <Container {...props}>
      <MdImage style={{ color: '#FFF', fontSize: props.icoSize ? props.icoSize + 'rem' : '2rem' }} />
    </Container>
  );
}

export default EmptyImage;

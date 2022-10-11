import React from 'react';
import formatPrice from '~/utils/formatPrice';

import { Container } from './styles';

import {
  P,
  Inline,
  Col,
} from '~/components';

function ExtraBox({ item }) {
  return (
    <Container className='mt-10'>
      <div>
        <P>{item.name}</P>
        <P className="mt-10">+ {formatPrice(item.value)}</P>
      </div>
      <Col cols={1}>
        <Inline right>
          <P>{item.extraItemsOrdered.quantity}x</P>
        </Inline>
      </Col>
    </Container>
  );
}

export default ExtraBox;

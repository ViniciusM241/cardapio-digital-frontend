import React from 'react';

import { Container } from './styles';

function OrderItem({ order, ...props }) {
  return (
    <Container {...props}>
      #{String(order.id).padStart(3, '0')}
    </Container>
  );
}

export default OrderItem;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import { LoadingOutlined } from '@ant-design/icons';
import updateOrderStatus from '../../services/updateOrderStatus';

import { Container, IconWrapper } from './styles';

function OrderItemStatus({ order, updateOrders, ...props }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const _updateOrderStatus = async () => {
    if (isLoading) return;

    setIsLoading(true);

    await updateOrderStatus(order.id);

    setIsLoading(false);
    updateOrders();
  };

  return (
    <Container {...props} onClick={_updateOrderStatus}>
      {order.status.label}
      <IconWrapper>
        {
          !isLoading ?
            <MdArrowForwardIos style={{ fontSize: '1.5rem' }} />
          :
            <LoadingOutlined style={{ fontSize: '1.5rem' }} />
        }
      </IconWrapper>
    </Container>
  );
}

export default OrderItemStatus;

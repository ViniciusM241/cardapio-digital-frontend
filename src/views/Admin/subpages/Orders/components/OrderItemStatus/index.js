import React, { useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { LoadingOutlined } from '@ant-design/icons';
import updateOrderStatus from '../../services/updateOrderStatus';
import { toast } from 'react-toastify';

import { Container, IconWrapper } from './styles';

function OrderItemStatus({ order, updateOrders, ...props }) {
  const [isLoading, setIsLoading] = useState(false);

  const _updateOrderStatus = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const messageSent = await updateOrderStatus(order.id);

    setIsLoading(false);
    updateOrders();

    if (!messageSent) {
      toast.warn('Mensagem não enviada ao Usuário. Verifique o status');
    }
  };

  return (
    <>
      <Container {...props} color={order.status.color} fontColor={order.status.fontColor} onClick={_updateOrderStatus}>
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
    </>
  );
}

export default OrderItemStatus;

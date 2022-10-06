import React, { useState, useEffect } from 'react';
import getOrders from './services/getOrders';

import { Item } from './styles';

import {
  Col,
  Container,
  Inline,
  P,
} from '~/components';
import OrderItem from './components/OrderItem';

function Orders() {
  const [orderStatus, setOrderStatus] = useState('OPENED');
  const [orders, setOrders] = useState([]);

  const _getOrders = async () => {
    const filters = `status=${orderStatus}`;
    const data = await getOrders(filters);

    setOrders(data);
  };

  useEffect(() => {
    _getOrders();

    const interval = setInterval(() => {
      _getOrders();
    }, 10000);

    return () => clearInterval(interval);
  }, [orderStatus]);

  return (
    <Container>
      <Col cols={4}>
        <Item
          active={orderStatus === 'OPENED'}
          onClick={() => setOrderStatus('OPENED')}
        >
          Pedidos
        </Item>
      </Col>
      <Col cols={8}>
        <Item
          active={orderStatus === 'FINISHED'}
          onClick={() => setOrderStatus('FINISHED')}
        >
          Pedidos Finalizados
        </Item>
      </Col>
      <Inline className="mt-20">
        {
          orders.length ?
            orders.map(order => (
              <Col key={order.id} cols={4} xs={12} className="mb-20">
                <OrderItem order={order} updateOrders={_getOrders} />
              </Col>
            ))
          : <P>Nenhum pedido encontrado</P>
        }
      </Inline>
    </Container>
  );
}

export default Orders;

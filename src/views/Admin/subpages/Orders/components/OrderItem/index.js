import React from 'react';
import { useNavigate } from 'react-router-dom';
import formatPrice from '~/utils/formatPrice';
import getDateDiff from '~/utils/getDateDiff';

import { MdPerson, MdDeliveryDining, MdCreditCard } from 'react-icons/md';
import { Container, Content } from './styles';

import {
  Col,
  Inline,
  P,
  T1,
} from '~/components';
import OrderItemStatus from '../OrderItemStatus';

function OrderItem({ order, updateOrders, ...props }) {
  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/administrativo/pedidos/${order.id}`);
  };

  return (
    <Container {...props}>
      <div>
        <Inline>
          <Col cols={5}>
            <T1>
              #{String(order.id).padStart(3, '0')}
            </T1>
          </Col>
          {
            order.status.value != 'FINISHED' && (
              <Col cols={7}>
                <Inline right>
                  <OrderItemStatus updateOrders={updateOrders} order={order} />
                </Inline>
              </Col>
            )
          }
        </Inline>
        <Content className="mt-20" onClick={redirect}>
          <P style={{ display: 'flex', alignItems: 'center' }}><MdPerson style={{ fontSize: '1.5rem' }} className='mr-10' />{order.customer.name}</P>
          <P style={{ display: 'flex', alignItems: 'center' }}><MdDeliveryDining style={{ fontSize: '1.5rem' }} className='mr-10' />{order.deliveryMethodLabel}</P>
          <P style={{ display: 'flex', alignItems: 'center' }}><MdCreditCard style={{ fontSize: '1.5rem' }} className='mr-10' />{order.paymentMethodLabel}</P>
        </Content>
      </div>
      <Inline onClick={redirect}>
        <Col cols={6}>
          <P>
            {getDateDiff(order.createdAt)}
          </P>
        </Col>
        <Col cols={6}>
          <Inline right>
            <T1>
            {formatPrice(order.total)}
            </T1>
          </Inline>
        </Col>
      </Inline>
    </Container>
  );
}

export default OrderItem;

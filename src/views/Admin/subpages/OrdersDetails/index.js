import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import getOrderById from './services/getOrderById';
import { phone, zipcode } from '~/utils/masks';

import { StyledMdKeyboardArrowLeft } from './styles';

import {
  Container,
  Inline,
  Col,
  T1,
  Form,
  Radio,
  Input,
  Line,
} from '~/components';
import OrderItemStatus from '../Orders/components/OrderItemStatus';

function OrdersDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrder] = useState(null);

  const _getOrderById = async (id) => {
    const data = await getOrderById(id);

    setOrder(data);
  };

  useEffect(() => {
    const id = location.pathname.replace(/^(\D)+/g, '');

    _getOrderById(id);
  }, [location]);

  if (order) {
    return (
      <Container>
        <Inline>
          <Col cols={1} xs={3}>
            <StyledMdKeyboardArrowLeft onClick={() => navigate('/administrativo/pedidos')} />
          </Col>
          <Col cols={11} xs={9}>
            <T1>Detalhes do pedido</T1>
          </Col>
        </Inline>
        <Inline className="mt-20">
            <Col cols={5}>
              <T1>
                #{String(order.id).padStart(3, '0')}
              </T1>
            </Col>
            {
              order.status.value != 'FINISHED' && (
                <Col cols={7}>
                  <Inline right>
                    <OrderItemStatus updateOrders={() => {}} order={order} />
                  </Inline>
                </Col>
              )
            }
          </Inline>
          <Form
          initialValues={{
            fullName: order.customer.name,
            phone: order.customer.phone ? phone(order.customer.phone.substring(2)) : '',
            customerId: order.customerId,
            zipcode: order.zipcode,
            number: order.number,
            address: order.address,
            district: order.district,
            deliveryMethod: order.deliveryMethod,
            paymentMethod: order.paymentMethod,
            change: order.change,
          }}
        >
          {
            ({ values }) => (
              <>
                <Inline className="mt-20">
                  <T1 style={{ fontWeight: '400' }}>Dados pessoais</T1>
                  <Line className="mt-10" />
                  <Input
                    className="mt-10"
                    type="text"
                    placeholder="Digite aqui..."
                    label="Nome completo"
                    name="fullName"
                    disabled
                  />
                  <Input
                    className="mt-10"
                    type="text"
                    placeholder="Digite aqui..."
                    label="Número WhatsApp"
                    name="phone"
                    disabled
                  />
                </Inline>
                <Inline className="mt-20">
                  <T1 style={{ fontWeight: '400' }}>Forma de entrega</T1>
                  <Line className="mt-10" />
                  <Col cols={6}>
                    <Radio
                      type="radio"
                      value="TAKEOUT"
                      name="deliveryMethod"
                      label="Retirada"
                      disabled
                    />
                  </Col>
                  <Col cols={6}>
                    <Radio
                      type="radio"
                      value="DELIVERY"
                      name="deliveryMethod"
                      label={<p>Entrega<br /> + R$ 5,00</p>}
                      disabled
                    />
                  </Col>
                </Inline>
                {
                  values.deliveryMethod === 'DELIVERY' ? (
                    <Inline className="mt-20">
                      <T1 style={{ fontWeight: '400' }}>Endereço</T1>
                      <Line className="mt-10" />
                      <Col cols={6}>
                        <Input
                          className="mt-10 mr-10"
                          type="text"
                          placeholder="Digite aqui..."
                          label="CEP"
                          name="zipcode"
                          maxLength={9}
                          disabled
                        />
                      </Col>
                      <Col cols={6}>
                        <Input
                          className="mt-10"
                          type="text"
                          placeholder="Digite aqui..."
                          label="Número"
                          name="number"
                          disabled
                        />
                      </Col>
                      <Input
                        className="mt-10"
                        type="text"
                        placeholder="Digite aqui..."
                        label="Endereço"
                        name="address"
                        disabled
                      />
                      <Input
                        className="mt-10"
                        type="text"
                        placeholder="Digite aqui..."
                        label="Bairro"
                        name="district"
                        disabled
                      />
                    </Inline>
                  ) : ''
                }
                <Inline className="mt-20">
                  <T1 style={{ fontWeight: '400' }}>Forma de pagamento</T1>
                  <Line className="mt-10" />
                  <Col cols={3} xs={12}>
                    <Radio
                      type="radio"
                      value="CREDIT"
                      name="paymentMethod"
                      label="Cartão de Crédito"
                      disabled
                    />
                  </Col>
                  <Col cols={3} xs={12}>
                    <Radio
                      type="radio"
                      value="DEBIT"
                      name="paymentMethod"
                      label="Cartão de Débito"
                      disabled
                    />
                  </Col>
                  <Col cols={3} xs={12}>
                    <Radio
                      type="radio"
                      value="PIX"
                      name="paymentMethod"
                      label="PIX"
                      disabled
                    />
                  </Col>
                  <Col cols={3} xs={12}>
                    <Radio
                      type="radio"
                      value="CASH"
                      name="paymentMethod"
                      label="Dinheiro"
                      disabled
                    />
                  </Col>
                  {
                    values.paymentMethod === 'CASH' ? (
                      <Col cols={6} xs={12}>
                        <Input
                          className="mt-10"
                          type="text"
                          placeholder="Digite aqui..."
                          label="Troco?"
                          name="change"
                          disabled
                        />
                      </Col>
                    ) : ''
                  }
                </Inline>
              </>
            )
          }
        </Form>
      </Container>
    );
  }
}

export default OrdersDetails;

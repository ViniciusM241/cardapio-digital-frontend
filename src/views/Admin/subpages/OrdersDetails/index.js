import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import getOrderById from './services/getOrderById';
import { phone, currency } from '~/utils/masks';
import formatPrice from '~/utils/formatPrice';
import getParams from './services/getParams';

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
  CheckBox,
} from '~/components';
import OrderItemStatus from '../Orders/components/OrderItemStatus';
import ItemBox from '../../components/ItemBox';

function OrdersDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrder] = useState(null);
  const [params, setParams] = useState({});

  const _getParams = async () => {
    const params = await getParams();

    setParams(params);
  };

  const _getOrderById = async (id) => {
    const data = await getOrderById(id);

    setOrder(data);
  };

  useEffect(() => {
    _getParams();
  }, []);

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
            <Col cols={9} xs={5}>
              <T1>
                #{String(order.id).padStart(3, '0')}
              </T1>
            </Col>
            {
              order.status.value != 'FINISHED' && (
                <Col cols={3} xs={7}>
                  <Inline right>
                    <OrderItemStatus updateOrders={() => navigate(`/administrativo/pedidos/${order.id}`)} order={order} />
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
            number: order.number,
            address: order.address,
            district: order.district,
            deliveryMethod: order.deliveryMethod,
            paymentMethod: order.paymentMethod,
            change: order.change ? currency(order.change) : '',
            noChange: order.change ? [] : [1],
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
                    label="N??mero WhatsApp"
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
                      label={params.deliveryFee ? (<p>Entrega<br />+{formatPrice(params.deliveryFee)}</p>) : "Entrega"}
                      disabled
                    />
                  </Col>
                </Inline>
                {
                  values.deliveryMethod === 'DELIVERY' ? (
                    <Inline className="mt-20">
                      <T1 style={{ fontWeight: '400' }}>Endere??o</T1>
                      <Line className="mt-10" />
                      <Col cols={6}>
                        <Input
                          className="mt-10"
                          type="text"
                          placeholder="Digite aqui..."
                          label="N??mero"
                          name="number"
                          disabled
                        />
                      </Col>
                      <Input
                        className="mt-10"
                        type="text"
                        placeholder="Digite aqui..."
                        label="Endere??o"
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
                      label="Cart??o de Cr??dito"
                      disabled
                    />
                  </Col>
                  <Col cols={3} xs={12}>
                    <Radio
                      type="radio"
                      value="DEBIT"
                      name="paymentMethod"
                      label="Cart??o de D??bito"
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
                      <>
                        <Col cols={6} xs={12}>
                          <Input
                            className="mt-10"
                            type="text"
                            placeholder="Digite aqui..."
                            label="Troco para:"
                            name="change"
                            disabled
                          />
                        </Col>
                        <Col cols={6} xs={12}>
                          <CheckBox
                            type="checkbox"
                            name="noChange"
                            label="N??o preciso de troco"
                            value={1}
                            disabled
                          />
                        </Col>
                      </>
                    ) : ''
                  }
                </Inline>
              </>
            )
          }
        </Form>
        <Inline className="mt-20 mb-40">
          <T1 style={{ fontWeight: '400' }}>Itens</T1>
          <Line className="mt-10" />
          {
            order.itemsOrdered.map(itemOrdered => (
              <React.Fragment key={itemOrdered.id}>
                <ItemBox item={itemOrdered} />
                <Line className="mt-10" />
              </React.Fragment>
            ))
          }
        </Inline>
      </Container>
    );
  }
}

export default OrdersDetails;

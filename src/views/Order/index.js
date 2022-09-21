import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderSchema from '~/utils/validations/orderSchema';
import formatPrice from '~/utils/formatPrice';
import { zipcode, phone, currency } from '~/utils/masks';
import getAddress from './services/getAddress';
import createOrder from './services/createOrder';

import { StyledMdKeyboardArrowLeft, Total, Wrapper, StyledError } from './styles';

import {
  Container,
  Inline,
  Col,
  T1,
  Form,
  Input,
  Button,
  T2,
  Line,
  Radio,
} from '~/components';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

function MenuPage() {
  const navigate = useNavigate();

  const customer = useSelector(state => state.menu.customer);
  const cart = useSelector(state => state.menu.cart);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!cart.itemsOrdered.length) {
      navigate('/');
    }
  }, [cart]);

  const handleSubmit = async ({ values }) => {
    if (parseFloat(cart.total) < 10 ) {
      return toast.error('Valor mínimo não atingido');
    }

    values.phone = `55${values.phone.replace(/\D/g, '')}`;

    setIsLoading(true);

    const res = await createOrder(values);

    setIsLoading(false);

    if (res.id) {
      toast.success('Dados salvos com sucesso');

      const url = generateWhatsMessage(values, res);
      window.open(url, '_blank');

      navigate('/');
    } else {
      console.log('error');
    }
  };

  const generateWhatsMessage = (values, response) => {
    const API_URL = `https://api.whatsapp.com/send?phone=${process.env.REACT_APP_PHONENUMBER}`;

    const mensagem = `
*🛎️#${response.id.padstart(3, '0')} NOVO PEDIDO*
${moment().format('DD/MM HH:mm')}

*📄Pedido:*
${cart.itemsOrdered.map(item => `
  ${item.quantity}x ${item.item.name} *${formatPrice(item.total)}*
  ${item.extras.length ? item.extras.map(extra => `${extra.extraItemsOrdered.quantity}x ${extra.name} *${formatPrice(extra.value)}*`) : '' }

`)}

*👤Cliente:*
${values.fullName}

*${values.deliveryMethod === 'DELIVERY' ? 'Subtotal' : 'Total'}:* ${formatPrice(cart.total)}
${values.deliveryMethod === 'DELIVERY' ? `*Total com entrega:* ${formatPrice(parseFloat((cart.total) + response.deliveryFee || 5).toFixed(2).replace('.', ','))}` : ''}

*💰Pagamento:*
${response.params.paymentMetohs[values.paymentMethod]}${values.paymentMethod === 'CASH' ? `, troco para ${formatPrice(values.change)}` : ''}
    `;

    return `${API_URL}&text=${encodeURIComponent(mensagem)}`;
  }

  const handleZipcodeChange = async (value, setValue) => {
    if (value.length < 8) return;

    const address = await getAddress(value.replace('-', ''));

    setValue({ target: { value: address.address }}, 'address');
    setValue({ target: { value: address.district }}, 'district');
  }

  return (
    <>
      <Container>
        <Inline className="mt-40">
          <Col cols={3}>
            <StyledMdKeyboardArrowLeft onClick={() => navigate('/')} />
          </Col>
          <Col cols={9}>
            <T1>Pedido</T1>
          </Col>
        </Inline>
        <Form
          initialValues={{
            fullName: customer.name,
            phone: customer.phone ? phone(customer.phone.substring(2)) : '',
            customerId: customer.id,
            zipcode: '',
            number: '',
            address: '',
            district: '',
            deliveryMethod: '',
            paymentMethod: '',
            change: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={orderSchema}
        >
          {
            ({ values, setValue, errors }) => (
              <Wrapper>
                <div>
                  <Inline className="mt-20">
                    <T2>Dados pessoais</T2>
                    <Line className="mt-10" />
                    <Input
                      className="mt-10"
                      type="text"
                      placeholder="Digite aqui..."
                      label="Nome completo"
                      name="fullName"
                    />
                    <Input
                      className="mt-10"
                      type="text"
                      placeholder="Digite aqui..."
                      label="Número WhatsApp"
                      name="phone"
                      onChange={(e) => {
                        const newPhone = phone(e);

                        return newPhone;
                      }}
                    />
                  </Inline>
                  <Inline className="mt-20">
                    <T2>Forma de entrega</T2>
                    <Line className="mt-10" />
                    <Col cols={6}>
                      <Radio
                        type="radio"
                        value="TAKEOUT"
                        name="deliveryMethod"
                        label="Retirada"
                      />
                    </Col>
                    <Col cols={6}>
                      <Radio
                        type="radio"
                        value="DELIVERY"
                        name="deliveryMethod"
                        label={<p>Entrega<br /> + R$ 5,00</p>}
                      />
                    </Col>
                    {
                      errors.deliveryMethod ? (
                        <Col cols={12}>
                          <StyledError className="mt-10">{errors.deliveryMethod}</StyledError>
                        </Col>
                      ) : ''
                    }
                  </Inline>
                  {
                    values.deliveryMethod === 'DELIVERY' ? (
                      <Inline className="mt-20">
                        <T2>Endereço</T2>
                        <Line className="mt-10" />
                        <Col cols={6}>
                          <Input
                            className="mt-10 mr-10"
                            type="text"
                            placeholder="Digite aqui..."
                            label="CEP"
                            name="zipcode"
                            maxLength={9}
                            onChange={(e) => {
                              const newZipcode = zipcode(e);

                              return newZipcode;
                            }}
                            onBlur={(e) => handleZipcodeChange(e.target.value, setValue)}
                          />
                        </Col>
                        <Col cols={6}>
                          <Input
                            className="mt-10"
                            type="text"
                            placeholder="Digite aqui..."
                            label="Número"
                            name="number"
                          />
                        </Col>
                        <Input
                          className="mt-10"
                          type="text"
                          placeholder="Digite aqui..."
                          label="Endereço"
                          name="address"
                        />
                        <Input
                          className="mt-10"
                          type="text"
                          placeholder="Digite aqui..."
                          label="Bairro"
                          name="district"
                        />
                      </Inline>
                    ) : ''
                  }
                  <Inline className="mt-20">
                    <T2>Forma de pagamento</T2>
                    <Line className="mt-10" />
                    <Col cols={12}>
                      <Radio
                        type="radio"
                        value="CREDIT"
                        name="paymentMethod"
                        label="Cartão de Crédito"
                      />
                    </Col>
                    <Col cols={12}>
                      <Radio
                        type="radio"
                        value="DEBIT"
                        name="paymentMethod"
                        label="Cartão de Débito"
                      />
                    </Col>
                    <Col cols={12}>
                      <Radio
                        type="radio"
                        value="PIX"
                        name="paymentMethod"
                        label="PIX"
                      />
                    </Col>
                    <Col cols={12}>
                      <Radio
                        type="radio"
                        value="CASH"
                        name="paymentMethod"
                        label="Dinheiro"
                      />
                    </Col>
                    {
                      values.paymentMethod === 'CASH' ? (
                        <Input
                          className="mt-10"
                          type="text"
                          placeholder="Digite aqui..."
                          label="Troco?"
                          name="change"
                          onChange={(e) => {
                            return currency(e);
                          }}
                        />
                      ) : ''
                    }
                    {
                      errors.paymentMethod ? (
                        <Col cols={12}>
                          <StyledError className="mt-10">{errors.paymentMethod}</StyledError>
                        </Col>
                      ) : ''
                    }
                  </Inline>
                </div>
                <Inline style={{ justifyContent: 'space-between' }}>
                  <Total>
                    Total de<br />
                    <strong>{formatPrice(cart.total)}</strong>
                  </Total>
                  <Button type="submit" isLoading={isLoading}>
                    Finalizar
                  </Button>
                </Inline>
              </Wrapper>
            )
          }
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
}

export default MenuPage;

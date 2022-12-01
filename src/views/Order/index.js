import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useBreakpoints from '~/hooks/useBreakpoints';
import orderSchema from '~/utils/validations/orderSchema';
import formatPrice from '~/utils/formatPrice';
import { phone, currency } from '~/utils/masks';
import createOrder from './services/createOrder';
import getParams from './services/getParams';
import { MdInfoOutline } from 'react-icons/md';

import { StyledMdKeyboardArrowLeft, Total, Wrapper, StyledError, StyledPix } from './styles';

import {
  Container,
  Inline,
  Col,
  T1,
  Form,
  Input,
  Button,
  Line,
  Radio,
  CheckBox,
  MessageBox,
} from '~/components';
import { toast } from 'react-toastify';
import moment from 'moment';

function MenuPage() {
  const navigate = useNavigate();
  const breakpoints = useBreakpoints();

  const customer = useSelector(state => state.menu.customer);
  const cart = useSelector(state => state.menu.cart);

  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({});

  const _getParams = async () => {
    const params = await getParams();

    setParams(params);
  };

  useEffect(() => {
    _getParams();
  }, []);

  useEffect(() => {
    if (!cart.itemsOrdered.length) {
      navigate('/');
    }
  }, [cart]);

  const handleSubmit = async ({ values }) => {
    if (parseFloat(cart.total) < 10) {
      return toast.error('Valor mínimo de R$ 10,00 não atingido');
    }

    values.phone = `55${values.phone.replace(/\D/g, '')}`;

    if (values.noChange.includes(1)) {
      values.change = '';
    }

    setIsLoading(true);

    const res = await createOrder(values);

    setIsLoading(false);

    if (res.id) {
      toast.success('Dados salvos com sucesso');

      const url = generateWhatsMessage(values, res);

      if (params.businessNumber) {
        redirect(url);
      }

      navigate('/');
    } else {
      toast.error('Problemas no momento, tente novamente mais tarde');
    }
  };

  const redirect = (url) => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.click();
    document.body.removeChild(a);
  };

  const generateWhatsMessage = (values, response) => {
    const API_URL = `https://api.whatsapp.com/send?phone=${params.businessNumber}`;

    const mensagem = `
*🛎️#${String(response.id).padStart(3, '0')} NOVO PEDIDO*
${moment().format('DD/MM HH:mm')}

*📄Pedido:*
${cart.itemsOrdered.map(item => `${item.quantity}x ${item.item.name} ${!item.special ? `*${formatPrice(item.total)}*` : ''}${item.extras.length ? item.special ? '\n*Ingredientes*:\n' : '\n*Adicionais*:\n' : ''}${item.extras.length ? item.extras.map(extra => `${extra.extraItemsOrdered.quantity}x ${extra.name} *${formatPrice(extra.value)}*`).join('\n') : '' }
`).join('\n')}
*👤Cliente:*
${values.fullName}

${params.deliveryFee ? `*Subtotal:* ${formatPrice(cart.total)}\n*Total:* ${formatPrice((parseFloat(cart.total) + parseFloat(params.deliveryFee)).toFixed(2, '0'))}` : `*Total:* ${formatPrice(cart.total)}`}

*💰Pagamento:*
${response.params.paymentMethods[values.paymentMethod].label}${values.paymentMethod === 'CASH' ? `, troco para R$ ${values.change}` : ''}
    `;

    return `${API_URL}&text=${encodeURIComponent(mensagem)}`;
  }

  function formatMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let str = '';

    if (hours > 0) {
      str += `${padToTwoDigits(hours)}h`;
    }

    if (minutes > 0) {
      str += `${padToTwoDigits(minutes)}m`;
    }

    return str;
  }

  function padToTwoDigits(num) {
    return num.toString().padStart(2, '0');
  }

  const initialValues = useMemo(() => ({
    fullName: customer.name,
    phone: customer.phone ? phone(customer.phone.substring(2)) : '',
    customerId: customer.id,
    number: '',
    address: '',
    district: '',
    deliveryMethod: '',
    paymentMethod: '',
    change: '',
    noChange: [],
  }), [customer]);

  return (
    <Container>
      <Inline className="mt-40">
        <Col cols={1} xs={3}>
          <StyledMdKeyboardArrowLeft onClick={() => navigate('/')} />
        </Col>
        <Col cols={11} xs={9}>
          <T1>Pedido</T1>
        </Col>
      </Inline>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={orderSchema}
      >
        {
          ({ values, errors }) => (
            <Wrapper>
              <div>
                <Inline className="mt-20">
                  <T1 style={{ fontWeight: '400' }}>Dados pessoais</T1>
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
                  <T1 style={{ fontWeight: '400' }}>Forma de entrega</T1>
                  <Line className="mt-10" />
                  <Col cols={12} style={{ flexDirection: 'column' }}>
                    {
                      params.takeoutTime ? (
                        <MessageBox className="mt-10" theme='info'>
                          <MdInfoOutline style={{ marginRight: '5px', fontSize: '1.1rem' }} />
                          O tempo de espera para <strong>retirada</strong> é de <strong>{formatMinutes(params.takeoutTime)}</strong>
                        </MessageBox>
                      ) : ''
                    }
                    {
                      params.deliveryTime ? (
                        <MessageBox className="mt-10" theme='info'>
                          <MdInfoOutline style={{ marginRight: '5px', fontSize: '1.1rem' }} />
                          O tempo de espera para <strong>entrega</strong> é de <strong>{formatMinutes(params.deliveryTime)}</strong>
                        </MessageBox>
                      ) : ''
                    }
                  </Col>
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
                      label={params.deliveryFee ? (<p>Entrega<br />+{formatPrice(params.deliveryFee)}</p>) : "Entrega"}
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
                      <T1 style={{ fontWeight: '400' }}>Endereço</T1>
                      <Line className="mt-10" />
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
                  <T1 style={{ fontWeight: '400' }}>Forma de pagamento</T1>
                  <Line className="mt-10" />
                  <Col cols={3} xs={12}>
                    <Radio
                      type="radio"
                      value="CREDIT"
                      name="paymentMethod"
                      label="Cartão de Crédito"
                    />
                  </Col>
                  <Col cols={3} xs={12}>
                    <Radio
                      type="radio"
                      value="DEBIT"
                      name="paymentMethod"
                      label="Cartão de Débito"
                    />
                  </Col>
                  <Col cols={3} xs={12}>
                    <Radio
                      type="radio"
                      value="PIX"
                      name="paymentMethod"
                      label="PIX"
                    />
                  </Col>
                  <Col cols={3} xs={12}>
                    <Radio
                      type="radio"
                      value="CASH"
                      name="paymentMethod"
                      label="Dinheiro"
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
                            onChange={(e) => {
                              return currency(e);
                            }}
                          />
                        </Col>
                        <Col cols={6} xs={12}>
                          <CheckBox
                            type="checkbox"
                            name="noChange"
                            label="Não preciso de troco"
                            value={1}
                          />
                        </Col>
                      </>
                    ) : ''
                  }
                  {
                    values.paymentMethod === 'PIX' ? (
                      <>
                        <MessageBox className="mt-20" theme='warning'>
                          <MdInfoOutline style={{ marginRight: '5px', fontSize: '1.1rem' }} />
                          O <strong>comprovante</strong> de pagamento deve ser encaminhado no <strong>WhatsApp</strong> para confirmação do pedido.
                        </MessageBox>
                        {
                          params.pix ? <StyledPix className='mt-20'><strong>Chave Pix: </strong><span>{params.pix}</span></StyledPix> : ''
                        }
                      </>
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
              <Inline style={{ justifyContent: breakpoints.xs ? 'space-between' : 'flex-end' }} className='mt-20 mb-20'>
                <Total className="mr-20">
                  Total {values.deliveryMethod === 'DELIVERY' ? 'com entrega' : ''} de<br />
                  <strong>{formatPrice(values.deliveryMethod === 'DELIVERY' ? (Number(cart.total) + 5).toFixed(2) : cart.total)}</strong>
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
  );
}

export default MenuPage;

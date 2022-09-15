import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderSchema from '~/utils/validations/orderSchema';
import formatPrice from '~/utils/formatPrice';
import { zipcode, phone } from '~/utils/masks';
import getAddress from './services/getAddress';

import { StyledMdKeyboardArrowLeft, Total, Wrapper } from './styles';

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
} from '~/components';

function MenuPage() {
  const navigate = useNavigate();

  const customer = useSelector(state => state.menu.customer);
  const cart = useSelector(state => state.menu.cart);

  useEffect(() => {
    if (!cart.itemsOrdered.length) {
      navigate('/');
    }
  }, [cart]);

  const handleSubmit = ({ values }) => {
    console.log(values);
  };

  const handleZipcodeChange = async (value, setValue) => {
    if (value.length < 8) return;

    const address = await getAddress(value.replace('-', ''));
    console.log(address);
    setValue({ target: { value: address.address }}, 'address');
    setValue({ target: { value: address.district }}, 'district');
  }

  return (
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
          phone: customer.phone,
          zipcode: '',
          number: '',
          address: '',
          district: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={orderSchema}
      >
        {
          ({ values, setValue }) => (
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
                  </Col>
                  <Col cols={6}>
                  </Col>
                </Inline>
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
                <Inline className="mt-20">
                  <T2>Forma de pagamento</T2>
                  <Line className="mt-10" />
                </Inline>
              </div>
              <Inline style={{ justifyContent: 'space-between' }}>
                <Total>
                  Total de<br />
                  <strong>{formatPrice(cart.total)}</strong>
                </Total>
                <Button className="mt-20" type="submit">
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

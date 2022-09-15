import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItemById } from '../../store/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import addToCartService from './services/addToCartService';

import { StyledMdKeyboardArrowLeft, StyledImg, Wrapper, Total, ActionButton } from './styles';

import {
  Container,
  Inline,
  T1,
  Col,
  EmptyImage,
  P,
  T2,
  Line,
  Button,
  Input,
} from '~/components';
import ExtraItem from './components/ExtraItem';

import formatPrice from '~/utils/formatPrice';

function ItemDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItem = useSelector(state => state.menu.selectedItem);
  const customer = useSelector(state => state.menu.customer);

  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [total, setTotal] = useState(selectedItem.value);
  const [isLoading, setIsLoading] = useState(false);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    setIsLoading(true);

    const filteredExtras = selectedItem.extras.filter(x => !!x.quantity);
    const extras = filteredExtras.reduce((acc, cur) => {
      return [
        ...acc,
        {
          id: cur.id,
          quantity: cur.quantity,
        },
      ];
    }, []);

    const payload = {
      notes,
      quantity,
      extras,
      customerId: customer.id,
      itemId: selectedItem.id,
    };

    const isOK = await addToCartService(payload);
    setIsLoading(false);

    if (isOK) {
      navigate('/');
    }
  };

  useEffect(() => {
    const id = location.pathname.match(/(\d)+/)[0];

    if (id) {
      dispatch(getItemById(id));
    }
  }, [location, getItemById]);

  useEffect(() => {
    const total = parseFloat(selectedItem.value)
    const extraTotal = selectedItem.extras.reduce((acc, cur) => {
      const quantity = cur.quantity || 0;
      const value = parseFloat(cur.value) * quantity;

      return acc + value;
    }, 0);

    const final = ((total + extraTotal) * quantity).toFixed(2);

    setTotal(final);
  }, [selectedItem, quantity]);

  return (
    <Container>
      <Wrapper className="mt-40 mb-20">
        <div>
          <Inline>
            <Col cols={3}>
              <StyledMdKeyboardArrowLeft onClick={() => navigate('/')} />
            </Col>
            <Col cols={9}>
              <T1>Detalhes do item</T1>
            </Col>
          </Inline>
          <Col cols={12}>
            <Inline className="mt-40 mb-20" center>
              {
                !selectedItem.imageURL ?
                  <EmptyImage width={120} height={120} icoSize={4} />
                :
                  <StyledImg src={selectedItem.imageURL} />
              }
            </Inline>
          </Col>
          <Inline>
            <Col cols={12}>
              <T1 style={{ fontWeight: '400' }}>{selectedItem.name}</T1>
            </Col>
            <Col cols={12}>
              <P className='mt-10'>{selectedItem.description}</P>
            </Col>
            <Col cols={12}>
              <P style={{ fontWeight: '600' }} className='mt-10'>{formatPrice(selectedItem.value)}</P>
            </Col>
            {
              !!selectedItem.extras.length && (
                <>
                  <Col cols={12}>
                    <T2 style={{ fontWeight: '600' }} className='mt-20'>Adicionais</T2>
                  </Col>
                  <Col cols={12}>
                    <Line className='mt-10' />
                  </Col>
                  {
                    selectedItem.extras.map(extra => (
                      <React.Fragment key={extra.id}>
                        <ExtraItem item={extra} />
                        <Line className='mt-10' />
                      </React.Fragment>
                    ))
                  }
                </>
              )
            }
          </Inline>
          <Inline className="mt-20">
            <T2>Observações</T2>
            <Input
              className="mt-10"
              type="text"
              placeholder="Digite aqui..."
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Inline>
        </div>
        <Inline style={{ justifyContent: 'space-between' }}>
          <Total>
            <ActionButton onClick={decreaseQuantity}>-</ActionButton>
              {quantity}
            <ActionButton onClick={increaseQuantity}>+</ActionButton>
          </Total>
          <Button
            style={{ fontWeight: '400' }}
            onClick={addToCart}
            isLoading={isLoading}
          >
            Adicionar <strong>{formatPrice(total)}</strong>
          </Button>
        </Inline>
      </Wrapper>
    </Container>
  );
}

export default ItemDetails;

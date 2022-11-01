import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItemById } from '../../store/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import useBreakpoints from '~/hooks/useBreakpoints';
import addToCartService from './services/addToCartService';

import { StyledMdKeyboardArrowLeft, StyledImg, Wrapper, Total, ActionButton } from './styles';

import {
  Container,
  Inline,
  T1,
  Col,
  EmptyImage,
  P,
  Line,
  Button,
  Input,
  Pre,
} from '~/components';
import ExtraItem from './components/ExtraItem';

import formatPrice from '~/utils/formatPrice';

function ItemDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const breakpoints = useBreakpoints();
  const selectedItem = useSelector(state => state.menu.selectedItem);
  const customer = useSelector(state => state.menu.customer);

  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [total, setTotal] = useState(selectedItem.value);
  const [isLoading, setIsLoading] = useState(false);

  const increaseQuantity = () => {
    if (quantity + 1 > 15) return;

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
            <Col cols={1} xs={3}>
              <StyledMdKeyboardArrowLeft onClick={() => navigate('/')} />
            </Col>
            <Col cols={11} xs={9}>
              <T1>Detalhes do item</T1>
            </Col>
          </Inline>
          <Inline>
            <Col cols={2} xs={12}>
              <Inline className="mt-40 mb-20" center={breakpoints.xs}>
                {
                  !selectedItem.imageURL ?
                    <EmptyImage width={180} height={180} icoSize={4} />
                  :
                    <StyledImg src={selectedItem.imageURL} />
                }
              </Inline>
            </Col>
            <Col cols={9} xs={12} className="ml-20">
              <Inline>
                <Col cols={9} xs={12}>
                  <T1 style={{ fontWeight: '400' }}>{selectedItem.name}</T1>
                </Col>
                <Col cols={9} xs={12}>
                  <Pre className='mt-10'>{selectedItem.description}</Pre>
                </Col>
                <Col cols={9} xs={12}>
                  <P style={{ fontWeight: '600' }} className='mt-10'>{formatPrice(selectedItem.value)}</P>
                </Col>
              </Inline>
            </Col>
          </Inline>
          {
            !!selectedItem.extras.length && (
              <>
                <Col cols={12}>
                  <T1 style={{ fontWeight: '400' }} className='mt-20'>Adicionais</T1>
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
          <T1 style={{ fontWeight: '400' }} className="mt-20">Observações</T1>
          <Inline>
            <Col cols={6} xs={12}>
              <Input
                className='mt-10'
                type="text"
                placeholder="Digite aqui..."
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Col>
            {
              breakpoints.xs || (
                <Col cols={6} xs={12}>
                  <Inline style={{ justifyContent: breakpoints.xs ? 'space-between' : 'flex-end' }} className="mt-20">
                    <Total className="mr-20">
                      <ActionButton onClick={decreaseQuantity}>-</ActionButton>
                        {quantity}
                      <ActionButton onClick={increaseQuantity}>+</ActionButton>
                    </Total>
                    <Button
                      style={{ fontWeight: '400', height: '100%' }}
                      onClick={addToCart}
                      isLoading={isLoading}
                    >
                      Adicionar <strong style={{ whiteSpace: 'nowrap' }}>{formatPrice(total)}</strong>
                    </Button>
                  </Inline>
                </Col>
              )
            }
          </Inline>
        </div>
        {
          breakpoints.xs && (
            <Inline style={{ justifyContent: breakpoints.xs ? 'space-between' : 'flex-end' }} className="mt-20">
              <Total className="mr-20">
                <ActionButton onClick={decreaseQuantity}>-</ActionButton>
                  {quantity}
                <ActionButton onClick={increaseQuantity}>+</ActionButton>
              </Total>
              <Button
                style={{ fontWeight: '400', height: '100%' }}
                onClick={addToCart}
                isLoading={isLoading}
              >
                Adicionar <strong>{formatPrice(total)}</strong>
              </Button>
            </Inline>
          )
        }
      </Wrapper>
    </Container>
  );
}

export default ItemDetails;

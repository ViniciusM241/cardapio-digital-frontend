import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItemOrderedById } from '../../store/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import useBreakpoints from '~/hooks/useBreakpoints';
import updateCartService from './services/updateCartService';

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

function ItemOrderedReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const breakpoints = useBreakpoints();
  const selectedItem = useSelector(state => state.menu.selectedItemOrdered);
  const customer = useSelector(state => state.menu.customer);

  const [quantity, setQuantity] = useState(selectedItem.quantity);
  const [notes, setNotes] = useState(selectedItem.notes);
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

  const updateCart = async () => {
    setIsLoading(true);

    const filteredExtras = selectedItem.extras.filter(x => !!x.extraItemsOrdered.quantity);
    const extras = filteredExtras.reduce((acc, cur) => {
      return [
        ...acc,
        {
          id: cur.id,
          quantity: cur.extraItemsOrdered.quantity,
        },
      ];
    }, []);

    const payload = {
      notes,
      quantity,
      extras,
      customerId: customer.id,
      itemId: selectedItem.item.id,
    };

    const isOK = await updateCartService(selectedItem.id, payload);
    setIsLoading(false);

    if (isOK) {
      navigate('/');
    }
  };

  useEffect(() => {
    const id = location.pathname.match(/(\d)+/)[0];

    if (id) {
      dispatch(getItemOrderedById(id));
    }
  }, [location, getItemOrderedById]);

  useEffect(() => {
    setQuantity(selectedItem.quantity);
  }, [selectedItem.quantity]);

  useEffect(() => {
    setNotes(selectedItem.notes);
  }, [selectedItem.notes]);

  useEffect(() => {
    const total = parseFloat(selectedItem.item.value)
    const extraTotal = selectedItem.extras.reduce((acc, cur) => {
      const quantity = cur.extraItemsOrdered.quantity || 0;
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
              <T1>Detalhes do item pedido</T1>
            </Col>
          </Inline>
          <Inline>
            <Col cols={2} xs={12}>
              <Inline className="mt-40 mb-20" center>
                {
                  !selectedItem.item.imageURL ?
                    <EmptyImage width={120} height={120} icoSize={4} />
                  :
                    <StyledImg src={selectedItem.item.imageURL} />
                }
              </Inline>
            </Col>
            <Col cols={9} xs={12}>
              <Inline>
                <Col cols={9} xs={12}>
                  <T1 style={{ fontWeight: '400' }}>{selectedItem.item.name}</T1>
                </Col>
                <Col cols={9} xs={12}>
                  <P className='mt-10'>{selectedItem.item.description}</P>
                </Col>
                <Col cols={9} xs={12}>
                  <P style={{ fontWeight: '600' }} className='mt-10'>{formatPrice(selectedItem.item.value)}</P>
                </Col>
              </Inline>
            </Col>
          </Inline>
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
          <T1 style={{ fontWeight: '400' }} className="mt-20">Observações</T1>
          <Inline>
            <Col cols={6} xs={12}>
              <Input
                className="mt-10"
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
                      style={{ fontWeight: '400', height: '100%'}}
                      onClick={updateCart}
                      isLoading={isLoading}
                    >
                      Alterar item <strong style={{ whiteSpace: 'nowrap' }}>{formatPrice(total)}</strong>
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
              <Total>
                <ActionButton onClick={decreaseQuantity}>-</ActionButton>
                  {quantity}
                <ActionButton onClick={increaseQuantity}>+</ActionButton>
              </Total>
              <Button
                style={{ fontWeight: '400', height: '100%' }}
                onClick={updateCart}
                isLoading={isLoading}
              >
                Alterar item <strong style={{ whiteSpace: 'nowrap' }}>{formatPrice(total)}</strong>
              </Button>
            </Inline>
          )
        }
      </Wrapper>
    </Container>
  );
}

export default ItemOrderedReview;

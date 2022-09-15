import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import formatPrice from '~/utils/formatPrice';
import { getCart } from '../../store/actions';

import { Container as CartContainer,
  Value,
  CartWrapper,
  CartItems,
  CartItemWrapper,
  CartItemsWrapper,
  Total,
  Wrapper,
} from './styles';
import { MdShoppingCart, MdKeyboardArrowDown } from 'react-icons/md';

import {
  Container,
  Inline,
  T1,
  T2,
  Line,
  Button,
} from '~/components';
import CartItem from '../CartItem';
import colors from '~/utils/colors';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.menu.cart);
  const customer = useSelector(state => state.menu.customer);

  const [isCartOpened, setCartIsOpened] = useState(false);

  const toggleCartOpened = () => {
    setCartIsOpened(!isCartOpened);
  };

  useEffect(() => {
    if (customer.id) {
      dispatch(getCart(customer.id));
    }
  }, []);

  return (
    <>
      <CartContainer>
        <Value>
          Total de <strong>{formatPrice(cart.total)}</strong>
        </Value>
        <CartWrapper itemsLength={cart.itemsOrdered.length} onClick={toggleCartOpened}>
          <MdShoppingCart style={{ fontSize: '2.8rem' }} />
        </CartWrapper>
      </CartContainer>
      <CartItemWrapper className={isCartOpened ? 'opened' : 'closed'}>
        <CartItems className={isCartOpened ? 'opened' : 'closed'}>
          <Container>
            <Wrapper>
              <div>
                <Inline className="mt-20" style={{ justifyContent: 'space-between' }}>
                  <T1 style={{ color: colors.GREEN }}>Carrinho</T1>
                  <MdKeyboardArrowDown
                    onClick={toggleCartOpened}
                    style={{ color: colors.GREEN, fontSize: '2rem' }}
                  />
                </Inline>
                <CartItemsWrapper hasItems={!!cart.itemsOrdered.length} className='mt-20'>
                  {
                    cart.itemsOrdered.length ?
                      (
                        <>
                          <Inline>
                            <T2 className="mb-10">Itens</T2>
                            <Line />
                          </Inline>
                          {
                            cart.itemsOrdered.map(item => (
                              <React.Fragment key={item.id}>
                                <CartItem item={item} />
                                <Line className='mt-10' />
                              </React.Fragment>
                            ))
                          }
                        </>
                      )
                    : 'Nenhum item no carrinho'
                  }
                </CartItemsWrapper>
              </div>
              <Inline style={{ justifyContent: 'space-between' }}>
                <Total>
                  Total de<br />
                  <strong>{formatPrice(cart.total)}</strong>
                </Total>
                <Button onClick={() => navigate('/pedidos')}>
                  Continuar
                </Button>
              </Inline>
            </Wrapper>
          </Container>
        </CartItems>
      </CartItemWrapper>
    </>
  );
}

export default Cart;

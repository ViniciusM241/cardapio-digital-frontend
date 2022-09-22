import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '~/hooks/useOutsideClick';

import { MdShoppingCart } from 'react-icons/md';

import formatPrice from '~/utils/formatPrice';

import {
  CartContainer,
  Container,
  Value,
  CartWrapper,
  CartItemWrapper,
  CartItemsWrapper,
  Wrapper,
  Total
} from './styles';

import {
  Line,
  Inline,
  T2,
  P,
  Button,
} from '~/components';
import CartItem from '../CartItem';

function DesktopCart() {
  const navigate = useNavigate();
  const cart = useSelector(state => state.menu.cart);

  const [isOpened, setIsOpened] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setIsOpened(false));

  const toggleCartOpened = () => {
    setIsOpened(!isOpened);
  };

  return (
    <CartContainer ref={wrapperRef}>
      <Container onClick={toggleCartOpened}>
        <Value>
          Total de <strong>{formatPrice(cart.total)}</strong>
        </Value>
        <CartWrapper itemsLength={cart.itemsOrdered.length}>
          <MdShoppingCart style={{ fontSize: '2.5rem' }} />
        </CartWrapper>
      </Container>
      <CartItemWrapper className={isOpened ? 'opened' : 'closed'}>
        <Wrapper>
          <div>
            <Inline className="mt-10" style={{ justifyContent: 'space-between' }}>
              <P>Carrinho</P>
            </Inline>
            <CartItemsWrapper hasItems={!!cart.itemsOrdered.length} className='mt-10'>
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
          <Inline style={{ justifyContent: 'space-between' }} className="mt-10">
            <Total>
              Total de<br />
              <strong>{formatPrice(cart.total)}</strong>
            </Total>
            {
              !!cart.itemsOrdered.length && (
                <Button onClick={() => navigate('/pedidos')}>
                  Continuar
                </Button>
              )
            }
          </Inline>
        </Wrapper>
      </CartItemWrapper>
    </CartContainer>
  );
}

export default DesktopCart;

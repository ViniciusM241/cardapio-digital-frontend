import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { MdShoppingCart } from 'react-icons/md';

import formatPrice from '~/utils/formatPrice';

import { Container, Value, CartWrapper, CartItemWrapper } from './styles';

function DesktopCart() {
  const cart = useSelector(state => state.menu.cart);

  const [isOpened, setIsOpened] = useState(false);

  const toggleCartOpened = () => {
    setIsOpened(!isOpened);
  };

  return (
    <>
      <Container>
        <Value>
          Total de <strong>{formatPrice(cart.total)}</strong>
        </Value>
        <CartWrapper itemsLength={cart.itemsOrdered.length} onClick={toggleCartOpened}>
          <MdShoppingCart style={{ fontSize: '2.5rem' }} />
        </CartWrapper>
      </Container>
      <CartItemWrapper>

      </CartItemWrapper>
    </>
  );
}

export default DesktopCart;

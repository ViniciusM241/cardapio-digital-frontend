import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getMenu } from './store/actions';

import { StyledBackground } from './styles'

import Header from './components/Header';
import Content from './components/Content';
import Cart from './components/Cart';
import useBreakpoints from '~/hooks/useBreakpoints';

function MenuPage() {
  const dispatch = useDispatch();
  const breakpoints = useBreakpoints();
  const customer = useSelector(state => state.menu.customer);

  useEffect(() => {
    dispatch(getMenu());

    if (customer.id) {
      dispatch(getCart(customer.id));
    }
  }, [getMenu, customer]);

  return (
    <StyledBackground>
      <Header />
      <Content />
      {
        breakpoints.xs && (
          <Cart />
        )
      }
    </StyledBackground>
  );
}

export default MenuPage;

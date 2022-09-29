import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getMenu, getCustomer, createCustomer } from './store/actions';
import { getToken, setToken } from '~/boot/customerAuth';

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
    if (customer.id) {
      setToken(customer.id);
    }
  }, [customer]);

  useEffect(() => {
    const id = getToken();

    if (id) {
      dispatch(getCustomer(id));
      dispatch(getCart(id));
    } else {
      dispatch(createCustomer());
    }
  }, [getToken, getCustomer, createCustomer]);

  useEffect(() => {
    dispatch(getMenu());
  }, [getMenu]);

  useEffect(() => {
    dispatch(getCart(customer.id));
  }, [customer]);

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

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMenu } from './store/actions';

import { StyledBackground } from './styles'

import Header from './components/Header';
import Content from './components/Content';
import Cart from './components/Cart';

function MenuPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
  }, [getMenu]);

  return (
    <StyledBackground>
      <Header />
      <Content />
      <Cart />
    </StyledBackground>
  );
}

export default MenuPage;

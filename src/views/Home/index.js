import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMenu } from './store/actions';

import { StyledBackground } from './styles'

import Header from './components/Header';
import Content from './components/Content';
import Cart from './components/Cart';
import useBreakpoints from '~/hooks/useBreakpoints';

function MenuPage() {
  const dispatch = useDispatch();
  const breakpoints = useBreakpoints();

  useEffect(() => {
    dispatch(getMenu());
  }, [getMenu]);

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

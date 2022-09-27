import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Wrapper } from './styles';

import {
  T2,
} from '~/components';

function MenuItem({ menu, toggleMenuOpened }) {
  const navigate = useNavigate();

  const redirect = () => {
    navigate(menu.to);
    toggleMenuOpened();
  };

  return (
    <Wrapper onClick={redirect}>
      {menu.icon({ style: { fontSize: '1.5rem' }})}
      <T2 className='ml-10' style={{ fontSize: '1.5rem' }}>{menu.name}</T2>
    </Wrapper>
  );
}

export default MenuItem;

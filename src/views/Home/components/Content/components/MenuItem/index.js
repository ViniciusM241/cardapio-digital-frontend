import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Wrapper, StyledP, StyledImg } from './styles';

import {
  T3,
  Col,
  Inline,
  EmptyImage,
} from '~/components';

import formatPrice from '~/utils/formatPrice';

function MenuItem({ item }) {
  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/items/${item.id}`);
  }

  return (
    <Wrapper className='mt-10 mb-10' onClick={redirect}>
      <Inline>
        <Col cols={8} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <T3 style={{ fontWeight: '600' }}>{item.name}</T3>
          <StyledP className='mt-10'>{item.description}</StyledP>
          {
            item.special || <T3 className='mt-10'>{formatPrice(item.value)}</T3>
          }
        </Col>
        <Col cols={4}>
          <Inline right>
            {
              !item.imageURL ?
                <EmptyImage />
              :
                <StyledImg src={item.imageURL} />
            }
          </Inline>
        </Col>
      </Inline>
    </Wrapper>
  );
}

export default MenuItem;

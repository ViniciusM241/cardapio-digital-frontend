import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import formatPrice from '~/utils/formatPrice';

import { Wrapper, InfoWrapper, StyledImg } from './styles';

import {
  Col,
  Inline,
  P,
  EmptyImage,
} from '~/components';

function ItemBox({ item }) {
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = () => {
    navigate(`${location.pathname}/item-pedido/${item.id}`);
  };

  return (
    <Wrapper className='mt-10'>
      <Col cols={4} onClick={redirect}>
        <Inline left>
          {
            !item.item.imageURL ?
              <EmptyImage />
            :
              <StyledImg src={item.item.imageURL} />
          }
        </Inline>
      </Col>
      <Col cols={4} onClick={redirect}>
        <InfoWrapper>
          <P>{item.item.name}</P>
          <P>{formatPrice(item.total)}</P>
        </InfoWrapper>
      </Col>
      <Col cols={4} onClick={redirect}>
        <Inline right>
          <P style={{ fontWeight: '600' }}>{item.quantity}x</P>
        </Inline>
      </Col>
    </Wrapper>
  );
}

export default ItemBox;

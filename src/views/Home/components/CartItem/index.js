import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from "../../store/actions";
import { changeItemQuantity, excludeItem } from '../../services';
import { useNavigate } from "react-router-dom";

import { MdDeleteOutline } from 'react-icons/md';
import { Wrapper, StyledImg, InfoWrapper, ActionButtons, Button } from './styles';

import {
  Col,
  Inline,
  EmptyImage,
  P,
} from '~/components';
import formatPrice from "~/utils/formatPrice";

function CartItem({ item }) {
  const customer = useSelector(state => state.menu.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exclude = async () => {
    const newCart = await excludeItem(customer.id, item.id);

    dispatch(setCart(newCart));
  };

  const increaseItem = async () => {
    await handleItemOrderedQuantityChange(item.quantity + 1);
  };

  const decreaseItem = async () => {
    await handleItemOrderedQuantityChange(item.quantity - 1);
  };

  const handleItemOrderedQuantityChange = async (quantity) => {
    if (quantity <= 0) {
      return await exclude();
    }

    const newCart = await changeItemQuantity(customer.id, item.id, quantity);

    dispatch(setCart(newCart));
  };

  const redirect = () => {
    navigate(`/item-pedido/${item.id}/revisao`);
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
      <Col cols={4}>
        <Inline right>
          <ActionButtons>
            {
              item.quantity > 1 ?
                <Button onClick={decreaseItem}>-</Button> :
                <Button onClick={exclude}>
                  <MdDeleteOutline />
                </Button>
            }
              {item.quantity}
            <Button onClick={increaseItem}>+</Button>
          </ActionButtons>
        </Inline>
      </Col>
    </Wrapper>
  );
}

export default CartItem;

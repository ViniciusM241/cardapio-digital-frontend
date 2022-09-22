import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExtras } from '~/views/Home/store/actions';

import { Container, ActionButtons, Button } from './styles';

import {
  P,
  Col,
  Inline,
} from '~/components';
import formatPrice from '~/utils/formatPrice';

function ExtraItem({ item }) {
  const dispatch = useDispatch();
  const extras = useSelector(state => state.menu.selectedItem.extras);

  const increaseExtraQuantity = () => {
    const newExtras = extras.map(extra => {
      if (extra.id === item.id) {
        const quantity = (extra.quantity || 0) + 1 > 5 ? 5 : (extra.quantity || 0) + 1

        return {
          ...extra,
          quantity,
        };
      }
      else {
        return extra;
      }
    });

    dispatch(setExtras(newExtras));
  };

  const decreaseExtraQuantity = () => {
    const newExtras = extras.map(extra => {
      if (extra.id === item.id) {
        return {
          ...extra,
          quantity: (extra.quantity || 0) <= 0 ? 0 : (extra.quantity || 0) - 1,
        };
      }
      else {
        return extra;
      }
    });

    dispatch(setExtras(newExtras));
  };

  return (
    <Container className='mt-10'>
      <div>
        <P>{item.name}</P>
        <P className="mt-10">+ {formatPrice(item.value)}</P>
      </div>
      <Col cols={1}>
        <Inline right>
          <ActionButtons>
            {
              item.quantity > 0 ?
              (
                <>
                  <Button onClick={decreaseExtraQuantity}>-</Button>
                  {item.quantity}
                  <Button onClick={increaseExtraQuantity}>+</Button>
                </>
              ) : <Button onClick={increaseExtraQuantity}>+</Button>
            }
          </ActionButtons>
        </Inline>
      </Col>
    </Container>
  );
}

export default ExtraItem;

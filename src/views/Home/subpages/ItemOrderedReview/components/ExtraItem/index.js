import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItemOrderedExtras } from '~/views/Home/store/actions';

import { Container, ActionButtons, Button } from './styles';

import {
  P,
  Col,
  Inline,
} from '~/components';
import formatPrice from '~/utils/formatPrice';

function ExtraItem({ item }) {
  const dispatch = useDispatch();
  const extras = useSelector(state => state.menu.selectedItemOrdered.extras);

  const increaseExtraQuantity = () => {
    const newExtras = extras.map(extra => {
      if (extra.id === item.id) {
        return {
          ...extra,
          extraItemsOrdered: {
            ...extra.extraItemsOrdered,
            quantity: (extra.extraItemsOrdered.quantity || 0) + 1,
          },
        };
      }
      else {
        return extra;
      }
    });

    dispatch(setItemOrderedExtras(newExtras));
  };

  const decreaseExtraQuantity = () => {
    const newExtras = extras.map(extra => {
      if (extra.id === item.id) {
        return {
          ...extra,
          extraItemsOrdered: {
            ...extra.extraItemsOrdered,
            quantity: (extra.extraItemsOrdered.quantity || 0) <= 0 ? 0 : (extra.extraItemsOrdered.quantity || 0) - 1,
          },
        };
      }
      else {
        return extra;
      }
    });

    dispatch(setItemOrderedExtras(newExtras));
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
              item.extraItemsOrdered.quantity > 0 ?
              (
                <>
                  <Button onClick={decreaseExtraQuantity}>-</Button>
                  {item.extraItemsOrdered.quantity}
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

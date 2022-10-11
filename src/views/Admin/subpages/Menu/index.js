import React, { useState, useEffect } from 'react';
import getItems from './services/getItems';
import getExtras from './services/getExtras';
import getCategories from './services/getCategories';

import { Item } from './styles';

import {
  Col,
  Container,
  Inline,
  P,
} from '~/components';
import Plus from './components/Plus';

function Menu() {
  const [itemType, setItemType] = useState('ITEMS');
  const [items, setItems] = useState([]);

  const itens = {
    'ITEMS': {
      component: null,
      function: getItems,
      label: 'item',
    },
    'EXTRAS': {
      component: null,
      function: getExtras,
      label: 'adicional',
    },
    'CATEGORIES': {
      component: null,
      function: getCategories,
      label: 'categoria',
    },
  }

  const _getOrders = async () => {
    const data = await itens[itemType].function();

    setItems(data || []);
  };

  useEffect(() => {
    _getOrders();
  }, [itemType]);

  return (
    <>
      <Container>
        <Col cols={4}>
          <Item
            active={itemType === 'ITEMS'}
            onClick={() => setItemType('ITEMS')}
          >
            Itens
          </Item>
        </Col>
        <Col cols={4}>
          <Item
            active={itemType === 'EXTRAS'}
            onClick={() => setItemType('EXTRAS')}
          >
            Adicionais
          </Item>
        </Col>
        <Col cols={4}>
          <Item
            active={itemType === 'CATEGORIES'}
            onClick={() => setItemType('CATEGORIES')}
          >
            Categorias
          </Item>
        </Col>
        <Inline className="mt-20">
          {
            items.length ?
              items.map(item => (
                <Col key={item.id} cols={4} xs={12} className="mb-20">
                  {item.name}
                  {/* <OrderItem order={order} /> */}
                </Col>
              ))
            : <P>Nenhum{itemType === 'CATEGORIES' ? 'a' : ''} {itens[itemType].label} encontrad{itemType === 'CATEGORIES' ? 'a' : 'o'}</P>
          }
        </Inline>
      </Container>
      <Plus />
    </>
  );
}

export default Menu;

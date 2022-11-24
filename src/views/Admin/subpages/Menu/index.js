import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getItems from './services/getItems';
import getExtras from './services/getExtras';
import getCategories from './services/getCategories';
import { ToastContainer } from 'react-toastify';

import { Item } from './styles';

import {
  Col,
  Container,
  Inline,
  P,
} from '~/components';
import Plus from './components/Plus';
import CategoryBox from './components/CategoryBox';
import ExtraBox from './components/ExtraBox';
import ItemBox from './components/ItemBox';

function Menu() {
  const navigate = useNavigate();

  const [itemType, setItemType] = useState('ITEMS');
  const [items, setItems] = useState([]);

  const itens = {
    'ITEMS': {
      component: ItemBox,
      function: getItems,
      label: 'item',
      redirect: '/administrativo/cardapio/items',
    },
    'EXTRAS': {
      component: ExtraBox,
      function: getExtras,
      label: 'adicional',
      redirect: '/administrativo/cardapio/adicionais',
    },
    'CATEGORIES': {
      component: CategoryBox,
      function: getCategories,
      label: 'categoria',
      redirect: '/administrativo/cardapio/categorias',
    },
  }

  const _getOrders = async () => {
    const data = await itens[itemType].function();

    setItems(data || []);
  };

  const redirect = () => {
    navigate(itens[itemType].redirect);
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
                  {
                    React.createElement(itens[itemType].component, {
                      item,
                      items,
                      setItems,
                    })
                  }
                </Col>
              ))
            : <P>Nenhum{itemType === 'CATEGORIES' ? 'a' : ''} {itens[itemType].label} encontrad{itemType === 'CATEGORIES' ? 'a' : 'o'}</P>
          }
        </Inline>
      </Container>
      <Plus onClick={redirect} />
    </>
  );
}

export default Menu;

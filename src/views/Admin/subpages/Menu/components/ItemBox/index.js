import React from 'react';
import { useNavigate } from 'react-router-dom';
import deleteItemById from '../../services/deleteItemById';

import { StyledImg, LimitedP } from './styles';

import {
  Box,
  T1,
  P,
  Inline,
  Col,
  EmptyImage,
} from '~/components';
import formatPrice from '~/utils/formatPrice';
import ActionButtons from '../ActionButtons';

function ItemBox({ item, items, setItems }) {
  const navigate = useNavigate();

  const onDelete = () => {
    if (confirm('Você realmente deseja excluir esse item?')) {
      const newItems = items.filter(x => x.id !== item.id);

      setItems(newItems);
      deleteItemById(item.id);
    }
  };

  const onEdit = () => {
    navigate(`/administrativo/cardapio/items/${item.id}`);
  };

  return (
    <Box>
      <Inline>
        <Col cols={6} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <T1 style={{ fontWeight: '400', fontSize: '1.8rem' }}>Nome</T1>
          <P>{item.name}</P>
          <T1 className="mt-10" style={{ fontWeight: '400', fontSize: '1.8rem' }}>Descrição</T1>
          <LimitedP>{item.description}</LimitedP>
          <T1 className="mt-10" style={{ fontWeight: '400', fontSize: '1.8rem' }}>Valor</T1>
          <P>{formatPrice(item.value)}</P>
          <T1 className="mt-10" style={{ fontWeight: '400', fontSize: '1.8rem' }}>Categoria</T1>
          <P>{item.category?.name || '-'}</P>
        </Col>
        <Col cols={6} style={{ flexDirection: 'column', alignItems: 'flex-end', alignSelf: 'flex-start' }}>
          <ActionButtons className="mb-10" onDelete={onDelete} onEdit={onEdit} />
          {
            item.imageURL ?
              <StyledImg src={item.imageURL} />
            :
              <EmptyImage width={100} height={100} />
          }
        </Col>
      </Inline>
    </Box>
  );
}

export default ItemBox;

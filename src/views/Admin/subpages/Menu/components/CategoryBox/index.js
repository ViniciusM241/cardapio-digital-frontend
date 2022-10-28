import React from 'react';
import { useNavigate } from 'react-router-dom';
import deleteCategoryById from '../../services/deleteCategoryById';

import {
  Box,
  T1,
  P,
  Inline,
  Col,
} from '~/components';
import ActionButtons from '../ActionButtons';

function CategoryBox({ item, items, setItems }) {
  const navigate = useNavigate();

  const onDelete = () => {
    if (confirm('Você realmente deseja excluir essa categoria?')) {
      const newItems = items.filter(x => x.id !== item.id);

      setItems(newItems);
      deleteCategoryById(item.id);
    }
  };

  const onEdit = () => {
    navigate(`/administrativo/cardapio/categorias/${item.id}`);
  };

  return (
    <Box>
      <Inline>
        <Col cols={8} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <T1 style={{ fontWeight: '400', fontSize: '1.8rem' }}>Nome</T1>
          <P>{item.name}</P>
        </Col>
        <Col cols={4} style={{ alignSelf: 'flex-start' }}>
          <ActionButtons onDelete={onDelete} onEdit={onEdit} />
        </Col>
      </Inline>
    </Box>
  );
}

export default CategoryBox;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  T1,
  P,
  Inline,
  Col,
} from '~/components';
import ActionButtons from '../ActionButtons';

function CategoryBox({ item }) {
  const navigate = useNavigate();

  const onDelete = () => {

  };

  const onEdit = () => {
    navigate(`/administrativo/cardapio/categorias/${item.id}`);
  };

  return (
    <Box onClick={onEdit}>
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

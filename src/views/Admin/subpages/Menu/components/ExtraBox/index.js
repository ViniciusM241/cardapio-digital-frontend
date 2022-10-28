import React from 'react';
import { useNavigate } from 'react-router-dom';
import deleteExtraById from '../../services/deleteExtraById';

import {
  Box,
  T1,
  P,
  Inline,
  Col,
} from '~/components';
import formatPrice from '~/utils/formatPrice';
import ActionButtons from '../ActionButtons';

function ExtraBox({ item, items, setItems }) {
  const navigate = useNavigate();

  const onDelete = () => {
    if (confirm('Você realmente deseja excluir esse adicional?')) {
      const newItems = items.filter(x => x.id !== item.id);

      setItems(newItems);
      deleteExtraById(item.id);
    }
  };

  const onEdit = () => {
    navigate(`/administrativo/cardapio/adicionais/${item.id}`);
  };

  return (
    <Box>
      <Inline>
        <Col cols={8} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <T1 style={{ fontWeight: '400', fontSize: '1.8rem' }}>Nome</T1>
          <P>{item.name}</P>
          <T1 className="mt-10" style={{ fontWeight: '400', fontSize: '1.8rem' }}>Valor</T1>
          <P>{formatPrice(item.value)}</P>
        </Col>
        <Col cols={4} style={{ alignSelf: 'flex-start' }}>
          <ActionButtons onDelete={onDelete} onEdit={onEdit} />
        </Col>
      </Inline>
    </Box>
  );
}

export default ExtraBox;

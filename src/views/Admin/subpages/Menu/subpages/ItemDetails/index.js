import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getItemById from '../../services/getItemById';
import updateItem from '../../services/updateItem';
import createItem from '../../services/createItem';
import getExtras from '../../services/getExtras';
import { toast } from 'react-toastify';
import itemSchema from '~/utils/validations/itemSchema';

import { StyledMdKeyboardArrowLeft } from './styles';

import {
  Container,
  Inline,
  Col,
  T1,
  Form,
  Input,
  Line,
  CheckBox,
} from '~/components';
import SaveButton from '../../components/SaveButton';
import { currency } from '~/utils/masks';

function ItemDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.replace(/^(\D)+/, '');

  const [item, setItem] = useState({});
  const [extras, setExtras] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const _getItemById = async (id) => {
    const item = await getItemById(id);

    setItem(item);
  };

  const _getExtras = async () => {
    const extras = await getExtras();

    setExtras(extras);
  };

  const handleSubmit = async ({ values }) => {
    setIsLoading(true);
    let res;

    if (id) {
      res = await updateItem(id, values);
    } else {
      res = await createItem(values);
    }
    setIsLoading(false);

    if (res.status === 204 || res.status === 201) {
      toast.success('Dados salvos com sucesso');
      navigate('/administrativo/cardapio/');
    } else {
      toast.error('Erro ao salvar');
    }
  };

  useEffect(() => {
    if (id) {
      _getItemById(id);
    }
  }, [id]);

  useEffect(() => {
    _getExtras();
  }, []);

  return (
    <Container>
      <Inline>
        <Col cols={1} xs={3}>
          <StyledMdKeyboardArrowLeft onClick={() => navigate(`/administrativo/cardapio`)} />
        </Col>
        <Col cols={11} xs={9}>
          <T1>{id ? 'Editar' : 'Adicionar'} item</T1>
        </Col>
      </Inline>
      <Form
        className="mt-40"
        initialValues={{
          name: item.name || '',
          description: item.description || '',
          value: item.value ? currency(item.value) : '',
          categoryId: item.categoryId || 0,
          extras: item.extras ? item.extras.map(x => x.id) : [],
        }}
        onSubmit={handleSubmit}
        validationSchema={itemSchema}
      >
        <Input
          type="text"
          name="name"
          placeholder="Digite o nome..."
          label="Nome"
        />
        <Input
          type="text"
          name="description"
          placeholder="Digite a descrição..."
          label="Descrição"
          className="mt-10"
        />
        <Input
          type="text"
          name="value"
          placeholder="Digite o valor..."
          label="Valor"
          className="mt-10"
          onChange={(e) => {
            const masked = currency(e);

            return masked;
          }}
        />
        <T1 className="mt-10" style={{ fontWeight: '400' }}>Adicionais</T1>
        <Line className="mt-10" />
        {
          extras.map(extra => (
            <CheckBox
              className="mt-10"
              type="checkbox"
              name="extras"
              key={extra.id}
              label={extra.name}
              value={extra.id}
            />
          ))
        }
        <SaveButton type="submit" disabled={isLoading} />
      </Form>
    </Container>
  );
}

export default ItemDetails;

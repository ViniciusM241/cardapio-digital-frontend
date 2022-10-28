import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getExtraById from '../../services/getExtraById';
import updateExtra from '../../services/updateExtra';
import createExtra from '../../services/createExtra';
import { toast } from 'react-toastify';
import extraSchema from '~/utils/validations/extraSchema';

import { StyledMdKeyboardArrowLeft } from './styles';

import {
  Container,
  Inline,
  Col,
  T1,
  Form,
  Input,
} from '~/components';
import SaveButton from '../../components/SaveButton';
import { currency } from '~/utils/masks';

function ExtraDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.replace(/^(\D)+/, '');

  const [extra, setExtra] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const _getExtrasById = async (id) => {
    const extra = await getExtraById(id);

    setExtra(extra);
  };

  const handleSubmit = async ({ values }) => {
    setIsLoading(true);
    let res;

    if (id) {
      res = await updateExtra(id, values);
    } else {
      res = await createExtra(values);
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
      _getExtrasById(id);
    }
  }, [id]);

  const initialValues = useMemo(() => ({
    name: extra.name || '',
    value: extra.value ? currency(extra.value) : '',
  }), []);

  return (
    <Container>
      <Inline>
        <Col cols={1} xs={3}>
          <StyledMdKeyboardArrowLeft onClick={() => navigate(`/administrativo/cardapio`)} />
        </Col>
        <Col cols={11} xs={9}>
          <T1>{id ? 'Editar' : 'Adicionar'} adicional</T1>
        </Col>
      </Inline>
      <Form
        className="mt-40"
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={extraSchema}
      >
        <Input
          type="text"
          name="name"
          placeholder="Digite o nome..."
          label="Nome"
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
        <SaveButton type="submit" disabled={isLoading} />
      </Form>
    </Container>
  );
}

export default ExtraDetails;

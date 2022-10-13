import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getCategoriesById from '../../services/getCategoriesById';
import updateCategory from '../../services/updateCategory';
import createCategory from '../../services/createCategory';
import { toast } from 'react-toastify';
import categorySchema from '~/utils/validations/categorySchema';

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

function CategoryDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.replace(/^(\D)+/, '');

  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const _getCategoriesById = async (id) => {
    const category = await getCategoriesById(id);

    setCategory(category);
  };

  const handleSubmit = async ({ values }) => {
    setIsLoading(true);
    let res;

    if (id) {
      res = await updateCategory(id, values);
    } else {
      res = await createCategory(values);
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
      _getCategoriesById(id);
    }
  }, [id]);

  return (
    <Container>
      <Inline>
        <Col cols={1} xs={3}>
          <StyledMdKeyboardArrowLeft onClick={() => navigate(`/administrativo/cardapio`)} />
        </Col>
        <Col cols={11} xs={9}>
          <T1>{id ? 'Editar' : 'Adicionar'} categoria</T1>
        </Col>
      </Inline>
      <Form
        className="mt-40"
        initialValues={{
          name: category.name || '',
        }}
        onSubmit={handleSubmit}
        validationSchema={categorySchema}
      >
        <Input
          type="text"
          name="name"
          placeholder="Digite o nome..."
          label="Nome"
        />
        <SaveButton type="submit" disabled={isLoading} />
      </Form>
    </Container>
  );
}

export default CategoryDetails;

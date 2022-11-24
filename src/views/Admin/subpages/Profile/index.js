import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, setProfile  } from '../../store/actions';
import profileSchema from '~/utils/validations/profileSchema';
import updateUser from './services/updateUser';
import { toast, ToastContainer } from 'react-toastify';

import {
  Container,
  Inline,
  T1,
  Form,
  Input,
  Button,
} from '~/components';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.admin.profile);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ values }) => {
    const body = {
      name: values.name,
      password: values.password,
      email: values.email,
    };

    setIsLoading(true);

    const isCorrect = await updateUser(body, profile.id);

    setIsLoading(false);

    if (isCorrect) {
      toast.success('Dados salvos com sucesso');
    } else {
      toast.error('Erro ao salvar, tente novamente mais tarde');
    }

    dispatch(setProfile(body));
  };

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const initialValues = useMemo(() => ({
    name: profile.name,
    email: profile.email,
    password: '',
    confirmPassword: '',
  }), [profile]);

  return (
    <Container>
      <T1 className="mb-10">Lista de clientes</T1>
      <Inline>
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={profileSchema}
        >
          {
            () => (
              <>
                <Input
                  type="text"
                  name="name"
                  label="Nome"
                  className="mt-10"
                />
                <Input
                  type="email"
                  name="email"
                  label="E-mail"
                  className="mt-10"
                />
                <Input
                  type="password"
                  name="password"
                  label="Senha"
                  className="mt-10"
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  label="Confirmar Senha"
                  className="mt-10"
                />
                <Inline right>
                  <Button type="submit" className="mt-10" isLoading={isLoading}>Salvar</Button>
                </Inline>
              </>
            )
          }
        </Form>
      </Inline>
    </Container>
  );
}

export default Profile;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '~/boot/auth';
import useBreakpoints from '~/hooks/useBreakpoints';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/actions';

import {
  T1,
  T2,
  Input,
  Form,
  Button,
  Inline,
} from '~/components';

import {
  Container,
  Box,
  Logo,
  Error,
} from './styles';

function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.login.isLoading);
  const navigate = useNavigate();
  const breakpoints = useBreakpoints();
  const [error, setError] = useState('');

  const onSubmit = ({ values }) => {
    if (!values.email || !values.password) return;

    dispatch(login(
      values.email,
      values.password,
      (_, res) => {
        const { data } = res;

        if (!data.length) {
          return setError('E-mail ou senha incorretos');
        }

        setToken(data[0].token);
        navigate('/administrativo');
      }
    ));
  };

  return (
    <Container>
      <Inline
        left={!breakpoints.xs && !breakpoints.sm}
      >
        <Logo />
      </Inline>
      <Inline
        center
        style={{
          height: '80vh',
        }}
      >
        <Box
          breakpoints={breakpoints}
        >
          <T1> Entrar </T1>
          <T2 className="mt-10"> Entre com seu e-mail e senha </T2>
          <Form
            className="mt-20"
            onSubmit={onSubmit}
            initialValues={{
              email: '',
              password: '',
            }}
          >
            <Input
              className="mb-20"
              name="email"
              type="text"
              placeholder="E-mail"
              label="E-mail"
            />
            <Input
              className="mb-20"
              name="password"
              type="password"
              placeholder="Senha"
              label="Senha"
            />
            <Error>{error || '\u00A0'}</Error>
            <Inline
              className="mt-40"
              right
            >
              <Button type="submit" isLoading={isLoading}> Entrar </Button>
            </Inline>
          </Form>
        </Box>
      </Inline>
    </Container>
  );
}

export default Login;

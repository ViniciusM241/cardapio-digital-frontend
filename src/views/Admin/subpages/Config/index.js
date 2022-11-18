import React, { useEffect, useState, useMemo } from 'react';
import getConfigs from './services/getConfigs';
import getParams from './services/getParams';
import updateParams from './services/updateParams';
import disconnect from './services/disconnect';
import useBreakpoints from '~/hooks/useBreakpoints';
import { phone, number } from '~/utils/masks';
import { toast } from 'react-toastify';
import paramsSchema from '~/utils/validations/paramsSchema';

import { ColoredStatus, Link } from './styles';

import {
  Container,
  Inline,
  P,
  Col,
  Form,
  Input,
  T1,
  Line,
  Button,
} from '~/components';
import QRCode from 'react-qr-code';

function Config() {
  const breakpoints = useBreakpoints();
  const [configs, setConfigs] = useState({});
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const _getConfigs = async () => {
    const res = await getConfigs();

    setConfigs(res);
  };

  const _getParams = async () => {
    const res = await getParams();

    setParams(res);
  };

  useEffect(() => {
    _getParams();
  }, []);

  useEffect(() => {
    _getConfigs();

    const interval = setInterval(() => {
      _getConfigs();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async ({ values }) => {
    setIsLoading(true);

    const res = await updateParams({
      ...values,
      businessNumber: `55${values.businessNumber.replace(/\D/g, '')}`,
    });

    setIsLoading(false);

    if (res) {
      toast.success('Dados salvos com sucesso');
    } else {
      toast.error('Erro ao salvar. Tente mais tarde');
    }
  };

  const initialValues = useMemo(() => ({
    businessNumber: params.businessNumber ? phone(params.businessNumber.substring(2)) : '',
    deliveryTime: params.deliveryTime ? String(params.deliveryTime) : '0',
    takeoutTime: params.takeoutTime ? String(params.takeoutTime) : '0',
    pix: params.pix || '',
  }), [params]);

  return (
    <Container>
      <Inline center>
        <P>
          Status:&nbsp;
          <ColoredStatus online={configs.status != 'OFFLINE'}>
            {configs.status || 'OFFLINE'}
          </ColoredStatus>
          {
            configs.status === 'CONNECTED' && (
              <Link onClick={disconnect} className='ml-10'>Desconectar</Link>
            )
          }
        </P>
      </Inline>
      {
        configs.qr && configs.status === 'OFFLINE' && (
          <Inline center className="mt-20">
            <Col cols={12}>
              <Inline center>
                <P>Código QR:</P>
              </Inline>
            </Col>
            <QRCode value={configs.qr} className="mt-10" />
          </Inline>
        )
      }
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={paramsSchema}
      >
      <Inline className="mt-20">
        <T1 style={{ fontWeight: '400' }}>Parâmetros</T1>
        <Line className="mt-10" />
        <Col cols={6} xs={12}>
          <Input
            className="mt-10"
            type="text"
            placeholder="Digite aqui..."
            label="Número do WhatsApp:"
            name="businessNumber"
            onChange={(e) => {
              const newPhone = phone(e);

              return newPhone;
            }}
          />
        </Col>
        <Col cols={6} xs={12}>
          <Input
            className={`mt-10${breakpoints.lg ? ' ml-10' : ''}`}
            type="number"
            placeholder="Digite aqui..."
            label="Tempo de Entrega (minutos):"
            name="deliveryTime"
            onChange={(e) => {
              const newNumber = number(e);

              return newNumber;
            }}
          />
        </Col>
        <Col cols={6} xs={12}>
          <Input
            className="mt-10"
            type="number"
            placeholder="Digite aqui..."
            label="Tempo de Retirada (minutos):"
            name="takeoutTime"
            onChange={(e) => {
              const newNumber = number(e);

              return newNumber;
            }}
          />
        </Col>
        <Col cols={6} xs={12}>
          <Input
            className={`mt-10${breakpoints.lg ? ' ml-10' : ''}`}
            type="text"
            placeholder="Digite aqui..."
            label="Chave do Pix:"
            name="pix"
          />
        </Col>
        <Inline style={{ justifyContent:'flex-end' }} className='mt-20 mb-20'>
          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </Inline>
      </Inline>
      </Form>
    </Container>
  );
}

export default Config;

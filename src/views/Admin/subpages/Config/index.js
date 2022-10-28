import React, { useEffect, useState } from 'react';
import getConfigs from './services/getConfigs';
import disconnect from './services/disconnect';

import { ColoredStatus, Link } from './styles';

import {
  Container,
  Inline,
  P,
  Col,
} from '~/components';
import QRCode from 'react-qr-code';

function Config() {
  const [configs, setConfigs] = useState({});

  const _getConfigs = async () => {
    const res = await getConfigs();

    setConfigs(res);
  };

  useEffect(() => {
    _getConfigs();

    const interval = setInterval(() => {
      _getConfigs();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    </Container>
  );
}

export default Config;

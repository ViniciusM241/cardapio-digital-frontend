import React, { useEffect, useState } from 'react';
import getConfigs from './services/getConfigs';

import {
  Container,
  Inline,
  P,
} from '~/components';
import QRCode from 'react-qr-code';
import colors from '~/utils/colors';

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
          Status:
          <span
            style={{ color: configs.status === 'OFFLINE' ? colors.RED : colors.GREEN }}
          >
            {configs.status || 'OFFLINE'}
          </span>
        </P>
      </Inline>
      {
        configs.qr && (
          <Inline center className="mt-20">
            <P>Código QR:</P>
            <QRCode value={configs.qr} className="mt-10" />
          </Inline>
        )
      }
    </Container>
  );
}

export default Config;

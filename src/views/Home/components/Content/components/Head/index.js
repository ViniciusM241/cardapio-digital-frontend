import React from 'react';

import { MdShoppingBag, MdStore } from 'react-icons/md';
import colors from '~/utils/colors';

import {
  Inline,
  Col,
  P,
} from '~/components';

function Head() {
  return (
    <>
      <Col cols={5}>
        <Inline>
          <MdStore style={{ color: colors.RED, fontSize: '1.2rem' }} />
          <P>
            Hamburgueria
          </P>
        </Inline>
      </Col>
      <Col cols={7}>
        <Inline>
          <MdShoppingBag style={{ color: colors.RED, fontSize: '1.2rem' }} />
          <P>
            Pedido mínimo de R$ 10,00
          </P>
        </Inline>
      </Col>
    </>
  );
}

export default Head;

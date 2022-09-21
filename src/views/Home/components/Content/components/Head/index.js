import React from 'react';

import { MdShoppingBag, MdStore } from 'react-icons/md';
import colors from '~/utils/colors';

import {
  Inline,
  Col,
  Row,
  P,
} from '~/components';

function Head() {
  return (
    <>
      <Col cols={5}>
        <Row>
          <MdStore style={{ color: colors.RED, fontSize: '1.2rem' }} />
          <P>
            Hamburgueria
          </P>
        </Row>
      </Col>
      <Col cols={7}>
        <Row>
          <MdShoppingBag style={{ color: colors.RED, fontSize: '1.2rem' }} />
          <P>
            Pedido mínimo de R$ 10,00
          </P>
        </Row>
      </Col>
    </>
  );
}

export default Head;

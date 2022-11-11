import React from 'react';

import { MdShoppingBag, MdStore } from 'react-icons/md';
import colors from '~/utils/colors';

import {
  Col,
  Row,
  P,
} from '~/components';

function Head() {
  return (
    <>
      <Col cols={5}>
        <Row>
          <MdStore style={{ color: colors.RED, fontSize: '1.3rem' }} />
          <P className="ml-10s">
            Hamburgueria
          </P>
        </Row>
      </Col>
      <Col className="ml-10" cols={7}>
        {/* <Row>
          <MdShoppingBag style={{ color: colors.RED, fontSize: '1.3rem' }} />
          <P className="ml-10s">
            Pedido mínimo de <span style={{ whiteSpace: 'nowrap', fontSize: 'inherit' }}>R$ 10,00</span>
          </P>
        </Row> */}
      </Col>
    </>
  );
}

export default Head;

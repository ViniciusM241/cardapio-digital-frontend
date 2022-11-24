import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useBreakpoints from '~/hooks/useBreakpoints';
import getItemOrdered from './services/getItemOrdered';

import { StyledMdKeyboardArrowLeft, StyledImg, Wrapper } from './styles';

import {
  Container,
  Inline,
  T1,
  Col,
  EmptyImage,
  P,
  Line,
  Input,
  Pre,
} from '~/components';
import ExtraBox from '../../components/ExtraBox';

import formatPrice from '~/utils/formatPrice';

function ItemOrdersDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const breakpoints = useBreakpoints();
  const orderId = location.pathname.match(/(\d)+/g)[0];

  const [item, setItem] = useState({});

  const _getItemOrdered = async (id) => {
    const itemOrdered = await getItemOrdered(id);

    setItem(itemOrdered);
  };

  useEffect(() => {
    if (item.status === 400 && orderId) {
      navigate(`/administrativo/pedidos/${orderId}`);
    }
  }, [item]);

  useEffect(() => {
    const id = location.pathname.match(/(\d)+/g)[1];

    if (id) {
      _getItemOrdered(id);
    }
  }, [location]);

  return (
    <Container>
      <Wrapper className="mb-20">
        <div>
          <Inline>
            <Col cols={1} xs={3}>
              <StyledMdKeyboardArrowLeft onClick={() => navigate(`/administrativo/pedidos/${orderId}`)} />
            </Col>
            <Col cols={11} xs={9}>
              <T1>Detalhes do item</T1>
            </Col>
          </Inline>
          <Inline>
            <Col cols={2} xs={12}>
              <Inline className="mt-40 mb-20" center={breakpoints.xs}>
                {
                  !item.item?.imageURL ?
                    <EmptyImage width={180} height={180} icoSize={4} />
                  :
                    <StyledImg src={item.item?.imageURL} />
                }
              </Inline>
            </Col>
            <Col cols={9} xs={12}>
              <Inline className={breakpoints.xs ? '' : 'ml-20'} >
                <Col cols={9} xs={12}>
                  <T1 style={{ fontWeight: '400' }}>{item.item?.name}</T1>
                </Col>
                <Col cols={9} xs={12}>
                  <Pre className='mt-10'>{item.item?.description}</Pre>
                </Col>
                {
                  item.special || (
                    <>
                      <Col cols={9} xs={12}>
                        <P style={{ fontWeight: '600' }} className='mt-10'>{formatPrice(item.item?.value)}</P>
                      </Col>
                    </>
                  )
                }
              </Inline>
            </Col>
          </Inline>
          {
            !!item.extras?.length && (
              <>
                <Col cols={12}>
                  <T1 style={{ fontWeight: '400' }} className='mt-20'>Adicionais</T1>
                </Col>
                <Col cols={12}>
                  <Line className='mt-10' />
                </Col>
                {
                  item.extras.map(extra => (
                    <React.Fragment key={extra.id}>
                      <ExtraBox item={extra} />
                      <Line className='mt-10' />
                    </React.Fragment>
                  ))
                }
              </>
            )
          }
          <T1 style={{ fontWeight: '400' }} className="mt-20">Observações</T1>
          <Inline>
            <Col cols={6} xs={12}>
              <Input
                className='mt-10'
                type="text"
                placeholder="Digite aqui..."
                name="notes"
                value={item.notes || ''}
                disabled
              />
            </Col>
          </Inline>
          <Line className="mt-20" />
          <Inline>
            <Col cols={6}>
              <T1 style={{ fontWeight: '400' }} className="mt-20">Quantidade</T1>
            </Col>
            <Col cols={6}>
              <Inline right>
                <P style={{ fontWeight: '400' }} className="mt-20">{item.quantity}x</P>
              </Inline>
            </Col>
          </Inline>
          <Inline>
            <Col cols={6}>
              <T1 style={{ fontWeight: '400' }} className="mt-20">Total</T1>
            </Col>
            <Col cols={6}>
              <Inline right>
                <P style={{ fontWeight: '400' }} className="mt-20">{formatPrice(item.total)}</P>
              </Inline>
            </Col>
          </Inline>
        </div>
      </Wrapper>
    </Container>
  );
}

export default ItemOrdersDetails;

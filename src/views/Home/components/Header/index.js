import React from 'react';
import useBreakpoints from '~/hooks/useBreakpoints';

import logo from '~/assets/logo.png';
import { StyledImage, Wrapper } from './styles';
import { MdLocationOn } from 'react-icons/md';
import colors from '~/utils/colors';

import {
  Container,
  Col,
  T1,
  Inline,
  Row,
  P,
} from '~/components';
import DesktopCart from '../DesktopCart';

function Header() {
  const breakpoints = useBreakpoints();

  return (
    <Wrapper xs={breakpoints.xs}>
      <Container>
        <Col cols={2} xs={3} className="mt-20">
          <StyledImage src={logo} alt="Perrón! Tex Mex Logo" />
        </Col>
        <Col cols={0} xs={1} />
        <Col cols={7} xs={8} className="mt-20">
          <Inline>
            <T1>Perrón! Tex Mex</T1>
            <Row className="mt-10">
              <MdLocationOn style={{ color: colors.RED, fontSize: '1.5rem' }} />
              <P>Av. Carlos Fernandes, 1631F - Centro</P>
            </Row>
          </Inline>
        </Col>
        {
          !breakpoints.xs && (
            <Col cols={3}>
              <DesktopCart />
            </Col>
          )
        }
      </Container>
    </Wrapper>
  );
}

export default Header;

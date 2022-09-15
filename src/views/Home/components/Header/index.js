import React from 'react';

import logo from '~/assets/logo.png';
import { StyledImage, Wrapper } from './styles';
import { MdLocationOn } from 'react-icons/md';

import {
  Container,
  Col,
  T1,
  Inline,
  P,
} from '~/components';
import colors from '~/utils/colors';

function Header() {
  return (
    <Wrapper>
      <Container>
        <Col cols={3} className="mt-20">
          <StyledImage src={logo} alt="Perrón! Tex Mex Logo" />
        </Col>
        <Col cols={9} className="mt-20">
          <Inline>
            <T1>Perrón! Tex Mex</T1>
            <Inline className="mt-10">
              <MdLocationOn style={{ color: colors.RED, fontSize: '1.2rem' }} />
              <P>Av. Carlos Fernandes, 1631F - Centro</P>
            </Inline>
          </Inline>
        </Col>
      </Container>
    </Wrapper>
  );
}

export default Header;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useBreakpoints from '~/hooks/useBreakpoints';

import { Wrapper, Logo, StyledMdMenu } from './styles';
import logo from '~/assets/logo.png';

import {
  Container,
  Col,
  Inline,
  T1,
} from '~/components';
import NavigationBar from './components/NavigationBar';
import MobileMenu from './components/MobileMenu';

function Header() {
  const location = useLocation();
  const breakpoints = useBreakpoints();
  const [isOpened, setIsOpened] = useState(false);

  const toggleMenuOpened = () => {
    setIsOpened(!isOpened);
  };

  if (location.pathname.includes('administrativo')) {
    return (
      <>
        <Wrapper className="mb-40 mt-20">
          <Container>
            <Col cols={1} xs={2}>
              <Logo src={logo} alt="Logo Perron Tex Mex" />
            </Col>
            <Col cols={3} xs={8}>
              <Inline center>
                <T1>Perron Tex Mex</T1>
              </Inline>
            </Col>
            {
              !breakpoints.xs && (
                <>
                  <Col cols={6}>
                    <NavigationBar />
                  </Col>
                  <Col cols={2}>
                    Vinicius Melo
                  </Col>
                </>
              )
            }
            {
              breakpoints.xs && (
                <Col cols={2}>
                  <Inline right>
                    <StyledMdMenu onClick={toggleMenuOpened} />
                  </Inline>
                </Col>
              )
            }
          </Container>
        </Wrapper>
        {
          breakpoints.xs && (
            <MobileMenu toggleMenuOpened={toggleMenuOpened} isOpened={isOpened} />
          )
        }
      </>
    );
  } else {
    return null;
  }
}

export default Header;

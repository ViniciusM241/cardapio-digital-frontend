import React from 'react';

import { Wrapper } from './styles';

import Head from './components/Head';
import Slider from './components/Slider';
import Menu from './components/Menu';
import {
  Container,
  Row,
} from '~/components';
import useBreakpoints from '~/hooks/useBreakpoints';

function Content() {
  const breakpoints = useBreakpoints();

  return (
    <Wrapper className={breakpoints.xs ? 'mt-20' : 'mt-40'}>
      <Container>
        <Row style={{ alignItems: 'flex-start' }}>
          <Head />
        </Row>
        <Row className="mt-10">
          <Slider />
        </Row>
        <Menu />
      </Container>
    </Wrapper>
  );
}

export default Content;

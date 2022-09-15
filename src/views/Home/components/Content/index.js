import React from 'react';

import { Wrapper } from './styles';

import Head from './components/Head';
import Slider from './components/Slider';
import Menu from './components/Menu';
import {
  Container,
  Row,
} from '~/components';

function Content() {
  return (
    <Wrapper className='mt-20'>
      <Container>
        <Row>
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

import React from 'react';
import { useSelector } from 'react-redux';

import { Wrapper } from './styles';

import SliderItem from '../SliderItem';

function Slider() {
  const menu = useSelector(state => state.menu.menu);
  const items = menu.map(item => item.items.length ? item.name : null).filter(Boolean);

  return (
    <Wrapper className='mt-10'>
      {
        items.map((item, index) => (
          <SliderItem
            key={index}
            index={index}
            item={{ title: item }}
          />
        ))
      }
    </Wrapper>
  );
}

export default Slider;

import React from 'react';

import MenuItem from '../MenuItem';
import { T1, Line } from '~/components';
import { Wrapper } from './styles';

function Category({ category }) {

  if (!category.items.length) return null;

  return (
    <Wrapper className='mt-10'>
      <T1 id={`${encodeURI(category.name)}`} className='mb-10' style={{ fontWeight: '500' }}>{category.name}</T1>
      <Line />
      {
        category.items.map(item => (
          <React.Fragment key={item.id}>
            <MenuItem
              item={item}
            />
            <Line />
          </React.Fragment>
        ))
      }
    </Wrapper>
  );
}

export default Category;

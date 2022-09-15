import React from 'react';
import { useSelector } from 'react-redux';

import Category from '../Category';

function Menu() {
  const menu = useSelector(state => state.menu.menu);

  return (
    <>
      {
        menu.map(category => (
          <Category
            key={category.id}
            category={category}
          />
        ))
      }
    </>
  );
}

export default Menu;

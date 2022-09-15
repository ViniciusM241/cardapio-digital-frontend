import React from 'react';
const MenuPage = React.lazy(() => import('./index'));
const ItemDetails = React.lazy(() => import('./subpages/ItemDetails'));
const ItemOrderedReview = React.lazy(() => import('./subpages/ItemOrderedReview'));

export default [
  {
    path: '/',
    element: MenuPage,
    exact: true,
    title: 'Perrón! Cardápio',
  },
  {
    path: '/items/:id',
    element: ItemDetails,
    exact: true,
    title: 'Perrón! Cardápio',
  },
  {
    path: '/item-pedido/:id/revisao',
    element: ItemOrderedReview,
    exact: true,
    title: 'Perrón! Cardápio',
  },
];

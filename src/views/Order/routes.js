import React from 'react';
const OrderPage = React.lazy(() => import('./index'));

export default [
  {
    path: '/pedidos',
    element: OrderPage,
    exact: true,
    title: 'Perrón! Cardápio',
  },
];

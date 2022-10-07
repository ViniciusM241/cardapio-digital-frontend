import React from 'react';
import isLogged from '~/middlewares/isLogged';
const AdminPage = React.lazy(() => import('./index'));
const Logout = React.lazy(() => import('./subpages/Logout'));
const Orders = React.lazy(() => import('./subpages/Orders'));
const Config = React.lazy(() => import('./subpages/Config'));
const OrdersDetails = React.lazy(() => import('./subpages/OrdersDetails'));

export default [
  {
    path: '/administrativo',
    element: AdminPage,
    exact: true,
    title: 'Perrón! Cardápio - Admin',
    middlewares: [
      isLogged,
    ],
  },
  {
    path: '/administrativo/pedidos',
    element: Orders,
    exact: true,
    title: 'Perrón! Cardápio - Admin',
    middlewares: [
      isLogged,
    ],
  },
  {
    path: '/administrativo/configuracoes',
    element: Config,
    exact: true,
    title: 'Perrón! Cardápio - Admin',
    middlewares: [
      isLogged,
    ],
  },
  {
    path: '/administrativo/pedidos/:id',
    element: OrdersDetails,
    exact: true,
    title: 'Perrón! Cardápio - Admin',
    middlewares: [
      isLogged,
    ],
  },
  {
    path: '/administrativo/sair',
    element: Logout,
    exact: true,
    title: 'Perrón! Cardápio - Admin',
  },
];

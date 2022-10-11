import React from 'react';
import isLogged from '~/middlewares/isLogged';
import ItemOrdersDetails from './subpages/ItemOrdersDetails';
const AdminPage = React.lazy(() => import('./index'));
const Logout = React.lazy(() => import('./subpages/Logout'));
const Orders = React.lazy(() => import('./subpages/Orders'));
const Config = React.lazy(() => import('./subpages/Config'));
const OrdersDetails = React.lazy(() => import('./subpages/OrdersDetails'));
const Menu = React.lazy(() => import('./subpages/Menu'));

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
    path: '/administrativo/pedidos/:orderId/item-pedido/:id',
    element: ItemOrdersDetails,
    exact: true,
    title: 'Perrón! Cardápio - Admin',
    middlewares: [
      isLogged,
    ],
  },
  {
    path: '/administrativo/cardapio',
    element: Menu,
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

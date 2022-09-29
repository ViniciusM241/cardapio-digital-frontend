import React from 'react';
import isLogged from '~/middlewares/isLogged';
const AdminPage = React.lazy(() => import('./index'));
const Logout = React.lazy(() => import('./subpages/Logout'));

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
    path: '/administrativo/sair',
    element: Logout,
    exact: true,
    title: 'Perrón! Cardápio - Admin',
  },
];

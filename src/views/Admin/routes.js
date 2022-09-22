import React from 'react';
import isLogged from '~/middlewares/isLogged';
const AdminPage = React.lazy(() => import('./index'));

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
];

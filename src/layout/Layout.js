import React from 'react';
import Router from '~/layout/Router';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from './styles/GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';

function Layout () {
  return (
    <div className='App'>
      <GlobalStyle />
      <Router />
      <ToastContainer />
    </div>
  );
}

export default Layout;

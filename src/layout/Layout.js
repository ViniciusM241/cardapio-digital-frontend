import React, { useEffect } from 'react';
import Router from '~/layout/Router';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer, createCustomer } from '../views/Home/store/actions';
import { getToken, setToken } from '~/boot/customerAuth';

import GlobalStyle from './styles/GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';

function Layout () {
  const dispatch = useDispatch();
  const customer = useSelector(state => state.menu.customer);

  useEffect(() => {
    if (customer.id) {
      setToken(customer.id);
    }
  }, [customer]);

  useEffect(() => {
    const id = getToken();

    if (id) {
      dispatch(getCustomer(id));
    } else {
      dispatch(createCustomer());
    }
  }, [getToken, getCustomer, createCustomer]);

  return (
    <div className='App'>
      <GlobalStyle />
      <Router />
    </div>
  );
}

export default Layout;

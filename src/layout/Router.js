import React, { Suspense, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import routes from '~/routes';

import NotFound from '~/views/NotFound';
import SuspenseLoading from '~/components/SuspenseLoading';
import Header from './Header';

function CustomRouter () {
  const dispatch = useDispatch();

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <BrowserRouter>
        <Header />
        <main style={{ height: '100vh' }}>
          <Routes>
            {
              routes.map(({
                middlewares,
                element: Component,
                path,
                exact,
                title,
                ...props
              }, index) => {
                const Element = () => {
                  useEffect(() => {
                    document.title = title;
                  }, [title]);

                  const next = () => {
                    return {
                      element: Component && (
                        <Component {...props} />
                      ),
                      success: true,
                    };
                  };

                  const redirect = (to) => {
                    return {
                      element: <Navigate to={to} {...props} />,
                      success: false,
                    };
                  };

                  if (middlewares && middlewares.length) {
                    let response = null;

                    for (let i = 0; i < middlewares.length; i++) {
                      const _middleware = middlewares[i](next, redirect, { dispatch });
                      response = _middleware();

                      if (response.success === false) {
                        break;
                      }
                    }

                    return response.element;
                  } else {
                    return (
                      Component && (
                        <Component {...props} />
                      )
                    );
                  }
                };

                return (
                  <Route
                    key={index}
                    path={path}
                    exact={exact}
                    element={<Element />}
                  />
                );
              })
            }
            <Route
              path={'*'}
              exact={true}
              element={<NotFound />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </Suspense>
  );
}

export default CustomRouter;

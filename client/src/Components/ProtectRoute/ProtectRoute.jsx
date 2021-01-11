import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AdminStrain } from '../Admin/LoadCategory/AdminStrain';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

function ProtectRoute(props) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <AuthComponent {...props} />
    </Suspense>
  );
}

function AuthComponent({ component: Component, isLogged, ...rest }) {
  const authStatus = isLogged();
  return (
    <Route
      {...rest}
      render={(_props) =>
        authStatus ? (
          <Component {..._props} />
        ) : (
          <Redirect to="/form/user/login" />
        )
      }
    />
  );
}

export default ProtectRoute;
/**
 * TODO: funciones userIsLogged & AdminIsLogged
 *
 *
 * ?Protejo ruta de `usuario comun`, y le paso func que devuelve true|false si el usuario esta logeado
 * @param{userIsLogged}
 * <ProtectRoute Component={Profile} path="xxxx" isLogged={userIsLogged} />;
 *
 * ?Protejo ruta de `admin`, y le paso una func que devuelve true|false si el usuario esta logeado Y es admin
 * @param{AdminIsLogged}
 * <ProtectRoute Component={AdminPanel} path="xxxx" isLogged={AdminIsLogged} />;
 */

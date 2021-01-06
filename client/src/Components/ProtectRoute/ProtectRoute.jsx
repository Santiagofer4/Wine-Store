import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AdminStrain } from '../Admin/LoadCategory/AdminStrain';

function ProtectRoute({ component: Component, isLogged, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged() ? <Component {...props} /> : <Redirect to="/login" />
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

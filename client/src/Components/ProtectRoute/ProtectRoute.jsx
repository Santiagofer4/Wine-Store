import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuthContext } from './authContext';

function ProtectRoute({ component: Component, ...rest }) {
  const authStatus = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        authStatus ? (
          <Component {...props} />
        ) : (
          <Redirect to="/form/user/login" />
        )
      }
    />
  );
}

export default ProtectRoute;

import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import {refreshStatusSelector} from '../../selectors'
import { useAuthContext, useAuthProvider } from '../ProtectRoute/authContext';
import { useDispatch, useSelector } from 'react-redux';


function Logout() {
  const [logged, setLogin] = useState(false);
  const authStatus = useAuthContext();
  const refreshStatus = useSelector(refreshStatusSelector);
 
  useEffect(() => {
   
console.log('RENDERIZANDO', authStatus)
    
  }, [refreshStatus,authStatus ]);
  console.log('RENDERIZANDO A FUERA', authStatus)

  return (
    <>
      {authStatus ? (
        <Container className="Main__content">
          <h1 Post__registerLinks> SEGUIS LOGEADO!!!!</h1>
        </Container>
      ) : (
        <Container className="Main__content">
          <h1 Post__registerLinks> Logout!!!!</h1>
        </Container>
      )}
    </>
  );
}

export default Logout;

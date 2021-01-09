import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import tokenManager from '../utils/tokenManager';
import { isLogged } from '../utils/index';


function Logout() {
  const [logged, setLogin] = useState(false);
  //   const logout = async () => {
  //     console.log('LOGGIN OUT');
  //     const resp = await axios.get('http://localhost:3000/auth/logout');
  //     console.log('RESP', resp, resp.status);
  //     if (resp.status === 200) {
  //       tokenManager.ereaseToken();
  //     }
  //   };
  //   useEffect(logout(), []);
  useEffect(() => {
    // let logged = isLogged();

    
  }, []);

  return (
    <>
      {logged ? (
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

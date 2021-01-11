import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';


function Logout() {
  const [logged, setLogin] = useState(false);
 
  useEffect(() => {
   

    
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

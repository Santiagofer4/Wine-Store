import React, { useEffect } from 'react';
import { tokenSelector, tokenStatusSelector } from '../../selectors';
import { AuthContext, useAuthProvider } from './authContext';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshedToken } from '../../slices/tokenSlice';
import { Container, CircularProgress } from '@material-ui/core';
import { useState } from 'react';

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);
  const tokenStatus = useSelector(tokenStatusSelector);

  const [auth, setAuth] = useState(null);

  const isLogged = (token) => {
    if (!token && tokenStatus === 'idle') {
      console.log('IDLE AND NO TOKEN');
      dispatch(getRefreshedToken());
    }
  };

  useEffect(() => {
    isLogged(token);
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [tokenStatus, dispatch]);

  let display;
  if (tokenSelector === 'loading' && !token) {
    console.log('LOADING AND NO TOKEN');
    display = (
      <Container>
        <h2>Buscando sesion anterior</h2>
        <CircularProgress />
      </Container>
    );
  } else if (tokenSelector === 'failed' && !token) {
    console.log('FAILED AND NO TOKEN');
    display = children;
  } else if (tokenSelector === 'succeded' && token) {
    console.log('SUCCEDED AND TOKEN');
    display = children;
  }
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

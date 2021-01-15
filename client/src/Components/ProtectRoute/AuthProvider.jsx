import React, { useEffect } from 'react';
import { tokenSelector, tryToLoginStatusSelector, refreshStatusSelector } from '../../selectors';
import { AuthContext, useAuthProvider } from './authContext';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshedToken, tryToLogin } from '../../slices/tokenSlice';
import { Container, CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { userLoginStatusSelector } from '../../selectors/index';

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const userStatus = useSelector(userLoginStatusSelector);
  const tryToLoginStatus = useSelector(tryToLoginStatusSelector); //idle
  const [render,setRender]= useState(false)
  const isLogged = () => {
    if (tryToLoginStatus === 'idle') {
      console.log('IDLE AND NO TOKEN');
      console.log('USER STATUS', userStatus);
      dispatch(tryToLogin());
      setRender(true)
    }
  };

  useEffect(() => {
    console.log('TRY TO LOGIN STATUS', tryToLoginStatus);
    isLogged();
  }, [tryToLoginStatus, dispatch, render]);

  if (tryToLoginStatus === 'loading' || userStatus === 'loading') {
    console.log('TRYING TO LOGIN = LOADING');
    return (
      <Container>
        <CircularProgress />
        <CircularProgress />
        <CircularProgress />
        <CircularProgress />
        <CircularProgress />
        <CircularProgress />
      </Container>
    );
  } else if (tryToLoginStatus !== 'succeded' ) {
    console.log('TRYING TO LOGIN = FAILED');
    return (
      <AuthContext.Provider value={false}>{children}</AuthContext.Provider>
    );
  } else if (tryToLoginStatus === 'succeded') {
    console.log('TRYING TO LOGIN = OK');
    return <AuthContext.Provider value={true}>{children}</AuthContext.Provider>;
  }

  return null;
}

export default AuthProvider;

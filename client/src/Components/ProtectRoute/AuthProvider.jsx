import React from 'react';
import { AuthContext, useProvideAuth } from './authContext';

function AuthProvider({ children }) {
  const authStatus = useProvideAuth();
  return (
    <AuthContext.Provider value={authStatus}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

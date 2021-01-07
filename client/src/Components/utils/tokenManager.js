const tokenManager = () => {
  let inMemoryJWT = null;

  const getToken = () => inMemoryJWT;

  const setToken = (token) => {
    inMemoryJWT = token;
    return true;
  };
};

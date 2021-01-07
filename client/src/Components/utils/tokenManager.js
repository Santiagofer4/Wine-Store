import axios from 'axios';
import { baseEndpoint } from '../../constants/endpoints';

const tokenManager = () => {
  console.log('TOKEN MANAGER');
  let logoutEventName = 'logout';
  let refreshEndpoint = 'http://localhost:3000/auth/refresh';
  let inMemoryJWT = null;
  let refreshTimeOutId;
  let isRefreshing = null;

  const setRefreshTokenEndpoint = (endpoint) => (refreshEndpoint = endpoint);

  const setLogoutEventName = (name) => (logoutEventName = name);

  // This listener allows to disconnect another session of react-admin started in another tab
  window.addEventListener('storage', (event) => {
    if (event.key === logoutEventName) {
      inMemoryJWT = null;
    }
  });

  const waitForTokenRefresh = () => {
    if (!isRefreshing) {
      return Promise.resolve();
    }
    return isRefreshing.then(() => {
      isRefreshing = null;
      return true;
    });
  };

  const getRefreshedToken = async () => {
    console.log('GETTING REFRESHED TOKEN');
    try {
      const refreshed_token = await axios.get(refreshEndpoint, {
        withCredentials: true,
      });
      if (refreshed_token.status !== 200) {
        ereaseToken();
        global.console.log('Token renewal failure');
        return { token: null };
      }
      let newToken = refreshed_token.data && refreshed_token.data.refresh_token;
      if (newToken) {
        setToken(newToken.token, newToken.expires);
        return true;
      } else {
        ereaseToken();
        return false;
      }

      console.log('RESPONSE', refreshed_token);
    } catch (error) {
      console.error(error);
      return error;
    }
    // const request = new Request(refreshEndpoint, {
    //   method: 'GET',
    //   headers: new Headers({ 'Content-Type': 'application/json' }),
    //   credentials: 'include',
    // });

    // isRefreshing = fetch(request)
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       ereaseToken();
    //       global.console.log('Token renewal failure');
    //       return { token: null };
    //     }
    //     return response.json();
    //   })
    //   .then(({ token, tokenExpiry }) => {
    //     if (token) {
    //       setToken(token, tokenExpiry);
    //       return true;
    //     }
    //     ereaseToken();
    //     return false;
    //   });

    // return isRefreshing;
  };
  // This countdown feature is used to renew the JWT in a way that is transparent to the user.
  // before it's no longer valid
  const refreshToken = (expires) => {
    console.log('SETTING REFRESH TIMEOUT');
    let delay = expires - 5000;
    refreshTimeOutId = window.setTimeout(getRefreshedToken, 3000);
  };

  const abordRefreshToken = () => {
    if (refreshTimeOutId) {
      window.clearTimeout(refreshTimeOutId);
    }
  };

  const getToken = () => inMemoryJWT;

  const setToken = (token, expires) => {
    console.log('SETTING TOKEN', token, expires);
    inMemoryJWT = token;
    refreshToken(expires);
    return true;
  };

  const logout = () => ereaseToken;

  const ereaseToken = () => {
    console.log('ERASING TOKEN');
    inMemoryJWT = null;
    abordRefreshToken();
    window.localStorage.setItem(logoutEventName, Date.now());
    return true;
  };

  return {
    ereaseToken,
    getToken,
    setLogoutEventName,
    setRefreshTokenEndpoint,
    setToken,
  };
};

export default tokenManager();

/**
 *   logout: () => {
        inMemoryJWT.ereaseToken();
        return Promise.resolve();
    },

      checkAuth: () => {
        console.log('checkAuth');
        if (!inMemoryJWT.getToken()) {
            inMemoryJWT.setRefreshTokenEndpoint('http://localhost:8001/refresh-token');
            return inMemoryJWT.getRefreshedToken().then(tokenHasBeenRefreshed => {
                return tokenHasBeenRefreshed ? Promise.resolve() : Promise.reject();
            });
        } else {
            return Promise.resolve();
        }
    },

Solving O

      login: ({ username, password }) => {
        const request = new Request('http://localhost:8001/authenticate', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
        });
        inMemoryJWT.setRefreshTokenEndpoint('http://localhost:8001/refresh-token');
        return fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token, tokenExpiry }) => inMemoryJWT.setToken(token, tokenExpiry));
    },
 */

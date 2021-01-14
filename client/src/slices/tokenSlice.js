import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { status } from '../constants/helpers';
import { refreshEndpoint } from '../constants/endpoints.js';
import tokenManager from '../Components/utils/tokenManager';

const initialState_token = {
  inMemoryToken: null,
  status: status.idle,
  refreshQueued: false,
  stopRefresh: false,
  delay: 60 * 15 * 1000, //15 min default
  refreshTimeDelta: 5000,
  logoutEventName: '_logout_',
  refreshEndpoint: refreshEndpoint,
  error: null,
};

// window.addEventListener('storage', (event) => {
//   if (event.key === initialState_token.logoutEventName) {
//     removeToken();
//   }
// });

export const getRefreshedToken = createAsyncThunk(
  'token/getRefreshedToken',
  async (_, { rejectWithValue }) => {
    console.log('REFRESHING');
    const refreshed_token = await axios.get(refreshEndpoint, {
      withCredentials: true,
    });
    if (refreshed_token.status !== 200) {
      return rejectWithValue(refreshed_token);
    } else return refreshed_token.data;
  },
  {
    condition: (payload, { getState }) => {
      const { token } = getState();
      console.log('Checking status before fetch', token.status);
      if (
        token.stopRefresh === true ||
        token.status === status.loading ||
        token.status === status.failed
      ) {
        console.log('SHOULD NOT RUN IF TOKEN');
        return false;
      }
    },
  }
);

var delayTimeout;
const delayRefresh = (delay) => {
  return new Promise((resolve) => {
    delayTimeout = window.setTimeout(() => {
      resolve('!!!');
    }, delay);
  });
};

export const setRefreshTokenTimeout = createAsyncThunk(
  'token/refreshTimeout',
  async (payload, { dispatch, getState }) => {
    console.log('SETTING TIMEOUT');
    const state = getState();
    // let delay = state.token.delay;
    let delay = 10000;
    return await delayRefresh(delay);
  }
);

const tokenSlice = createSlice({
  name: 'token',
  initialState: initialState_token,
  reducers: {
    setToken: (state, { payload }) => {
      console.log('SETTING TOKEN REDUX');
      const { token, expires } = payload;
      state.inMemoryToken = token;
      state.delay = expires - state.refreshTimeDelta;
      return;
    },
    eraseToken: (state, action) => {
      console.log('ERASING TOKEN REDUX');

      state.inMemoryToken = null;
      state.refreshQueued = false;
      state.status = status.idle;
      state.stopRefresh = true;
      state.error = null;

      window.localStorage.setItem(state.logoutEventName, Date.now());
      window.clearTimeout(delayTimeout);
    },
    setRefreshQueue: (state, { payload }) => {
      state.refreshQueued = payload;
    },
    setRefreshTimeDelta: (state, { payload }) => {
      state.refreshTimeDelta = payload;
    },
  },
  extraReducers: {
    [getRefreshedToken.pending]: (state, action) => {
      state.status = status.loading;
    },
    [getRefreshedToken.fulfilled]: (state, { payload }) => {
      const { newToken, user } = payload;
      state.status = status.succeded;
      state.inMemoryToken = newToken.token;
      state.delay = newToken.expires - state.refreshTimeDelta;
    },
    [getRefreshedToken.rejected]: (state, { payload }) => {
      state.status = status.failed;
      state.inMemoryToken = null;
      state.refreshQueued = false;
      state.error = payload;
      window.localStorage.setItem(state.logoutEventName, Date.now());
    },
    [setRefreshTokenTimeout.pending]: (state, { payload }) => {
      state.refreshQueued = true;
    },
    [setRefreshTokenTimeout.succeded]: (state, { payload }) => {
      // state.status = status.idle;
      // state.refreshQueued = false;
    },
    [setRefreshTokenTimeout.rejected]: (state, { payload }) => {
      state.status = status.failed;
      state.refreshQueued = false;
      console.log('PAYLOAD', payload);
      state.error = payload;
    },
  },
});

export const { setToken, eraseToken, setRefreshQueue } = tokenSlice.actions;

export default tokenSlice;

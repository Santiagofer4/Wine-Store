import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { status } from '../constants/helpers';
import { refreshEndpoint } from '../constants/endpoints.js';
import tokenManager from '../Components/utils/tokenManager';

const initialState_token = {
  inMemoryToken: null,
  status: status.idle,
  refreshQueued: false,
  delay: 60 * 15 * 1000, //15 min default
  refreshTimeDelta: 5000,
  logoutEventName: '_logout_',
  refreshEndpoint: refreshEndpoint,
  error: null,
};

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
      console.log('ALREADY REFRESHING');
      const { token } = getState();
      if (token.status === status.loading || token.status === status.failed) {
        return false;
      }
    },
  }
);

export const refreshToken = createAsyncThunk(
  'token/refreshTimeout',
  async (payload, { dispatch, getState }) => {
    console.log('SETTING TIMEOUT');
    const state = getState();
    window.setTimeout(dispatch(getRefreshedToken), state.token.delay);
    state.token.refreshQueued = true;
  }
);

const tokenSlice = createSlice({
  name: 'token',
  initialState: initialState_token,
  reducers: {
    setTokenRedux: (state, { payload }) => {
      console.log('SETTING TOKEN REDUX');
      const { token, expires } = payload;
      state.inMemoryToken = token;
      state.delay = expires - state.refreshTimeDelta;
    },
    logout: (state, action) => {
      return;
    },
    eraseToken: (state, action) => {
      console.log('ERASING TOKEN REDUX');
      state.inMemoryToken = null;
      window.localStorage.setItem(state.logoutEventName, Date.now());
      return true;
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
      state.status = status.succeded;
      const { newToken, user } = payload;
      state.inMemoryToken = newToken.token;
      state.delay = newToken.expires = state.refreshTimeDelta;
      //   tokenManager.setToken(newToken.token, newToken.expires);
    },
    [getRefreshedToken.rejected]: (state, { payload }) => {
      state.status = status.failed;
      state.inMemoryToken = null;
      state.error = payload;
      window.localStorage.setItem(state.logoutEventName, Date.now());
      //   tokenManager.eraseToken()
    },
    'user/login/fulfilled': (state, { payload }) => {
      console.log('SETTING TOKEN REDUX');
      const { token } = payload;
      state.inMemoryToken = token.token;
      state.delay = token.expires - state.refreshTimeDelta;
      //   tokenManager.refreshToken(token.expires);
    },
  },
});

export const { setTokenRedux, eraseToken } = tokenSlice.actions;

export default tokenSlice;

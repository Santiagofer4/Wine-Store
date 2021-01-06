import { responsiveFontSizes } from '@material-ui/core';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  UserLoginEndpoint,
  addUserEndpoint,
  authLoginEndpoint,
  userOrdersEndpoint,
} from '../constants/endpoints';
import { status } from '../constants/helpers';

const initialState_user = {
  user: {
    info: {},
    orders: {},
    status: 'idle',
    error: null,
  },
};

export const createUser = createAsyncThunk('user/register', async (payload) => {
  const { user, formik } = payload;
  const user_response = await axios.post(addUserEndpoint, user);
  const resPayload = {
    userRegister_response: user_response.data,
    formik,
  };
  return resPayload;
});

export const postUserLogin = createAsyncThunk('user/login', async (payload) => {
  const { user, formik } = payload;
  const userLogin_response = await axios.post(authLoginEndpoint, user);
  const resPayload = {
    userLogin_response: userLogin_response.data,
    formik,
  };

  return resPayload;
});

export const userOrders = createAsyncThunk('user/getUserOrders', async (id) => {
  const resp = await axios.get(userOrdersEndpoint + id + '/orders');
  return resp;
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState_user,
  reducers: {},
  extraReducers: {
    [createUser.pending]: (state, action) => {
      state.user.status = status.loading;
    },
    [createUser.fulfilled]: (state, { payload }) => {
      const { userRegister_response, formik } = payload;
      state.user.status = status.succeded;
      state.user.info = userRegister_response.user;
      localStorage.setItem('token', userRegister_response.token.token);
      formik.resetForm();
    },
    [createUser.rejected]: (state, action) => {
      const infoComplete = action.meta.arg;
      const info = {
        formik: infoComplete.formik,
        user: {
          email: infoComplete.user.email,
        },
      };
      state.user.status = status.failed;
      state.user.error = action.error;
      state.user.info = info;
    },
    [postUserLogin.pending]: (state, action) => {
      state.user.status = status.loading;
    },
    [postUserLogin.fulfilled]: (state, { payload }) => {
      const { userLogin_response, formik } = payload;
      state.user.status = status.succeded;
      state.user.info = userLogin_response.user;
      localStorage.setItem('token', userLogin_response.token.token);
      formik.resetForm();
    },
    [postUserLogin.rejected]: (state, action) => {
      state.user.status = status.failed;
      state.user.error = action.error;
    },
    [userOrders.pending]: (state, action) => {
      state.user.status = status.loading;
    },
    [userOrders.fulfilled]: (state, { payload }) => {
      state.user.status = status.succeded;
      state.user.orders = payload.data;
      console.log('PAYLOAD.DATA USER ORDERS', payload.data);
    },
    [userOrders.rejected]: (state, action) => {
      state.user.status = status.failed;
      state.user.error = action.error;
    },
  },
});

export default userSlice;

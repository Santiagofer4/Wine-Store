import { responsiveFontSizes } from '@material-ui/core';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  usersEndpoint,
  UserLoginEndpoint,
  addUserEndpoint,
  authLoginEndpoint,
} from '../constants/endpoints';
import { status } from '../constants/helpers';

const initialState_user = {
  user: {
    info: {},
    status: 'idle',
    error: null,
  },
};

export const createUser = createAsyncThunk('user/register', async (payload) => {
  const { user, formik } = payload;
  const user_response = await axios.post(addUserEndpoint, user);
  const resPayload = {
    user_response: user_response.data.user,
    formik,
  };
  return resPayload;
});

export const postUserLogin = createAsyncThunk('user/login', async (payload) => {
  const { user, formik } = payload;
  const userLogin_response = await axios.post(authLoginEndpoint, user);
  console.log('RESPONSe', userLogin_response);
  const resPayload = {
    userLogin_response: userLogin_response.data,
    formik,
  };
  return resPayload;
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
      const { user_response, formik } = payload;
      state.user.status = status.succeded;
      state.user.info = user_response;
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
      state.user.info = userLogin_response;
      formik.resetForm();
    },
    [postUserLogin.rejected]: (state, action) => {
      state.user.status = status.failed;
      state.user.error = action.error;
    },
  },
});

export default userSlice;

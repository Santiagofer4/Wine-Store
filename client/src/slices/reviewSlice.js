import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    addUserReviewEndpoint,
} from '../constants/endpoints';
import { status } from '../constants/helpers';

const initialState_review = {
    reviews: {
      info: {},
      exito: "",
      status: 'idle',
      error: null,
    },
  };
  
  export const createReview = createAsyncThunk('review/create', async (payload) => {
    const review_response = await axios.post(addUserReviewEndpoint + payload.productId, payload);
    return review_response;
  });
  
/*   export const postUserLogin = createAsyncThunk('user/login', async (payload) => {
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
  }); */
  
  const reviewSlice = createSlice({
    name: 'review',
    initialState: initialState_review,
    reducers: {},
    extraReducers: {
      [createReview.pending]: (state, action) => {
        state.reviews.status = status.loading;
      },
      [createReview.fulfilled]: (state, { payload }) => {
        state.reviews.status = status.succeded;
        state.reviews.exito = payload;
      },
      [createReview.rejected]: (state, action) => {
        state.reviews.status = status.failed;
        state.reviews.error = action.error;
      },
    },
  });
  
  export default reviewSlice;
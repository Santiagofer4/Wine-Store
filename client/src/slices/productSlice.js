import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAllProdsEndpoint } from '../constants/endpoints';
import { status } from '../constants/helpers';

const initialState_product = {
  allProducts: {
    list: [],
    status: 'idle',
    error: null,
  },
};

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async () => {
    const resp = await axios.get(getAllProdsEndpoint);
    return resp;
  }
);

const productsSlice = createSlice({
  name: 'product',
  initialState: initialState_product,
  reducers: {
    addWine: (state, action) => {
      const { wine } = action.payload;
      state.allProducts.list.concat(wine);
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state, action) => {
      state.allProducts.status = status.loading;
    },
    [getAllProducts.fulfilled]: (state, { payload }) => {
      state.allProducts.status = status.succeded;
      state.allProducts.list = payload.data;
    },
    [getAllProducts.rejected]: (state, action) => {
      state.allProducts.status = status.failed;
      state.allProducts.error = action.error;
    },
  },
});

export default productsSlice;

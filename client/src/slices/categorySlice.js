import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  getAllCatsEndpoint,
  getAllProdsByCategoryEnpoint,
} from '../constants/endpoints';
import { status } from '../constants/helpers';

const initialState_product = {
  allCategories: {
    list: [],
    status: 'idle',
    error: null,
  },
  allProdsByCategory: {
    taste: '',
    list: [],
    status: 'idle',
    error: null,
  },
};

export const getAllCategories = createAsyncThunk(
  'category/getAllCategories',
  async () => {
    const resp = await axios.get(getAllCatsEndpoint);
    return resp;
  }
);

export const getAllProdsByCategory = createAsyncThunk(
  'category/getAllProdsByCategory',
  async (categoryName) => {
    const resp = await axios.get(getAllProdsByCategoryEnpoint + categoryName);
    return resp;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState_product,
  reducers: {
    addCategory: (state, action) => {
      const { wine } = action.payload;
      state.allCategories.list.concat(wine);
    },
  },
  extraReducers: {
    [getAllCategories.pending]: (state, action) => {
      state.allCategories.status = status.loading;
    },
    [getAllCategories.fulfilled]: (state, { payload }) => {
      state.allCategories.status = status.succeded;
      state.allCategories.list = payload.data;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.allCategories.status = status.failed;
      state.allCategories.error = action.error;
    },
    [getAllProdsByCategory.pending]: (state, action) => {
      state.allProdsByCategory.status = status.loading;
    },
    [getAllProdsByCategory.fulfilled]: (state, { payload }) => {
      state.allProdsByCategory.status = status.succeded;
      state.allProdsByCategory.list = payload.data[0].products;
      state.allProdsByCategory.taste = payload.data[0].taste;
    },
    [getAllProdsByCategory.rejected]: (state, action) => {
      state.allProdsByCategory.status = status.failed;
      state.allProdsByCategory.error = action.error;
    },
  },
});

export default categorySlice;

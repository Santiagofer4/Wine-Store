import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAllCatsEndpoint } from '../constants/endpoints';
import { status } from '../constants/helpers';

const initialState_product = {
  allCategories: {
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

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState_product,
  reducers: {
    addWine: (state, action) => {
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
  },
});

export default categorySlice;

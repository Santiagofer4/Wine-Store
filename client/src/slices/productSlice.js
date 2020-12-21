import { SnackbarContent } from '@material-ui/core';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAllProdsEndpoint } from '../constants/endpoints';
import { status } from '../constants/helpers';
import { getAllCategories } from './categorySlice';
import { Component } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';

const initialState_product = {
  allProducts: {
    list: [],
    status: 'idle',
    error: null,
  },
  vinoEncontrado: '',
};

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
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
    findWine: (state, action) => {
      const { wineAencontrar } = action.payload;
      const vinoEncontrado = state.allProducts.list.find(
        (wine) => wine.id === wineAencontrar
      );
      if (vinoEncontrado) {
        state.vinoEncontrado = vinoEncontrado;
      }
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

export const { findWine, addWine, OTRO_REDUCER } = productsSlice.actions;

export default productsSlice;

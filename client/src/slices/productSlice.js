import { SnackbarContent } from '@material-ui/core';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { productEndpoint, searchProductEndpoint } from '../constants/endpoints';
import { status } from '../constants/helpers';
import { getAllCategories } from './categorySlice';
import { Component } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import { thunk } from 'redux-thunk';
import { setWineDetailAsync } from './productDetailSlice';

const initialState_product = {
  allProducts: {
    list: [],
    status: 'idle',
    error: null,
    lastAdded: {},
  },
  vinoEncontrado: '',
};

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async () => {
    const resp = await axios.get(productEndpoint);
    return resp;
  }
);

export const postNewProduct = createAsyncThunk(
  'product/postNewProduct',
  async ({ product, formik }, thunkApi) => {
    const newProd = await axios.post(productEndpoint, product);
    // await thunkApi.dispatch(setWineDetailAsync(product));
    const payload = {
      newProd: newProd.data,
      formik,
    };
    return payload;
  }
);

export const getProductSearch = createAsyncThunk(
  'product/getProductSearch',
  async (inputSearch) => {
    //console.log('INPUT SEARCH', inputSearch);
    //console.log('ENDPOINT', searchProductEndpoint + `${inputSearch}`);
    const resp = await axios.get(searchProductEndpoint + `${inputSearch}`);
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
    [getProductSearch.pending]: (state, action) => {
      state.allProducts.status = status.loading;
    },
    [getProductSearch.fulfilled]: (state, { payload }) => {
      state.allProducts.status = status.succeded;
      state.allProducts.list = payload.data;
    },
    [getProductSearch.rejected]: (state, action) => {
      state.allProducts.status = status.failed;
      state.allProducts.error = action.error;
    },
    [postNewProduct.pending]: (state, action) => {
      state.allProducts.status = status.loading;
    },
    [postNewProduct.fulfilled]: (state, action) => {
      const { formik, newProd } = action.payload;
      state.allProducts.status = status.succeded;
      state.allProducts.list.push(newProd);
      state.allProducts.lastAdded = newProd;
      formik.resetForm();
    },
    [postNewProduct.rejected]: (state, action) => {
      state.allProducts.status = status.failed;
      state.allProducts.error = action.error;
    },
  },
});

export const { findWine, addWine } = productsSlice.actions;

export default productsSlice;

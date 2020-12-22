import { SnackbarContent } from '@material-ui/core';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getAllProdsEndpoint ,getAllProductsCartEnpoint } from '../constants/endpoints';
import { status } from '../constants/helpers';
import { getAllCategories } from './categorySlice';
import { Component } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';

const initialState_product = {
  allProductsCart: {
    list: [],
    userId:0,
    status: 'idle',
    error: null,
  }
};

export const getAllProductsCart = createAsyncThunk(
  'product/getAllProductsCart',
  async (id) => {
    const resp = await axios.get(getAllProductsCartEnpoint + id + '/cart');
    return resp;
  }
);

  const productsCartSlice = createSlice({
  name: 'productsCart',
  initialState: initialState_product,
  reducers: {
    // desde el back se debe buscar la orderId para guardar los datos en la DB 
    // http://localhost:3000/users/${id}/cart esta ruta debe deberia devolver un objeto con {id, price ,quantity, image,name }
    // para facilitar el manejo sincronico del estado 
      addToCart(state,action){
        console.log('jajaja', action.payload.productDetail)
         const {id,price, image, name} = action.payload.productDetail
         let obj = state.allProductsCart.list.find(e => e.id === id);
         state.allProductsCart.userId =action.payload.userId
         if( !obj){
          state.allProductsCart.list.push({id, price, image, name, quantity: 1})
         }else{
           let index = state.allProductsCart.list.findIndex( e => e.id === action.payload.productDetail.id)
           state.allProductsCart.list[index] = { id, price, image, name, quantity: obj.quantity +1}
         }        
      }
  },
  extraReducers: {
    [getAllProductsCart.pending]: (state, action) => {
      state.allProductsCart.status = status.loading;
    },
    [getAllProductsCart.fulfilled]: (state, { payload }) => {
      state.allProductsCart.status = status.succeded;
      state.allProductsCart.list = payload.data[0].orderLines;
    },
    [getAllProductsCart.rejected]: (state, action) => {
      state.allProductsCart.status = status.failed;
      state.allProductsCart.error = action.error;
    },
  },
});

export const { addToCart} = productsCartSlice.actions;

export default productsCartSlice;

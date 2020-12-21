import { SnackbarContent } from '@material-ui/core';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch, useSelector  } from 'react-redux';
import { getAllProdsEndpoint } from '../constants/endpoints';
import { status } from '../constants/helpers';
import { getAllCategories } from './categorySlice';
import { Component } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import { allProductsSelector } from '../selectors';

const initialState_product = {
  wineDetail: {
    wine:{},
  },
};



const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: initialState_product,
  reducers: {
    wineDetails(state,action){  
        state.wine = action.payload
        }
  },
});
 export const {wineDetails} = productDetailSlice.actions
export default productDetailSlice;

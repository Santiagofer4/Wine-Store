import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tokenManager from '../Components/utils/tokenManager';
import { getOrderTableEndpoint } from '../constants/endpoints';
import { status } from '../constants/helpers';

const initialState_orders = {
    orderTable: {
      orders: [],
      userId:0,
      status: 'idle',
      sync:false,
      error: null,
    }
  };
  
  export const getOrderTable = createAsyncThunk(
    'orders/getOrderTable',
    async () => {
      const resp = await axios.get(getOrderTableEndpoint, {headers: {"Authorization": tokenManager.getToken()}});
      //console.log("Hola", tokenManager.getToken());
      return resp;
    }
  );

  const orderTableSlice = createSlice({
    name: 'orderTable',
    initialState: initialState_orders,
    reducers: {},
    extraReducers: {
      [getOrderTable.pending]: (state, action) => {
        state.orderTable.status = status.loading;
      },
      [getOrderTable.fulfilled]: (state, { payload }) => {
        state.orderTable.status = status.succeded;
        state.orderTable.orders = payload.data;
      },
      [getOrderTable.rejected]: (state, action) => {
        state.orderTable.status = status.failed;
        state.orderTable.error = action.error;
      }
    },
  });
  
  export default orderTableSlice;
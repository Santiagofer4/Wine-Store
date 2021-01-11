import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getAllProductsCartEnpoint,
  usersEndpoint,
} from '../constants/endpoints';
import { status } from '../constants/helpers';

const initialState_product = {
  allProductsCart: {
    list: [],
    userId: 0,
    orderId: null,
    status: 'idle',
    sync: false,
    error: null,
  },
};

export const getAllProductsCart = createAsyncThunk(
  'cart/getAllProductsCart',
  async (id) => {
    const resp = await axios.get(getAllProductsCartEnpoint + id + '/cart');
    let cart_response = {
      resp,
      id,
    };
    return cart_response;
  }
);

export const postProductToCart = createAsyncThunk(
  'cart/postProductToCart',
  async (payload, thunkApi) => {
    // console.log('PAYLOAD', payload)
    const { userId, detail, increment } = payload;
    const cart_item = await axios.post(
      usersEndpoint + userId + '/cart',
      payload
    );
    increment
      ? thunkApi.dispatch(AddProductToCart({ name: detail.name }))
      : thunkApi.dispatch(RemoveProductFromCart({ name: detail.name }));

    const resPayload = {
      increment,
      detail,
      order: cart_item.data.newOrder,
      orderLine: cart_item.data.newOrderLine,
    };
    return resPayload;
  }
);

export const deleteAllProductsFromCart = createAsyncThunk(
  'cart/deleteProductFromCart',
  async (payload, thunkApi) => {
    const { userId } = payload;
    const deleted_cart = await axios.delete(usersEndpoint + userId + '/cart');
    return deleted_cart;
  }
);

export const deleteSingleProdFromCart = createAsyncThunk(
  'cart/deleteSingleProdFromCart',
  async (payload, thunkApi) => {
    const { productId, userId } = payload;
    const deleted_item = await axios.delete(
      usersEndpoint + userId + '/cart/' + productId
    );
    thunkApi.dispatch(DeleteProductFromCart({ name: payload.name }));
    const resPayload = {
      deleted_item,
      productId,
    };
    return resPayload;
  }
);

const productsCartSlice = createSlice({
  name: 'cart',
  initialState: initialState_product,
  reducers: {
    sync(state, action) {
      state.allProductsCart.sync = action.payload;
    },
    cartGuest(state, action) {
      // Pisa el estado con lo que está en el localStorage
      // console.log('ACTION', action);
      state.allProductsCart.status = 'succeded';
      state.allProductsCart.list =
        action.payload !== null ? action.payload : [];
    },
    logout(state, action) {
      state.allProductsCart.list = [];
      state.allProductsCart.userId = 0;
      state.allProductsCart.orderId = null;
      state.allProductsCart.status = 'idle';
      state.allProductsCart.sync = false;
      state.allProductsCart.error = null;
      // state.allProductsCart = initialState_product;
    },
    login(state, action) {
      state.allProductsCart.userId = action.payload;
    },

    resetState(state, action) {
      state.allProductsCart.list = [];
      state.allProductsCart.orderId = null;
      state.allProductsCart.status = 'idle';
      state.allProductsCart.sync = false;
      state.allProductsCart.error = null;
      // state.allProductsCart = initialState_product;
    },
    AddProductToCart: (state, { payload }) => {
      // console.log('add to guest cart', payload);
      return;
    },
    RemoveProductFromCart: (state, { payload }) => {
      // console.log('remove from guest cart', payload);
      return;
    },
    DeleteProductFromCart: (state, { payload }) => {
      // console.log('delete from guest cart', payload);
      return;
    },
  },
  extraReducers: {
    [getAllProductsCart.pending]: (state, action) => {
      state.allProductsCart.status = status.loading;
    },
    [getAllProductsCart.fulfilled]: (state, { payload }) => {
      state.allProductsCart.list = [];
      // console.log('DATOS ORDERLINE', payload.resp.data[0].orderLines);
      state.allProductsCart.status = status.succeded;
      payload.resp.data[0] &&
        payload.resp.data[0].orderLines.map((e, i) => {
          //console.log('DATOS ORDERLINE NRO ORDEN??', e.orderId);
          state.allProductsCart.orderId = e.orderId;
          state.allProductsCart.list.push({
            id: e.product.id,
            quantity: e.quantity,
            price: e.product.price,
            description: e.product.description,
            name: e.product.name,
            stock: e.product.stock,
            image: e.product.image,
            productId: e.productId,
          });
        });
      state.allProductsCart.userId = payload.id;
    },
    [getAllProductsCart.rejected]: (state, action) => {
      state.allProductsCart.status = status.failed;
      state.allProductsCart.error = action.error;
    },
    [deleteAllProductsFromCart.pending]: (state, action) => {
      state.allProductsCart.status = status.loading;
    },
    [deleteAllProductsFromCart.fulfilled]: (state, action) => {
      state.allProductsCart.status = status.succeded;
      state.allProductsCart.sync = true;
      state.allProductsCart.list = [];
      state.allProductsCart.orderId = null;
    },
    [deleteAllProductsFromCart.rejected]: (state, action) => {
      state.allProductsCart.status = status.failed;
      state.allProductsCart.error = action.error;
    },
    [deleteSingleProdFromCart.pending]: (state, action) => {
      state.allProductsCart.status = status.loading;
    },
    [deleteSingleProdFromCart.fulfilled]: (state, { payload }) => {
      state.allProductsCart.status = status.succeded;
      state.allProductsCart.sync = true;
      state.allProductsCart.list = state.allProductsCart.list.filter(
        ({ productId }) => productId !== payload.productId
      );
    },
    [deleteSingleProdFromCart.rejected]: (state, action) => {
      state.allProductsCart.status = status.failed;
      state.allProductsCart.error = action.error;
    },
    [postProductToCart.pending]: (state, action) => {
      state.allProductsCart.status = status.loading;
    },
    [postProductToCart.fulfilled]: (state, { payload }) => {
      const { order, orderLine, detail, increment } = payload;
      let idx;
      // console.log('PAYLOAD', payload)
      state.allProductsCart.status = status.succeded;
      // state.allProductsCart.sync = true;
      state.allProductsCart.userId = order.userId;
      // console.log( 'ORDERLINE PRODUCTID',orderLine.productId)
      const cartItem = state.allProductsCart.list.find(
        ({ productId }) => productId === orderLine.productId
      );
      if (cartItem) {
        idx = state.allProductsCart.list.findIndex(
          ({ productId }) => productId === orderLine.productId
        );
      }
      if (increment) {
        // console.log('CARTITEM', cartItem)
        if (!cartItem) {
          console.log('DETALLE', orderLine);
          state.allProductsCart.list.push({ ...orderLine, ...detail });
        } else {
          if (
            state.allProductsCart.list[idx].stock >
            state.allProductsCart.list[idx].quantity
          ) {
            state.allProductsCart.list[idx].quantity++;
          }
        }
      } else {
        state.allProductsCart.list[idx].quantity--;
      }
    },
    [postProductToCart.rejected]: (state, action) => {
      state.allProductsCart.status = status.failed;
      state.allProductsCart.error = action.error;
    },
  },
});

export const {
  addToCart,
  sync,
  refresh,
  logout,
  login,
  resetState,
  subtractToCart,
  deleteFromCart,
  deleteCart,
  cartGuest,
  AddProductToCart,
  RemoveProductFromCart,
  DeleteProductFromCart,
} = productsCartSlice.actions;

export default productsCartSlice;

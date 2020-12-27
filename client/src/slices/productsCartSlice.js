import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAllProductsCartEnpoint, postProductsCardEnpoint, deleteProductCarEnpoint } from '../constants/endpoints';
import { status } from '../constants/helpers';

const initialState_product = {
  allProductsCart: {
    list: [],
    userId:0,
    status: 'idle',
    sync:false,
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
export const postProductsCar = createAsyncThunk(
  'product/postProductsCard',
  async ( producto) => {
    let {id , price,quantity } = producto.e
    const resp = await axios.post(postProductsCardEnpoint + producto.userId + '/cart',{ id, price, quantity });
    return resp;
  }
);
export const deleteProductCar = createAsyncThunk(
  'product/deleteProductsCard',
  async ( producto) => {
    let {id , userId } = producto
    const resp = await axios.delete(deleteProductCarEnpoint + userId + '/cart/' + id);
    return resp;
  }
);
export const deleteProductsCart = createAsyncThunk(
  'cart/delateCartofUser',
  async ( userId ) => {
    const resp = await axios.delete(deleteProductCarEnpoint + userId + '/cart/')
    return resp;
  }
);

  const productsCartSlice = createSlice({
  name: 'productsCart',
  initialState: initialState_product,
  reducers: {
      addToCart(state,action){
        const {id,price, image, name, stock} = action.payload.productDetail
         let obj = state.allProductsCart.list.find(e => e.id === id);
         state.allProductsCart.userId =action.payload.userId
         if( !obj){
           
           state.allProductsCart.list.push({id, price, image, name, quantity: 1, stock})
          }else{
            
           let index = state.allProductsCart.list.findIndex( e => e.id === id)
           state.allProductsCart.list[index].quantity++
         }        
      },
      sync(state,action){
        state.allProductsCart.sync = action.payload
      },
      subtractToCart(state, action){
        const  id = action.payload;
        let obj = state.allProductsCart.list.findIndex(e => e.id === id);
        if(state.allProductsCart.list[obj].quantity === 1){
          state.allProductsCart.list = state.allProductsCart.list.filter(e => e.id !== id)
        }else{
          let index = state.allProductsCart.list.findIndex( e => e.id === id)
          state.allProductsCart.list[index].quantity--

        }
      },
      deleteFromCart(state,action){
        const id = action.payload;
        state.allProductsCart.list = state.allProductsCart.list.filter(e => e.id !== id)
      },
      deleteCart(state,action){
        state.allProductsCart.list = []
      }
  },
  extraReducers: {
    [getAllProductsCart.pending]: (state, action) => {
      state.allProductsCart.status = status.loading;
    },
    [getAllProductsCart.fulfilled]: (state, { payload }) => {
      state.allProductsCart.status = status.succeded;
      payload.data[0] &&  payload.data[0].orderLines.map((e, i)=>{ 
        state.allProductsCart.list.push({ id: e.product.id, quantity: e.quantity, price: e.product.price, description: e.product.description, name: e.product.name, stock: e.product.stock, image:e.product.image }) 
      });
    },
    [getAllProductsCart.rejected]: (state, action) => {
      state.allProductsCart.status = status.failed;
      state.allProductsCart.error = action.error;
    },
    [postProductsCar.pending]: (state, action) => {
      state.allProductsCart.status = status.loading;
    },
    [postProductsCar.fulfilled]: (state, { payload }) => {
      state.allProductsCart.status = status.succeded;
    },
    [postProductsCar.rejected]: (state, action) => {
      state.allProductsCart.status = status.failed;
      state.allProductsCart.error = action.error;
    },
  },
});

export const { addToCart , sync, subtractToCart, deleteFromCart, deleteCart} = productsCartSlice.actions;

export default productsCartSlice;

import React from 'react';
import { Button } from '@material-ui/core';
import { enqueueSnackbar, closeSnackbar } from '../slices/notificationSlice';
import {
  AddProductToCart,
  RemoveProductFromCart,
  DeleteProductFromCart,
  postProductToCart,
  deleteSingleProdFromCart,
  deleteAllProductsFromCart,
  modificateOrder,
} from '../slices/productsCartSlice';
import { persistUserLogin, userPromote } from '../slices/userSlice';
import {
  setRefreshTokenTimeout,
  setToken,
  getRefreshedToken,
  eraseToken,
  setRefreshQueue,
  setTryToLoginStatus,
  setStopRefreshFalse,
} from '../slices/tokenSlice';
import { status } from '../constants/helpers';

export const notificationMiddleware = (store) => (next) => (action) => {
  const dispatch = store.dispatch;
  const listenArray = [
    AddProductToCart.type,
    RemoveProductFromCart.type,
    DeleteProductFromCart.type,
    userPromote.fulfilled.type,
    modificateOrder.fulfilled.type,
    // postProductToCart.fulfilled.type,
    // deleteSingleProdFromCart.fulfilled.type,
    // deleteAllProductsFromCart.fulfilled.type,
  ];
  const snackbarContent = {
    message: '',
    options: {
      key: new Date().getTime() + Math.random(),
      variant: 'info',
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      action: (key) => (
        <Button onClick={() => dispatch(closeSnackbar(key))}>X</Button>
      ),
    },
  };
  if (listenArray.includes(action.type)) {
    //cuando agrego producto al carrito
    if (action.type.includes('Add')) {
      snackbarContent.message = `Se agrego ${action.payload.name} al carrito`;
      snackbarContent.options.variant = 'success';
    }
    //cuando ELIMINO un producto con todas las unidades del carrito
    else if (action.type.includes('Delete')) {
      snackbarContent.message = `Se elimino ${action.payload.name} del carrito`;
      snackbarContent.options.variant = 'error';
    }
    //cuando saco UNA UNIDAD de un producto del carrito
    else if (action.type.includes('Remove')) {
      snackbarContent.message = `Se quito (un) ${action.payload.name} del carrito`;
      snackbarContent.options.variant = 'warning';
    } else if (action.type.includes('user')) {
      snackbarContent.message = `Se promovio el usuario a ADMIN`;
      snackbarContent.options.variant = 'success';
    } else if (action.type.includes('modificateOrder')) {
      const { myCart, status } = action.payload;

      snackbarContent.message = `La orden N°${myCart} ha sido cambiada al estado ${status.toUpperCase()}`;
      snackbarContent.options.variant = 'success';
    }
    store.dispatch(enqueueSnackbar(snackbarContent));
  }

  return next(action);
};

export const tokenMiddleware = (store) => (next) => (action) => {
  const { dispatch } = store;
  let ACTION_TYPE = action.type;
  switch (ACTION_TYPE) {
    case 'user/login/fulfilled': {
      const { token } = action.payload;
      dispatch(persistUserLogin(action.payload.userLogin_response));
      dispatch(setToken(token));
      dispatch(setStopRefreshFalse());
      dispatch(setRefreshTokenTimeout());
      dispatch(setTryToLoginStatus(status.succeded));
      break;
    }
    case 'user/register/fulfilled': {
      const { token } = action.payload;
      dispatch(persistUserLogin(action.payload.userLogin_response));
      dispatch(setToken(token));
      dispatch(setStopRefreshFalse());
      dispatch(setRefreshTokenTimeout());
      dispatch(setTryToLoginStatus(status.succeded));
      break;
    }
    case 'token/tryToLogin/fulfilled': {
      // console.log('PAYLOAD TRY TO LOGIN OK', action.payload);
      const { newToken } = action.payload;
      dispatch(persistUserLogin(action.payload));
      dispatch(setToken(newToken));
      dispatch(setRefreshTokenTimeout());
      break;
    }
    case 'token/refreshTimeout/fulfilled':
      dispatch(setRefreshQueue(false));
      dispatch(getRefreshedToken());
      break;
    case 'token/getRefreshedToken/fulfilled':
      dispatch(persistUserLogin(action.payload));
      dispatch(setRefreshTokenTimeout());
      break;
    case 'user/logout/fulfilled':
      dispatch(eraseToken());
      dispatch(setTryToLoginStatus(status.idle));
      break;
    case 'token/getRefreshedToken/rejected':
      dispatch(eraseToken());
    default:
      break;
  }
  return next(action);
};

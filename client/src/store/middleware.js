import React from 'react';
import { Button } from '@material-ui/core';
import { enqueueSnackbar, closeSnackbar } from '../slices/notificationSlice';
import {
  guestAddProductToCart,
  guestRemoveProductFromCart,
  guestDeleteProductFromCart,
  postProductToCart,
  deleteSingleProdFromCart,
  deleteAllProductsFromCart,
} from '../slices/productsCartSlice';

export const notificationMiddleware = (store) => (next) => (action) => {
  const dispatch = store.dispatch;
  const [SLICE, ACTION] = action.type.split('/');
  const listenArray = [
    guestAddProductToCart.type,
    guestRemoveProductFromCart.type,
    guestDeleteProductFromCart.type,
    postProductToCart.typePrefix,
    deleteSingleProdFromCart.typePrefix,
    deleteAllProductsFromCart.typePrefix,
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
    if (action.type.includes('Add') || action.type.includes('post')) {
      snackbarContent.message = `Se agrego ${action.payload.name} al carrito`;
      snackbarContent.options.variant = 'success';
    }
    //cuando ELIMINO un producto con todas las unidades del carrito
    else if (
      action.type.includes('deleteProduct') ||
      action.type.includes('guestDelete')
    ) {
      snackbarContent.message = `Se elimino ${action.payload.name} del carrito`;
      snackbarContent.options.variant = 'error';
    }
    //cuando saco UNA UNIDAD de un producto del carrito
    else if (
      action.type.includes('Remove') ||
      action.type.includes('deleteSingle')
    ) {
      snackbarContent.message = `Se quito (un) ${action.payload.name} del carrito`;
      snackbarContent.options.variant = 'warning';
    }
    store.dispatch(enqueueSnackbar(snackbarContent));
  }

  return next(action);
};

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { myCartSelector, allProductsCartSelector, userSelector, } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { total } from '../utils/index';
import { getAllProductsCart } from '../../slices/productsCartSlice';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function FinCompra(props) {
  const classes = useStyles();
  const myCart = useSelector(myCartSelector);
 
 
  return (
    
     <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Muchas gracias por su compra!
                </Typography>
                <Typography variant="subtitle1">
                  Su número de orden es {myCart.orderId}
                </Typography>
              </React.Fragment>
   
  );
}

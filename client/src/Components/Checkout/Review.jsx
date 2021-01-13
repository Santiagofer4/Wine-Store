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
import axios from 'axios';


//falta renderizar el carrito desde la DB, para evitar que se borre al recargar

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

export default function Review() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
 


  let addressInfoStorage = JSON.parse(localStorage.getItem('addressInfo'));
const [addressInfo, setAddressInfo] = React.useState({  
            firstName: addressInfoStorage.firstName,
            lastName: addressInfoStorage.lastName,
            address1: addressInfoStorage.address1,
            address2: addressInfoStorage.address2,
            city: addressInfoStorage.city,
            stateAddress: addressInfoStorage.stateAddress,
            zip: addressInfoStorage.zip,
            country: addressInfoStorage.country,
  });
  
  let paymentInfoStorage = JSON.parse(localStorage.getItem('paymentInfo'));
  const [paymentInfo, setPaymentInfo] = React.useState({  
              cardName: paymentInfoStorage.cardName,
              cardNumber: paymentInfoStorage.cardNumber,
              expDate: paymentInfoStorage.expDate,
              cvv: paymentInfoStorage.cvv,
            
    });
    const addresses = [
      //Info del formulario anterior
    ];
    const payments = [
      //Info del formulario anterior
      { name: 'Tarjeta', detail: 'VISA' },
      { name: 'Titular', detail: paymentInfo.cardName },
      { name: 'Número de Tarjeta', detail: paymentInfo.cardNumber },
      { name: 'Válida hasta:', detail: paymentInfo.cvv },
    ];
 // const name = document.getElementById('firstName').value;
  const classes = useStyles();
  const AllProductsCart = useSelector(allProductsCartSelector);
  const myCart = useSelector(myCartSelector);
  const [subTotal, setSubTotal] = useState(0);
  //var total = 0;


  
  
  useEffect(() => {
    // console.log('ID cart', myCart.orderId)
    // axios.get(`http://localhost:3000/orders/total/${myCart.orderId}`)
    // .then(response => {
    //  let total = response.data;
    //   console.log('TOTAL', total)
    // })
    // .catch(e => {
    //     // Podemos mostrar los errores en la consola
    //     console.log(e);
    // })
    // console.log('TOTAL 2', total)
  }, []);
  return (
    <React.Fragment>
      
      <Typography variant="h6" gutterBottom>
        Resumen de orden{' '}
      </Typography>
      <List disablePadding>
        {AllProductsCart.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.quantity} />
            <Typography variant="body2">{product.price * product.quantity}</Typography>
          </ListItem>
        ))}
             <ListItem className={classes.listItem}>
          <ListItemText secondary="SubTotal" />
               <Typography variant="body2">
        { total(AllProductsCart)}
        
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText secondary="IVA" />
               <Typography variant="body2">
               {Math.ceil((total(AllProductsCart) * 21) / 100)}
        
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
               <Typography variant="subtitle1" className={classes.total}>
        { Math.ceil((total(AllProductsCart) * 121) / 100)}
                 </Typography>
        </ListItem>
       
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Envio{' '}
          </Typography>
          <Typography gutterBottom>{addressInfo.firstName + ' ' + addressInfo.lastName}</Typography>
          <Typography gutterBottom>{addressInfo.address1 + ' ' + addressInfo.address2 + ', ' + addressInfo.city
          + ', ' + addressInfo.stateAddress + ', ' + addressInfo.country + '. CP: ' + addressInfo.zip
          
          }</Typography>
          </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Detalle de pago{' '}
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Paper,
  Stepper,
  Step,
  makeStyles,
  StepLabel,
  Button,
  Typography,
} from '@material-ui/core';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useDispatch, useSelector } from 'react-redux';
import {
  allProductsCartSelector,
  userSelector,
  myCartSelector,
} from '../../selectors/index';
import {
  modificateOrder,
  resetCart,
  postProductToCart,
} from '../../slices/productsCartSlice';
import {
  deleteAddressInfo,
  deletePaymentInfo,
} from '../../Components/utils/index';
import { sendEmail } from '../../slices/userSlice';
import { total } from '../utils/index';
import axios from 'axios';

// Estilos de los "steps" del checkout

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Direccion de envio', 'Detalles de pago', 'Verificar la orden'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Paso incorrecto');
  }
}

export default function Checkout() {
  const myCart = useSelector(myCartSelector);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const AllProductsCart = useSelector(allProductsCartSelector);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  let suma = Math.ceil((total(AllProductsCart) * 121) / 100);

  const handleNext = (e) => {
    setActiveStep(activeStep + 1);

    if (activeStep === 2) {
      if (myCart === null) {
        //guestRegister
        //->crear cart
        //->cargar datos de memoria al cart (order y orderlines)
        //*LA MISMA LOGICA QUE YA ESTA
        //->modificar la orden a confirmada
        //->actualziar la DB
        //borra data local
        //->manda email
        //resetea el cart
        // axios.post('http://localhost:3000/orders', {
        //   status: 'cart',
        //   total: 0,
        //   userId: 1,
        // });
        // //Recibir el id de la orden
        // AllProductsCart.map((p) => {
        //   console.log(p);
        //   const payload = {
        //     id: parseInt(p.id),
        //     price: parseInt(p.price),
        //     quantity: parseInt(p.quantity),
        //   };
        //   dispatch(postProductToCart(payload));
        //   //Revisar porqué no crea las orderlines
        // });
      }
      dispatch(
        modificateOrder({
          myCart: myCart,
          total: suma,
          status: 'completed',
        })
      );
      AllProductsCart.map(async (p) => {
        //Actualiza stock en DB
        if (p.stock >= p.quantity)
          await axios.put(`http://localhost:3000/products/${p.id}`, {
            stock: p.stock - p.quantity,
          });
      });
      deleteAddressInfo();
      deletePaymentInfo();
      dispatch(
        sendEmail({
          name: user.firstName,
          email: user.email,
          type: 'Order',
          orderCod: myCart,
        })
      );
      dispatch(resetCart());
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Muchas gracias por su compra!
                </Typography>
                <Typography variant="subtitle1">
                  Su número de orden es {myCart}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Atras
                    </Button>
                  )}
                  <Button
                    id="button"
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleNext(e)}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? 'Comprar'
                      : 'Siguiente   '}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

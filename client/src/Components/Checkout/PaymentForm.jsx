import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default function PaymentForm() {

  let paymentInfoStorage = JSON.parse(localStorage.getItem('paymentInfo'));
  const [paymentInfo, setPaymentInfo] = React.useState({  
              cardName: paymentInfoStorage.cardName,
              cardNumber: paymentInfoStorage.cardNumber,
              expDate: paymentInfoStorage.expDate,
              cvv: paymentInfoStorage.cvv,
            
    });
    
    useEffect(() => {
      localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo))
    }, [paymentInfo])
    
    window.addEventListener('beforeunload', (event) => {
      setPaymentInfo({
        cardName: document.getElementById('cardName'),
        cardNumber: document.getElementById('cardNumber'),
        expDate: document.getElementById('expDate'),
        cvv: document.getElementById('cvv'),
     
       });
      localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo))
    });

    const handleInputChange = function(e) {
      setPaymentInfo({
         ...paymentInfo, 
         [e.target.name]: e.target.value 
       });
     }
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Método de Pago
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Nombre en la Tarjeta"
            onChange={handleInputChange}
            defaultValue={paymentInfoStorage.cardName}
            fullWidth
            autoComplete="cc-name"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Número de Tarjeta"
            onChange={handleInputChange}
            defaultValue={paymentInfoStorage.cardNumber}
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Válida hasta:"
            onChange={handleInputChange}
            defaultValue={paymentInfoStorage.expDate}
            fullWidth
            autoComplete="cc-exp"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Código de seguridad"
            defaultValue={paymentInfoStorage.cvv}
            onChange={handleInputChange}
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Recordar los datos de la tarjeta de crédito"
          />
        </Grid> */}
      </Grid>
      <div id="PaymentForm">
        <Cards
          cvc={paymentInfo.cvc}
          expiry={paymentInfo.expDate}
          name={paymentInfo.cardName}
          number={paymentInfo.cardNumber}
        />
      </div>
    </React.Fragment>
  );
}

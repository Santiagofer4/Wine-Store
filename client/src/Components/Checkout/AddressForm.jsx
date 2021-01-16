import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormField from '../FormComponents/FormField';

export default function AddressForm() {
  // Traemos la info de la dirección de facturación del local storage

  let addressInfoStorage = JSON.parse(localStorage.getItem('addressInfo'));

  const [addressInfo, setAddressInfo] = useState({
    firstName: addressInfoStorage.firstName,
    lastName: addressInfoStorage.lastName,
    address1: addressInfoStorage.address1,
    email: addressInfoStorage.email,
    city: addressInfoStorage.city,
    stateAddress: addressInfoStorage.stateAddress,
    zip: addressInfoStorage.zip,
    country: addressInfoStorage.country,
  });

  useEffect(() => {
    //guardamos la info de la dirección de facturación en el local storage
    localStorage.setItem('addressInfo', JSON.stringify(addressInfo));
  }, [addressInfo]);

  // Antes de refrescar, guardamos la info en el localstorage, para evitar que tenga que volver a cargar los datos

  window.addEventListener('beforeunload', (event) => {
    setAddressInfo({
      firstName: document.getElementById('firstName'),
      lastName: document.getElementById('lastName'),
      address1: document.getElementById('address1Name'),
      email: document.getElementById('email'),
      city: document.getElementById('firstName'),
      stateAddress: document.getElementById('stateAddress'),
      zip: document.getElementById('zip'),
      country: document.getElementById('country'),
    });
    localStorage.setItem('addressInfo', JSON.stringify(addressInfo));
  });

  const handleInputChange = function (e) {
    setAddressInfo({
      ...addressInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Direccion de envio
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nombre"
            defaultValue={addressInfoStorage.firstName}
            onChange={handleInputChange}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellido"
            defaultValue={addressInfoStorage.lastName}
            onChange={handleInputChange}
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Dirección (línea 1)"
            defaultValue={addressInfoStorage.address1}
            onChange={handleInputChange}
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="email"
            type="email"
            defaultValue={addressInfoStorage.email}
            onChange={handleInputChange}
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Ciudad"
            defaultValue={addressInfoStorage.city}
            onChange={handleInputChange}
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Provincia"
            defaultValue={addressInfoStorage.state}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Código Postal"
            defaultValue={addressInfoStorage.zip}
            onChange={handleInputChange}
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="País"
            defaultValue={addressInfoStorage.country}
            onChange={handleInputChange}
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Usar ésta dirección para los detalles de pago"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

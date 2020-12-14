import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './ProductForm.modules.css';

function StrainForm() {
  const [state, setstate] = useState({
    name: '',
    description: '',
    pairing: '',
    origin: '',
  });

  function handleOnChange(e) {
    setstate({ ...state, [e.target.name]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if ((state.name, state.pairing, state.description, state.origin)) {
      return alert('En Desarrollo ');
    } else return alert('Faltan campos por completar');
  }

  return (
    <div className="formProd">
      <form
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
        className="SearchBar__form"
        noValidate
        autoComplete="off"
      >
        <TextField
          id={state.name ? 'accepted' : 'error'}
          name="name"
          label="Nombre Cepa"
          type="string"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <TextField
          id={state.pairing ? 'accepted' : 'error'}
          name="pairing"
          label="Maridaje"
          type="string"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <TextField
          id={state.description ? 'accepted' : 'error'}
          name="description"
          label="Descripcion"
          type="string"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <TextField
          id={state.origin ? 'accepted' : 'error'}
          name="origin"
          label="Origen"
          type="string"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <Button type="submit">Agregar</Button>
      </form>
    </div>
  );
}

export default StrainForm;

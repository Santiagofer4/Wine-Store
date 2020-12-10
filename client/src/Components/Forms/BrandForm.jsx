import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './ProductForm.modules.css';

function BrandForm() {
  const [state, setstate] = useState({
    name: '',
  });

  function handleOnChange(e) {
    setstate({ ...state, [e.target.name]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (state.name) {
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
          label="Nombre Marca"
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

export default BrandForm;

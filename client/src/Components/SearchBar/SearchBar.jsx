import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './SearchBar.modules.css';
import { connect } from 'react-redux';
import { getProductSearch } from '../../actions';

function SearchBar(props) {
  const [inputSearch, setinputSearch] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    props.getProductSearch(inputSearch);
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="SearchBar__form"
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-secondary"
          color="secondary"
          label="Search"
          onChange={(e) => {
            setinputSearch(e.target.value);
          }}
        />
        <Button type="submit" className="SearchBar___btn">
          Buscar
        </Button>
      </form>
    </div>
  );
}

export default connect(null, { getProductSearch })(SearchBar);

// El componente Search Bar es un formulario conectado de un sólo input, al submitear ejecuta una función recibida por props con el texto ingresado.

// Notas: la función que recibe la vamos a utilizar en el futuro para disparar una acción de redux.

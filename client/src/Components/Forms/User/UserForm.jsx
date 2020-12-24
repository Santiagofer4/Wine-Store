import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './UserForm.modules.css';
import { useDispatch } from 'react-redux';

function UserForm() {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthdate: "",
        cellphone: "",
        password: ""
    });
    function handleOnChange(e){
        console.log("jajajaja", e.target.value)
    };
    function handleOnSubmit(e){
        console.log("Submit", e.target)
/*        const usuario = {
            firstName: e.target.value.firstName,
            lastName: e.target.value.lastName, 
            email: e.target.value.email,
            birthdate: e.target.value.birthdate,
            cellphone: e.target.value.cellphone,
            password: e.target.value.password
        }*/
    };
    return (
        <div className = "formUser">
            <form 
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id={state.firstName ? 'accepted' : 'error'}
          name="firstName"
          label="Nombre"
          type="string"
          required
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <TextField
          id={state.lastName ? 'accepted' : 'error'}
          name="lastName"
          label="Apellido"
          type="string"
          required
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <TextField
          id={state.email ? 'accepted' : 'error'}
          name="email"
          label="Correo electrónico"
          type="email"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <TextField
          id={state.birthdate ? 'accepted' : 'error'}
          name="birthdate"
          label="Fecha de nacimiento"
          type="date"
          required
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <TextField
          id={state.cellphone ? 'accepted' : 'error'}
          name="cellphone"
          label="Teléfono"
          type="tel"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <TextField
          id={state.password ? 'accepted' : 'error'}
          name="password"
          label="Contraseña"
          type="password"
          required
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <Button id="btnUser" type="submit">Agregar</Button>
      </form>
        </div>
    )
}

export default UserForm
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './UserForm.modules.css';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../slices/userSlice';
import { useHistory } from 'react-router-dom';

function UserForm() {
    const history = useHistory();
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthdate: "",
        cellphone: "",
        password: ""
    });

    const dispatch = useDispatch();

    function handleOnChange(e){
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    };

    function handleOnSubmit(e){
      e.preventDefault();
      dispatch(createUser(state))
      .then((payload) => {
        if (payload.type === "user/register/fulfilled") {history.push('/welcome')}
        else { history.push('/failure')}
      }); //En el futuro puede redireccionar a /me
    };

    return (
        <div className = "formUser">
            <form id="form"
            //action='/users'
            method='POST'
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          className="text__field UserForm__lb"
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
          className="text__field UserForm__lb"
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
          className="text__field UserForm__lb"
          id={state.email ? 'accepted' : 'error'}
          name="email"
          label="Correo electrónico"
          type="email"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <TextField
          className="text__field UserForm__lb"
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
          className="text__field UserForm__lb"
          id={state.cellphone ? 'accepted' : 'error'}
          name="cellphone"
          label="Teléfono"
          type="tel"
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <TextField
          className="text__field UserForm__lb"
          id={state.password ? 'accepted' : 'error'}
          name="password"
          label="Contraseña"
          type="password"
          required
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <div className="center">
        <Button id="btnUser" type="submit">Registrarse</Button>
        </div>
      </form>
        </div>
    )
}

export default UserForm
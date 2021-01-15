import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Button,
  Container,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import FormField from '../../FormComponents/FormField';
import './UserForm.modules.css';
//import { validationSchemaUserRegister } from './userValidations';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { postUserLogin, resetStatus } from '../../../slices/userSlice.js';
import { postProductToCart, login } from '../../../slices/productsCartSlice.js';
import { userSelector, userLoginStatusSelector } from '../../../selectors';
import axios from 'axios';

function UserLogin() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const userStatus = useSelector(userLoginStatusSelector);
  const history = useHistory();
  const [viewPassword, setViewPassword] = useState(false);
  const emptyValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, formik) => {
    const payload = {
      user: {
        email: values.email,
        password: values.password,
      },
      formik,
    };
    dispatch(postUserLogin(payload));
  };
  if (userStatus === 'succeded') {
    history.push('/welcome');
  }

  if (userStatus === 'failed') {
    history.push('/failure');
    dispatch(resetStatus());
  }

  const handleReset = (formik) => {
    //func para resetear el form
    formik.resetForm({
      values: { ...emptyValues },
      errors: { ...emptyValues },
    });
  };

  const handleClickShowPassword = () => {
    setViewPassword(!viewPassword);
  };

  const githubLoginHandler = () => {
    axios.get('http://localhost:3000/auth/github').then((response) => {
      let redirectURL = response.request.responseURL;
      if (redirectURL) return window.location.replace(redirectURL);
      else console.log('xxxxxxx', response.request);
    });
  };

  return (
    <Container className="formUser">
      <Formik
        initialValues={emptyValues}
        //   validationSchema={validationSchemaUserRegister}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Container>
            <Form>
              <FormField
                fieldType="input"
                label="Correo Electronico"
                name="email"
                required
                className="text__field UserForm__lb"
              />
              <FormField
                fieldType="input"
                label="Contraseña"
                name="password"
                required
                className="text__field UserForm__lb"
                type={viewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {viewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br></br>
              <Container className="center">
                <Button type="submit" id="btnUser">
                  Login
                </Button>
                <br></br>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleReset(formik)}
                  type="reset"
                >
                  RESET
                </Button>
                <hr></hr>
                <br></br>
                <Button onClick={githubLoginHandler}>
                  {/* <a href="http://localhost:3000/auth/github"> */}
                  <GitHubIcon />
                  {/* </a> */}
                </Button>
                <br></br>
              </Container>
            </Form>
          </Container>
        )}
      </Formik>
    </Container>
  );
}

export default UserLogin;

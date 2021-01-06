import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Button,
  Container,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import FormField from '../../FormComponents/FormField';
import './UserForm.modules.css';
//import { validationSchemaUserRegister } from './userValidations';
import { useDispatch } from 'react-redux';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { postUserLogin } from '../../../slices/userSlice.js';

function UserLogin() {
  const dispatch = useDispatch();
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
    dispatch(postUserLogin(payload)).then((payload) => {
      if (payload.type === 'user/login/fulfilled') {
        history.push('/welcome');
      } else {
        history.push('/failure');
      }
    });
  };

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
              </Container>
            </Form>
          </Container>
        )}
      </Formik>
    </Container>
  );
}

export default UserLogin;

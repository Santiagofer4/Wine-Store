import React from 'react';
import { Container, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import FormField from '../../FormComponents/FormField';

function EditUser() {
  const emptyValues = {
    firstName: '',
    lastName: '',
    email: '',
    cellphone: '',
    birthdate: new Date('01/01/2000'),
  };

  const editValues = {
    firstName: 'asd',
    lastName: 'asd',
    email: 'asd',
    cellphone: 'asd',
    birthdate: new Date('01/01/2000'),
  };

  const handleSubmit = (values, formik) => {};

  const handleReset = (formik) => {
    //func para resetear el form
    formik.resetForm({
      values: { ...emptyValues },
      errors: { ...emptyValues },
    });
  };

  return (
    <Container className="formUser">
      <Formik
        initialValues={editValues}
        // validationSchema={validationSchemaUserRegister}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Container>
            <Form>
              <FormField
                fieldType="input"
                label="Nombre"
                name="firstName"
                required
                className="text__field UserForm__lb"
              />
              <FormField
                fieldType="input"
                label="Apellido"
                name="lastName"
                required
                className="text__field UserForm__lb"
              />
              <FormField
                fieldType="input"
                label="Correo Electronico"
                name="email"
                required
                className="text__field UserForm__lb"
              />
              <FormField
                fieldType="datepicker"
                label="Fecha de Nacimiento"
                name="birthdate"
                required
                className="text__field UserForm__lb"
                placeholder={'dd/mm/aaaa'}
              />
              <FormField
                fieldType="input"
                label="Teléfono"
                name="cellphone"
                className="text__field UserForm__lb"
              />
              <br></br>
              <Container className="center">
                <Button type="submit" id="btnUser">
                  Actualizar
                </Button>
                <br></br>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleReset(formik)}
                  type="reset"
                >
                  CLEAR
                </Button>
                <Button variant="outlined" color="secondary">
                  RESETEAR PASSWORD
                </Button>
              </Container>
              <br></br>
              <Container>
                <Button variant="contained" color="primary" type="reset">
                  BORRAR USUARIO
                </Button>
              </Container>
            </Form>
          </Container>
        )}
      </Formik>
    </Container>
  );
}

export default EditUser;

import React, { Component } from 'react';
import FormField from '../../FormComponents/FormField';
import { Formik, Form } from 'formik';
import { validationSchemaLoadStrains } from '../adminValidations.js';
import { Container, Paper, Button } from '@material-ui/core';
import '../LoadPorduct/LoadProduct.modules.css';
import axios from 'axios';

export const LoadProduct = (props) => {
  const initialValues = {
    name: '',
    description: '',
    pairing: '',
    origin: '',
  };

  const postNewStrain = async (strain) => {
    try {
      const resp = await axios.post(
        'http://localhost:3000/products/strain',
        strain
      );
      console.log('POST', resp);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (values, onSubmitProps) => {
    // console.log('VALUES', values);
    postNewStrain(values);
    // onSubmitProps.resetForm();
  };

  return (
    <Container className="">
      <h1>Carga de cepas</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaLoadStrains}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Container>
            <Form>
              <FormField
                fieldType="input"
                label="Nombre de cepa"
                name="name"
                required
              />
              <FormField
                fieldType="textarea"
                label="Maridaje"
                name="pairing"
                rows={4}
                required
              />
              <FormField
                fieldType="textarea"
                label="Descripcion de la cepa"
                name="description"
                rows={8}
                required
              />
              <FormField
                fieldType="input"
                label="Origen de la cepa"
                name="origin"
                required
              />
              <br></br>
              <Container>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!formik.isValid}
                  type="submit"
                >
                  {' '}
                  Cargar
                </Button>
              </Container>
            </Form>
          </Container>
        )}
      </Formik>
    </Container>
  );
};

export default LoadProduct;
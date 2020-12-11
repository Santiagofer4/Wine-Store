import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../FormComponents/FormField';
import { Formik, Form } from 'formik';
import { validationSchemaLoadProducts } from '../adminValidations.js';
import { Container, Paper, Button } from '@material-ui/core';
import './LoadProduct.modules.css';

export const LoadProduct = (props) => {
  const strainOption = [{ label: 'TEST', value: 'test' }];
  const initialValues = {
    product: '',
    strain: '',
    harvestYear: '',
    price: '',
    stock: '',
    description: '',
    image: '',
  };
  const handleSubmit = (values, onSubmitProps) => {
    console.log(values);
  };

  return (
    <Container className="">
      <h1>Carga de Productos</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaLoadProducts}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Container>
            <Form>
              <FormField
                fieldType="input"
                label="Marca"
                name="product"
                required
              />
              <FormField
                fieldType="select"
                label="Cepa"
                name="strain"
                options={strainOption}
                required
              />
              <FormField
                fieldType="input"
                type="number"
                label="Año de cosecha"
                name="harvestYear"
                required
              />
              <FormField
                fieldType="input"
                type="number"
                label="Stock Inicial"
                name="stock"
              />
              <FormField
                fieldType="input"
                type="number"
                label="Precio"
                name="price"
                required
              />
              <FormField
                fieldType="input"
                label="URL de imagen"
                name="image"
                required
              />
              <FormField
                fieldType="textarea"
                label="Descripcion del producto"
                name="description"
                rows={8}
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
                  Submit
                </Button>
              </Container>
            </Form>
          </Container>
        )}
      </Formik>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  strainOption: state.strainList,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoadProduct);

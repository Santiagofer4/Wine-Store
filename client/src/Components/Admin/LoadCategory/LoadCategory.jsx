import React, { Component, useState, useEffect } from 'react';
import FormField from '../../FormComponents/FormField';
import { Formik, Form } from 'formik';
import { validationSchemaLoadCategories } from '../adminValidations.js';
import { Container, Paper, Button } from '@material-ui/core';
import '../LoadPorduct/LoadProduct.modules.css';
import axios from 'axios';
import { getCategoryList } from '../../../actions';
import { connect } from 'react-redux';
import { formatArrayToOption } from '../../utils';

export const LoadCategory = (props) => {
  // console.log('es un arreglo?',props.categoryList[0].data)
  const initialValues = {
    taste: '',
  };
  // console.log('load categori' ,props)
  // props.getCategoryList()
  // console.log('con datos', props.categoryList)
  const [borrar, setBorrar] = useState(false);
  const [tasteList, setTasteList] = useState([]); //mantiene actualziada la lista de sabores(nuestras categorías)...no me convence...creo que es al pedo definir un estado local si tenemos un store

  const postNewCategory = async (category) => {
    try {
      const resp = await axios.post(
        'http://localhost:3000/products/category',
        category
      );
      console.log('POST', resp);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    callTastes();
  }, [props.categoryList]);

  const callTastes = async () => {
    // await props.getCategoryList();
    (await Array.isArray(props.categoryList)) &&
      props.categoryList.length > 0 &&
      setTasteList(formatArrayToOption(props.categoryList, 'taste')); //? Tiene que haber una mejor manera para solucionar esto...
    console.log('dentro de calltests', tasteList);
  };

  const handleSubmit = (values, onSubmitProps) => {
    // console.log('VALUES', values);
    postNewCategory(values);
    // onSubmitProps.resetForm();
  };

  return (
    <Container className="">
      {borrar ? <h1>Borrar una categorías</h1> : <h1>Cargar una categorías</h1>}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setBorrar(!borrar);
          // callTastes()
        }}
      >
        {borrar ? 'CARGAR' : 'BORRAR'}
      </Button>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaLoadCategories}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Container>
            <Form>
              {borrar ? (
                <>
                  <FormField
                    fieldType="select"
                    label="Listado de categorías"
                    name="taste"
                    options={tasteList}
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
                      Borrar
                    </Button>
                  </Container>
                </>
              ) : (
                <>
                  <FormField
                    fieldType="input"
                    label="Nombre de categoría"
                    name="taste"
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
                </>
              )}
            </Form>
          </Container>
        )}
      </Formik>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    categoryList: state.productReducers.categories,
  };
}

export default connect(mapStateToProps, { getCategoryList })(LoadCategory);

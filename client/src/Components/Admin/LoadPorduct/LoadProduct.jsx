import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FormField from '../../FormComponents/FormField';
import { Formik, Form } from 'formik';
import { validationSchemaLoadProducts } from '../adminValidations.js';
import { Container, Paper, Button } from '@material-ui/core';
import './LoadProduct.modules.css';
import { getStrainList } from '../../../actions/';

//! ---- NO FUNCIONA :( ----
//El componente `carga` un par de veces antes de que se dispare el useEffect que busca la lista de cepas, aun asi las cepas son asincronas entonces "tarda" en recibir esas props,existe la forma de que la func `getStrainList` se dispare antes de que renderice por primera vez?
// intente con una promesa y un condicional pero no funciono...pero creo que va por ahi....ya que no deberiamos intentar mapear las cepas hasta que la promesa no se resuelva y tampoco antes de que se dispare el useffect

const LoadProduct = (props) => {
  // const [strainOptions, setStrainOptions] = useState({});
  console.log('PROPS LOAD', props.strainList);
  useEffect(() => {
    strainList();
    // setStrainOptions(props.getStrainList());
    // console.log('STRAIN', strainOptions);
    // const option = props.strainList.map((strain) => {
    //   return { label: strain.name, value: strain.name };
    // });
    // console.log('OPTIONS', option);
  }, []);

  const strainList = async () => {
    return await props.getStrainList();
  };
  const x =
    Array.isArray(props.strainList) && props.strainList.map((x) => x.name);
  console.log(x);

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
              {/* <FormField
                fieldType="select"
                label="Cepa"
                name="strain"
                options={strainOption}
                required
              /> */}
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
  strainList: state.formReducers.strainList,
});

export default connect(mapStateToProps, { getStrainList })(LoadProduct);

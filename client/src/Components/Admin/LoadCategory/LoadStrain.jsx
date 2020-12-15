import React, { useEffect, useState } from 'react';
import FormField from '../../FormComponents/FormField';
import { Formik, Form } from 'formik';
import { validationSchemaLoadStrains } from '../adminValidations.js';
import { Container, Button } from '@material-ui/core';
import '../LoadProduct/LoadProduct.modules.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getStrainList, deleteStrain } from '../../../actions';
import { formatArrayToOption } from '../../utils';

export const LoadStrain = (props) => {
  const initialValues = {
    name: '',
    description: '',
    pairing: '',
    origin: ''
  };

  // console.log('PROPS strain', props);

  const [borrar, setBorrar] = useState(false);
  const [strainOption, setStrainOption] = useState([]); 

  const postNewStrain = async (strain, x) => {
    try {
      await axios.post('http://localhost:3000/strain', strain);
        x.resetForm();
        x.setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    callStrainList();
  }, [props.strainList]);

  const callStrainList = () => {
    setStrainOption(formatArrayToOption(props.strainList, 'name'));
  };

  const handleSubmit = (values, onSubmitProps) => {
    if(borrar) {
      props.deleteStrain(values.name)
    } else {
      postNewStrain(values, onSubmitProps);
    }
  };

  return (
    <Container className="">
      {borrar ? <h1>Borrar cepas</h1> : <h1>Carga de cepas</h1>}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setBorrar(!borrar);
        }}
      >
        {borrar ? 'CARGAR' : 'BORRAR'}
      </Button>

      <Formik
        initialValues={initialValues}
        validationSchema={!borrar && validationSchemaLoadStrains}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Container>
            <Form>
              {borrar ? (
                <>
                  <FormField
                    fieldType="select"
                    label="Listado de cepas"
                    name="name"
                    options={strainOption}
                    required
                  />

                  <br></br>
                  <Container>
                    <Button
                      variant="contained"
                      color="primary"
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
                label="Nombre de cepa"
                name="name"
                // required
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
    strainList: state.productReducers.strains,
  };
}

export default connect(mapStateToProps, { getStrainList, deleteStrain })(LoadStrain);
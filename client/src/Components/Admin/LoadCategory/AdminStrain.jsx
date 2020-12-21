import React, { useEffect, useState } from 'react';
import FormField from '../../FormComponents/FormField';
import { validationSchemaLoadStrains } from '../adminValidations.js';
import { Container, Button, CircularProgress } from '@material-ui/core';
import '../LoadProduct/LoadProduct.modules.css';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  allStrainsSelector,
  strainsStatusSelector,
  strainsErrorSelector,
} from '../../../selectors';
import DeleteStrain from '../Strain/DeleteStrain.jsx';
import LoadStrain from '../Strain/LoadStrain.jsx';
import { getAllStrains } from '../../../slices/strainSlice';

export const AdminStrain = (props) => {
  const dispatch = useDispatch();
  const allStrains = useSelector(allStrainsSelector);
  const strainsStatus = useSelector(strainsStatusSelector);
  const allStrainsError = useSelector(strainsErrorSelector);

  const [borrar, setBorrar] = useState(false);

  let content;

  useEffect(() => {
    if (strainsStatus === 'idle') {
      dispatch(getAllStrains());
    }
  }, [strainsStatus, dispatch]);

  // if (borrar) {
  //   content = <DeleteStrain />;
  // } else {
  //   content = <LoadStrain />;
  // }
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
      <hr></hr>
      <Container>{borrar ? <DeleteStrain /> : <LoadStrain />}</Container>
    </Container>
  );
};

export default AdminStrain;

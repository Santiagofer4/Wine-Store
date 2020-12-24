import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './LoadProduct.modules.css';

function AdminProduct(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [edit, setEdit] = useState(false);
  const edit = props.location.state ? props.location.state.edit : false;

  return (
    <Container>
      {edit ? <h1>Editar {wineDetail.name}</h1> : <h1>Carga de Productos</h1>}
      <Container>{edit ? <EditProduct /> : <LoadProduct />}</Container>
    </Container>
  );
}

export default AdminProduct;

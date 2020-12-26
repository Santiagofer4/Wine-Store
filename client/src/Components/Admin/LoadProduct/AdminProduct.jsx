import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './LoadProduct.modules.css';
import { getAllCategories } from '../../../slices/categorySlice';
import { getAllStrains } from '../../../slices/strainSlice';

import {
  allCategoriesStatusSelector,
  strainsStatusSelector,
  productDetailStatusSelector,
  productDetailErrorSelector,
} from '../../../selectors/index';
import { setWineDetailAsync } from '../../../slices/productDetailSlice';
import EditProduct from './EditProduct';
import _LoadProduct from './_LoadProduct';

function AdminProduct(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [edit, setEdit] = useState(false);
  const edit = props.location.state ? props.location.state.edit : false;

  const allCatStatus = useSelector(allCategoriesStatusSelector);
  const strainStatus = useSelector(strainsStatusSelector);
  const wineDetailAsyncStatus = useSelector(productDetailStatusSelector);
  const wineDetailAsyncError = useSelector(productDetailErrorSelector);

  useEffect(() => {
    if (allCatStatus === 'idle') dispatch(getAllCategories());
    if (strainStatus === 'idle') dispatch(getAllStrains());
  }, [allCatStatus, strainStatus, dispatch]);

  return (
    <Container>
      {edit ? <h1>Edicion de producto</h1> : <h1>Carga de producto</h1>}
      <Container>{edit ? <EditProduct /> : <_LoadProduct />}</Container>
    </Container>
  );
}

export default AdminProduct;

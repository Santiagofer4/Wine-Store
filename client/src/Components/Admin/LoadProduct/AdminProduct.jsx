import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './LoadProduct.modules.css';
import { getAllCategories } from '../../../slices/categorySlice';
import { getAllStrains } from '../../../slices/strainSlice';
import {
  allCatStatus,
  strainStatus,
  allCategoriesSelector,
  allStrainsSelector,
  allCategoriesStatusSelector,
  strainsStatusSelector,
  productDetailStatusSelector,
  productDetailErrorSelector,
  wineDetailSelector,
} from '../../../selectors/index';
import EditProduct from './EditProduct';
import _LoadProduct from './_LoadProduct';
import {
  resetDetailStatus,
  setWineDetailAsync,
} from '../../../slices/productDetailSlice';
import { formatArrayToOption } from '../../utils';

function AdminProduct(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const edit = props.location.state ? props.location.state.edit : false;
  const param_id = props.location.pathname.split('/').slice(-1)[0];

  const [options, setOptions] = useState({
    strainOption: '',
    tasteOption: '',
  });

  const wineDetail = useSelector(wineDetailSelector);
  const allCats = useSelector(allCategoriesSelector);
  const allStrains = useSelector(allStrainsSelector);
  const allCatStatus = useSelector(allCategoriesStatusSelector);
  const strainStatus = useSelector(strainsStatusSelector);
  const wineDetailAsyncStatus = useSelector(productDetailStatusSelector);

  useEffect(() => {
    if (allCatStatus === 'idle') dispatch(getAllCategories());
    if (strainStatus === 'idle') dispatch(getAllStrains());
    if (edit && wineDetailAsyncStatus === 'idle')
      dispatch(setWineDetailAsync(param_id));
  }, [wineDetailAsyncStatus, allCatStatus, strainStatus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetDetailStatus());
    };
  }, []);

  useEffect(() => {
    if (allCatStatus === 'succeded' && strainStatus === 'succeded') {
      setOptions({
        tasteOption: formatArrayToOption(allCats, 'taste'),
        strainOption: formatArrayToOption(allStrains),
      });
    }
  }, [allCatStatus, strainStatus, dispatch]);
  let content;

  if (
    allCatStatus === 'loading' ||
    strainStatus === 'loading' ||
    wineDetailAsyncStatus === 'loading'
  ) {
    content = (
      <Container>
        <h2>Cargando....</h2>
        <CircularProgress />
      </Container>
    );
  } else {
    if (edit) {
      content = <EditProduct options={options} />;
    } else {
      content = <_LoadProduct options={options} />;
    }
  }

  return (
    <Container>
      {edit ? <h1>Edicion de producto</h1> : <h1>Carga de producto</h1>}
      {content}
    </Container>
  );
}

export default AdminProduct;

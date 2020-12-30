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
import LoadProduct from './LoadProduct';
import {
  resetDetailStatus,
  setWineDetailAsync,
} from '../../../slices/productDetailSlice';
import { formatArrayToOption } from '../../utils';

function AdminProduct(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  let param_id;
  const edit = props.location.state ? props.location.state.edit : false; //?booleano para determinar si se desea EDITAR la instancia
  if (edit) {
    param_id = props.location.pathname.split('/').slice(-1)[0];
  }
  //* Levanta el id del parametro si estamos editando

  const [options, setOptions] = useState({
    strainOption: '',
    tasteOption: '',
  });

  //* Selectors de estado de llamadas async
  const wineDetail = useSelector(wineDetailSelector);
  const allCats = useSelector(allCategoriesSelector);
  const allStrains = useSelector(allStrainsSelector);
  const allCatStatus = useSelector(allCategoriesStatusSelector);
  const strainStatus = useSelector(strainsStatusSelector);
  const wineDetailAsyncStatus = useSelector(productDetailStatusSelector);

  useEffect(() => {
    //? useEffect para despachar la accion de obtener las categorias, las cepas y la info (detalle) de un producto
    if (allCatStatus === 'idle') dispatch(getAllCategories());
    if (strainStatus === 'idle') dispatch(getAllStrains());
    if (edit && wineDetailAsyncStatus === 'idle')
      dispatch(setWineDetailAsync(param_id));
  }, [wineDetailAsyncStatus, allCatStatus, strainStatus, dispatch]);

  useEffect(() => {
    //? Cleanup del status del detalle del vino
    return () => {
      dispatch(resetDetailStatus());
    };
  }, []);

  useEffect(() => {
    //? useEffect para tomar las categorias (sabores//taste) y cepas (strains)
    //? y convertirlas en formato apto para `dropdown`
    //? formatArrayToOptions se encarga de esto y lo guardamos en el estado,
    //? que pasamos luego como prop a los otros componentes
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
    //* si alguno de los estados es ='loading' renderizamos `Cargando...`
    content = (
      <Container>
        <h2>Cargando....</h2>
        <CircularProgress />
      </Container>
    );
  } else {
    if (edit) {
      //* si edit entonces renderizamos el componente para editar
      content = <EditProduct options={options} />;
    } else {
      //* si !edit entonces renderizamos el form `vacio` para cargar un nuevo producto
      content = <LoadProduct options={options} />;
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

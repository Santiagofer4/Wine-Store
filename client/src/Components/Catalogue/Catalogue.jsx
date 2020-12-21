import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress } from '@material-ui/core';
import './Catalogue.modules.css';

import ProductCard from '../ProductCard/ProductCard.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { getCategoryList } from '../../actions';
import { getAllProducts, findWine } from '../../slices/productSlice';
import {
  allProductsSelector,
  allProductsStatusSelector,
  allProductsErrorSelector,
  allProdsByCategoryStatusSelector,
  allProdsByCategoryErrorSelector,
  allProdsByCategorySelector,
} from '../../selectors';

function Catalogue() {
  const dispatch = useDispatch();
  const allProducts = useSelector(allProductsSelector);
  const allProdStatus = useSelector(allProductsStatusSelector);
  const allProdError = useSelector(allProductsErrorSelector);

  useEffect(() => {
    if (allProdStatus === 'idle') dispatch(getAllProducts());
  }, [allProdStatus, dispatch]);

  let content;

  if (allProdStatus === 'loading') {
    content = (
      <>
        <h3>Cargando...</h3>
        <CircularProgress />
      </>
    );
    return content;
  } else if (allProdStatus === 'succeded') {
    if (allProducts.length < 1) {
      content = (
        <>
          <h3>No hay productos</h3>
          <Button onClick={() => dispatch(getAllProducts())}>Reintentar</Button>
        </>
      );
    } else {
      content = allProducts.map((product, idx) => (
        <ProductCard data={product} key={idx} />
      ));
    }
  } else if (allProdStatus === 'failed') {
    return (
      <>
        <h3>Error al cargar productos</h3>
        {console.error(allProdError)}
        <p>{allProdError.name}</p>
        <p>{allProdError.message}</p>
        <Button onCLick={() => dispatch(getAllProducts())}>Reintentar</Button>
      </>
    );
  }
  return (
    <div className="Catalogue__container">
      <Sidebar></Sidebar>
      <h3>Viendo todos los vinos</h3>
      <div className="Catalogue__Div">{content}</div>
    </div>
  );
}

export default Catalogue;

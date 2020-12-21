import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress } from '@material-ui/core';
import './Catalogue.modules.css';

import ProductCard from '../ProductCard/ProductCard.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { getCategoryList } from '../../actions';
import { getAllProducts } from '../../slices/productSlice';
import {
  allProductsSelector,
  allProductsStatusSelector,
  allProductsErrorSelector,
  allProdsByCategoryStatusSelector,
  allProdsByCategoryErrorSelector,
  allProdsByCategorySelector,
  filteredTasteSelector,
} from '../../selectors';

function CatalogueByTaste(props) {
  const dispatch = useDispatch();
  const allProdsByCatStatus = useSelector(allProdsByCategoryStatusSelector);
  const allProdsByCat = useSelector(allProdsByCategorySelector);
  const allProdsByCatError = useSelector(allProdsByCategoryErrorSelector);
  const filteredTaste = useSelector(filteredTasteSelector);

  let content;
  if (allProdsByCatStatus === 'loading') {
    content = (
      <>
        <h3>Cargando...</h3>
        <CircularProgress />
      </>
    );
    return content;
  } else if (allProdsByCatStatus === 'succeded') {
    if (allProdsByCat.length < 1) {
      content = <h3>No hay productos</h3>;
    } else {
      content = allProdsByCat.map((product, idx) => (
        <ProductCard data={product} key={idx} />
      ));
    }
  } else if (allProdsByCatStatus === 'failed') {
    return (
      <>
        <h3>Error al cargar productos</h3>
        {console.error(allProdsByCatError)}
        <p>{allProdsByCatError.name}</p>
        <p>{allProdsByCatError.message}</p>
        <Button>Try Again</Button>
      </>
    );
  }
  return (
    <div className="Catalogue__container">
      <Sidebar></Sidebar>
      <h2>Viendo vinos de sabor: {filteredTaste}</h2>
      <div className="Catalogue__Div">{content}</div>
    </div>
  );
}

export default CatalogueByTaste;

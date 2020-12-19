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
} from '../../selectors';

function Catalogue(props) {
  const dispatch = useDispatch();
  const allProducts = useSelector(allProductsSelector);
  const allProdState = useSelector(allProductsStatusSelector);
  const allProdError = useSelector(allProductsErrorSelector);

  useEffect(() => {
    //Carga solo cuando entrás, y no recarga cuando apretás catalogue otra vez. Arreglar eso
    if (allProdState === 'idle') dispatch(getAllProducts());
    // async function anyNameFunction() {
    //   // Hay que crear una async function en el hook
    //   await props.getCategoryList(); // se dispacha una accion al reducer con la lista de categorias para el sidebar
    //   // await props.getProductsList();
    // }
    // anyNameFunction(); // Y ejecutar la función creada
  }, [allProdState, dispatch]);

  let content;

  if (allProdState === 'loading') {
    content = (
      <>
        <h3>Cargando...</h3>
        <CircularProgress />
      </>
    );
    return content;
  } else if (allProdState === 'succeded') {
    if (allProducts.length < 1) {
      content = <h3>No hay productos</h3>;
    }
    content = allProducts.map((product, idx) => (
      <ProductCard data={product} key={idx} />
    ));
  } else if (allProdState === 'failed') {
    return (
      <>
        <h3>Error al cargar productos</h3>
        {console.error(allProdError)}
        <p>{allProdError.name}</p>
        <p>{allProdError.message}</p>
        <Button>Try Again</Button>
      </>
    );
  }
  return (
    <div className="Catalogue__container">
      <Sidebar></Sidebar>
      <div className="Catalogue__Div">{content}</div>
    </div>
  );
}

export default Catalogue;
// export default connect(null, { getCategoryList })(Catalogue);

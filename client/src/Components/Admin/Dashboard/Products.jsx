import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Products.modules.css';
import { getAllProducts } from '../../../slices/productSlice';
import {
  allProductsSelector,
  allProductsStatusSelector,
} from '../../../selectors';

import EditIcon from '@material-ui/icons/Edit';
import { CircularProgress, Button } from '@material-ui/core';

// Esta tabla es para el admin.
// Tiene que mostrar todos los productos.

function Products() {
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector(allProductsSelector);
  const status = useSelector(allProductsStatusSelector);

  let content;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleRetry = () => {
    //func para reintentar y forzar refresh
    window.location.reload();
    return false;
  };

  const editHandler = (id) => {
    history.push({
      pathname: `/admin/edit/${id}`,
      state: {
        edit: true,
      },
    });
  };

  if (status === 'loading') {
    content = (
      <>
        <h2>Cargando...</h2>
        <CircularProgress />
      </>
    );
  } else if (status === 'succeded') {
    content = products.map((product) => {
      let even = product.id % 2 === 0 ? 'white' : 'beige';
      return (
        <>
          <div className="grid-item" style={{ backgroundColor: even }}>
            {product.id}
          </div>
          <div className="grid-item" style={{ backgroundColor: even }}>
            {product.name}
          </div>
          <Button
            className="editButton"
            style={{ backgroundColor: even }}
            onClick={() => editHandler(product.id)}
          >
            <EditIcon className="grid-item"></EditIcon>
          </Button>
        </>
      );
    });
  } else if (status === 'failed') {
    content = (
      <>
        <h3>Ha ocurrido un error</h3>
        <Button onClick={handleRetry}>Reintentar</Button>
      </>
    );
  }
  return (
    <div class="grid-container">
      <p className="grid-item" style={{ fontWeight: 'bold' }}>
        Código
      </p>
      <p className="grid-item" style={{ fontWeight: 'bold' }}>
        Producto
      </p>
      <p className="grid-item" style={{ fontWeight: 'bold' }}>
        Editar/Borrar
      </p>
      {content}
    </div>
  );
}

export default Products;

import React, { useEffect } from 'react';
import './Sidebar.modules.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../slices/productSlice';
import {
  getAllCategories,
  getAllProdsByCategory,
} from '../../slices/categorySlice';
import {
  allProductsSelector,
  allCategoriesStatusSelector,
  allCategoriesSelector,
} from '../../selectors';
import { CircularProgress, Button } from '@material-ui/core';

function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allProducts = useSelector(allProductsSelector);
  const allCategories = useSelector(allCategoriesSelector);
  const allCatsStatus = useSelector(allCategoriesStatusSelector);

  useEffect(() => {
    if (allCatsStatus === 'idle') dispatch(getAllCategories());
  }, [allCatsStatus, dispatch]);

  const categoryClickHandler = (e) => {
    let taste = e.target.name.toLowerCase();
    history.push(`/catalogue/${taste}`);
    dispatch(getAllProdsByCategory(taste));
  };

  let content;
  if (allCatsStatus === 'loading') {
    content = (
      <>
        <p>Cargando sabores...</p>
        <CircularProgress />
      </>
    );
    return content;
  } else if (allCatsStatus === 'succeded') {
    if (allCategories.length < 1) {
      content = <p>No hay sabores cargados</p>;
      return content;
    }
    content = allCategories.map((category, idx) => {
      return (
        <Button
          variant="text"
          className="Sidebar__Text"
          color="inherit"
          fullWidth
          key={idx}
          name={category.taste}
          onClick={(e) => categoryClickHandler(e)}
        >
          {category.taste}
        </Button>
      );
    });
  }
  return (
    <div className="Sidebar__container">
      <div className="Sidebar__lista">
        {allProducts.length > 0 ? (
          <Button
            color="primary"
            variant="text"
            className="Sidebar__Text"
            id="verTodos"
            fullWidth
            onClick={() => {
              history.push(`/catalogue`);
              dispatch(getAllProducts());
            }}
          >
            {' '}
            Ver Todos
          </Button>
        ) : (
          <p>No hay productos</p>
        )}{' '}
        {content}
      </div>
    </div>
  );
}
export default Sidebar;

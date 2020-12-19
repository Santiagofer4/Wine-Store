import React, { useEffect } from 'react';
import './Sidebar.modules.css';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getCategoryList, getProductsCategory } from '../../actions';
// import { Button } from '@material-ui/core';
import { getAllProducts } from '../../slices/productSlice';
import { getAllCategories } from '../../slices/categorySlice';
import {
  allProductsSelector,
  allProductsStatusSelector,
  allProductsErrorSelector,
  allCategoriesStatusSelector,
  allCategoriesErrorSelector,
  allCategoriesSelector,
} from '../../selectors';
import { CircularProgress } from '@material-ui/core';

function Sidebar(props) {
  const dispatch = useDispatch();
  const allProducts = useSelector(allProductsSelector);
  const allCategories = useSelector(allCategoriesSelector);
  const allCatsStatus = useSelector(allCategoriesStatusSelector);
  const allCatsError = useSelector(allCategoriesErrorSelector);

  useEffect(() => {
    if (allCatsStatus === 'idle') dispatch(getAllCategories());
  }, [allCatsStatus, dispatch]);

  function categoria(e) {
    let categoryName = e.target.innerText.toLowerCase();
    props.getProductsCategory(categoryName);
  }

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
        <a
          className="Sidebar__Text"
          href="#"
          key={idx}
          onClick={(e) => {
            categoria(e);
          }}
        >
          {category.taste}
        </a>
      );
    });
  }
  return (
    <div className="Sidebar__container">
      <div className="Sidebar__lista">
        {allProducts.length > 0 ? (
          <a
            className="Sidebar__Text"
            id="verTodos"
            href="#"
            onClick={() => {
              dispatch(getAllProducts());
            }}
          >
            {' '}
            Ver Todos
          </a>
        ) : (
          <p>No hay productos</p>
        )}{' '}
        {content}
      </div>
    </div>
  );
}
export default Sidebar;

import axios from 'axios';
import {
  GET_PRODUCTS_CATEGORY,
  GET_PRODUCT_SEARCH,
  GET_PRODUCTS_LIST,
  POST_NEW_PRODUCT,
  GET_CATEGORY_LIST,
  SET_PRODUCT_DETAIL,
  GET_STRAIN_LIST,
} from './actions';

export function getProductSearch(payload) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3000/search?word=${payload}`)
      .then((response) => {
        dispatch({ type: GET_PRODUCT_SEARCH, payload: response });
      })
      .catch((err) => {
        // console.log('Error en GET_PRODUCT_SEARCH', err);
      });
  };
}

export function getProductsList() {
  return function (dispatch) {
    return axios
      .get('http://localhost:3000/products')
      .then((productList) => {
        dispatch({ type: GET_PRODUCTS_LIST, payload: productList });
      })
      .catch((err) => {
        //console.log('Error en GET_PRODUCTS_LIST', err);
      });
  };
}

export const postNewProduct = (product) => (dispatch) => {
  return axios
    .post(`http://localhost:3000/products`)
    .then((product) => dispatch({ type: POST_NEW_PRODUCT, payload: product }));
};

export const getProductsCategory = (categoryName) => (dispatch) => {
  return axios
    .get(`http://localhost:3000/products/ProductosPorCategoria/${categoryName}`)
    .then((catList) =>
      dispatch({ type: GET_PRODUCTS_CATEGORY, payload: catList })
    );
};

export const getCategoryList = () => (dispatch) => {
  return axios
    .get(`http://localhost:3000/products/category`)
    .then((catList) => dispatch({ type: GET_CATEGORY_LIST, payload: catList }));
};

export const setProductDetail = (wineDetail) => (dispatch) => {
  // console.log('ACTIONS', wineDetail);
  return dispatch({ type: SET_PRODUCT_DETAIL, payload: wineDetail });
};

export const getStrainList = () => async (dispatch) => {
  try {
    const strainList = await axios.get('http://localhost:3000/products/strain');
    console.log('ACTIONS->strainList', strainList.data);
    return dispatch({ type: GET_STRAIN_LIST, payload: strainList.data });
  } catch (error) {
    console.error(error);
  }
};

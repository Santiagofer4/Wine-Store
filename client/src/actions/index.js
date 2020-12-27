import axios from 'axios';
import {
  GET_PRODUCTS_CATEGORY,
  GET_PRODUCT_SEARCH,
  GET_PRODUCTS_LIST,
  POST_NEW_PRODUCT,
  GET_CATEGORY_LIST,
  SET_PRODUCT_DETAIL,
  GET_STRAIN_LIST,
  SET_HISTORY,
  GET_CATEGORIES_OF_PRODUCT,
  DELETE_STRAIN,
  DELETE_CATEGORY,
  GET_PRODUCTS_CART,
  GET_ORDER_LIST,
  DELETE_PRODUCTS_CART,
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
    .get(`http://localhost:3000/products/productsByCategory/${categoryName}`)
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

export const getStrainList = () => (dispatch) => {
  return (
    axios
      .get('http://localhost:3000/strain')
      // console.log('ACTIONS->strainList', strainList.data);
      .then((strainList) =>
        dispatch({ type: GET_STRAIN_LIST, payload: strainList })
      )
  );
};

export const setHistory = (userHistory) => (dispatch) => {
  return dispatch({ type: SET_HISTORY, payload: userHistory });
};

export const getCatsOfProduct = (productId) => async (dispatch) => {
  try {
    const prodCategoryList = await axios.get(
      `http://localhost:3000/products/category/product/${productId}`
    );
    // console.log('ACTION', prodCategoryList.data);
    return dispatch({
      type: GET_CATEGORIES_OF_PRODUCT,
      payload: prodCategoryList.data,
    });
  } catch (error) {
    console.error(error);
    return;
  }
};

export const deleteStrain = (strainId) => (dispatch) => {
  return axios
    .delete(`http://localhost:3000/strain/${strainId}`)
    .then((id) => dispatch({ type: DELETE_STRAIN, payload: id }))
    .catch((err) => console.log('Error en la acción delete', err));
};
export const deleteCategory = (id) => (dispatch) => {
  return axios
    .delete(`http://localhost:3000/products/category/${id}`)
    .then((id) => dispatch({ type: DELETE_CATEGORY, payload: id }))
    .catch((err) => {
      console.log('Error en DELETE_CATEGORY', err);
    });
};

export const getProductsCart = (id) => (dispatch) => {
  return axios
    .get(`http://localhost:3000/users/${id}/cart`)
    .then((productsCart) =>
      dispatch({ type: GET_PRODUCTS_CART, payload: productsCart })
    )
    .catch((err) => {
      console.log('Error en GET_PRODUCTS_CART', err);
    });
};

export const getOrderList = () => async (dispatch) => {
  return await axios
    .get('http://localhost:3000/orders')
    .then((orderList) => {
      dispatch({ type: GET_ORDER_LIST, payload: orderList });
    })
    .catch((err) => {
      console.log('Error en GET_ORDER_LIST', err);
    });
};

export const deleteProductsCart = (id) => async (dispatch) => {
  return await axios
    .delete(`http://localhost:3000/users/${id}/cart`) //harcodearlo en el front al user
    .then((id) => dispatch({ type: DELETE_PRODUCTS_CART, payload: id }))
    .catch((err) => {
      console.log('Error en DELETE_PRODUCTS_CART', err);
    });
};

export const addProductCart = (idUser, productId, price) => async (
  dispatch
) => {
  // console.log('actions',idUser, product)
  return await axios
    .post(`http://localhost:3000/users/${idUser}/cart`, { productId, price }) //harcodearlo en el front al user
    .then(() => getProductsCart(idUser))
    // dispatch ({ type: ADD_PRODUCT_CART, payload }))
    .catch((err) => {
      console.log('Error en ADD_PRODUCT_CART', err);
    });
};

export const putProductCart = (idUser, productId, quantity) => async (
  dispatch
) => {
  return await axios
    .put(`http://localhost:3000/users/${idUser}/cart`, { productId, quantity })
    .then(() => getProductsCart(idUser))
    .catch((err) => {
      console.log('Error en PUT_PRODUCT_CART', err);
    });
};

export const deleteProductCart = (idUser, productId) => async (dispatch) => {
  return await axios
    .delete(`http://localhost:3000/users/${idUser}/cart/${productId}`)
    .then(() => getProductsCart(idUser))
    .catch((err) => {
      console.log('Error en DELETE_PRODUCT_CART', err);
    });
};

import axios from "axios";
import { GET_PRODUCT_SEARCH, GET_PRODUCTS_LIST } from "./actions";

export function getProductSearch(payload) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3000/search?word=${payload}`)
      .then((response) => {
        dispatch({ type: GET_PRODUCT_SEARCH, payload: response });
      })
      .catch((err) => {
        console.log('Error en GET_PRODUCT_SEARCH', err);
      });
  };
}

export function getProductsList() {
  return function (dispatch) {
    return axios
      .get('http://localhost:3000/products')
      .then(productList => {
        dispatch({ type: GET_PRODUCTS_LIST, payload: productList});
      })
      .catch(err => {
        console.log('Error en GET_PRODUCTS_LIST', err)
        
      })
  }
}
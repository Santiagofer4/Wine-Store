import axios from "axios";
import { GET_PRODUCT_SEARCH } from "./actions";

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
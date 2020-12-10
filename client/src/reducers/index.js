import { GET_PRODUCT_SEARCH, GET_PRODUCTS_LIST } from "../actions/actions";

const initialState = {
  wineList: [],
  allProducts: [],
  wineDetail: {},
  search: "",
  };

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SEARCH:
        console.log('reducer', action.payload);
        return {
            ...state,
            wineList: action.payload
        }
        case GET_PRODUCTS_LIST:
          console.log("GET_PRODUCTS_LIST", action.payload);
          return {
            ...state,
            allProducts: action.payload
          }
  }
};

export default reducers;
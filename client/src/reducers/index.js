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
        return {
            ...state,
            wineList: action.payload
        }
        case GET_PRODUCTS_LIST:
          return {
            ...state, 
            allProducts: [action.payload]}
  }

};

export default reducers;
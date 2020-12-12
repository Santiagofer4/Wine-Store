import {
  GET_PRODUCT_SEARCH,
  GET_PRODUCTS_LIST,
  SET_PRODUCT_DETAIL,
} from '../actions/actions';

const initialState = {
  wineList: [],
  allProducts: [],
  wineDetail: {},
  search: '',
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SEARCH:
      // console.log('reducer', action.payload);
      return {
        ...state,
        wineList: action.payload,
      };
    case GET_PRODUCTS_LIST:
      // console.log('datos payload', action.payload);
      // console.log('GET_PRODUCTS_LIST datos', state);
      return {
        ...state,
        allProducts: [action.payload],
      };
    case SET_PRODUCT_DETAIL:
      // console.log('REDUCER', action.payload);
      return { ...state, wineDetail: action.payload };
    default:
      return state;
  }
};

export default productReducers;

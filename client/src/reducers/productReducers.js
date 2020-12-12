import { GET_PRODUCT_SEARCH, GET_PRODUCTS_LIST,GET_PRODUCTS_CATEGORY,GET_CATEGORY_LIST, } from '../actions/actions';

const initialState = {
  wineList: [],
  allProducts: [],
  wineDetail: {},
  search: '',
  categories: []
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SEARCH:
     console.log('reducer', action.payload);
      return {
        ...state,
        allProducts:[action.payload.data]
      };
    case GET_PRODUCTS_LIST:
      console.log('datos payload', action.payload);
      return {
        ...state,
        allProducts: [action.payload.data],
      };
    case GET_PRODUCTS_CATEGORY:
      console.log(action.payload)
      return {
        ...state, 
        allProducts: [action.payload.data[0].products],
      };
    case GET_CATEGORY_LIST:

      return {
        ...state, 
        categories: [action.payload],
      }
    default:
      return state;
    
  }
};

export default productReducers;

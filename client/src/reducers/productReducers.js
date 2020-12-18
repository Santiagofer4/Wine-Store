import {
  GET_PRODUCT_SEARCH,
  GET_PRODUCTS_LIST,
  GET_PRODUCTS_CATEGORY,
  GET_CATEGORY_LIST,
  SET_PRODUCT_DETAIL,
  GET_STRAIN_LIST,
  DELETE_STRAIN,
  DELETE_CATEGORY,
  GET_PRODUCTS_CART,
  GET_ORDER_LIST,
  ADD_PRODUCT_CART,
} from '../actions/actions';

const initialState = {
  wineList: [],
  allProducts: [],
  wineDetail: {},
  search: '',
  categories: [],
  strains: [],
  productsCart: [],
  ordersList: []
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SEARCH:
      return {
        ...state,
        allProducts: [action.payload.data],
      };
    case GET_PRODUCTS_LIST:
      // console.log('datos payload', action.payload);
      // console.log('GET_PRODUCTS_LIST datos', state);

      return {
        ...state,
        allProducts: [action.payload.data],
      };

    case SET_PRODUCT_DETAIL:
      // console.log('REDUCER', action.payload);
      return { ...state, wineDetail: action.payload };
    case GET_PRODUCTS_CATEGORY:
      // console.log(action.payload);
      return {
        ...state,
        allProducts: [action.payload.data[0].products],
      };
    case GET_CATEGORY_LIST:
      // console.log('Get_category_list', action.payload.data)
      return {
        ...state,
        categories: action.payload.data,
      };
      case GET_STRAIN_LIST:
        return {
          ...state,
          strains: action.payload.data,
        }
      case DELETE_STRAIN:
        return {
          ...state,
          strains: state.strains.filter((strain) => 
           strain.id !== action.payload.data
          )
        }
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((category) => {return category !== action.payload.data} )
      }
    case GET_PRODUCTS_CART:
        return {
        ...state,
        productsCart: action.payload.data
      }
    case GET_ORDER_LIST:
        return {
        ...state,
        orderList: action.payload.data
      }
      case ADD_PRODUCT_CART:
        return {
          ...state,
         productsCart: action.payload.data //Revisar como llega el payload.
        }
    default:
      return state;
  }
};

export default productReducers;

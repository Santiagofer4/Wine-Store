import {
  POST_NEW_PRODUCT,
  GET_STRAIN_LIST,
  GET_CATEGORIES_OF_PRODUCT,
} from '../actions/actions';
import { postNewProduct } from '../actions/index';
import StrainForm from '../Components/Forms/StrainForm';
import { productsList } from '../Components/Products/ProductoPrueba';

const initialState = {
  strainList: {},
  prodCategoryList: [],
};

const formReducers = (state = initialState, action) => {
  switch (action.type) {
    case POST_NEW_PRODUCT:
      return null; // TODO: Postear el nuevo producto a la DB
    case GET_STRAIN_LIST:
      return { ...state, strainList: action.payload };
    case GET_CATEGORIES_OF_PRODUCT:
      // console.log('REDUCER PAYLOAD', action.payload);
      return { ...state, prodCategoryList: action.payload };
    default:
      return state;
  }
};

export default formReducers;

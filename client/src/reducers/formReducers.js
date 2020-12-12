import { POST_NEW_PRODUCT, GET_STRAIN_LIST } from '../actions/actions';
import { postNewProduct } from '../actions/index';
import StrainForm from '../Components/Forms/StrainForm';

const initialState = {
  strainList: {},
};

const formReducers = (state = initialState, action) => {
  switch (action.type) {
    case POST_NEW_PRODUCT:
      return null; // TODO: Postear el nuevo producto a la DB
    case GET_STRAIN_LIST:
      return { ...state, strainList: action.payload };
    default:
      return state;
  }
};

export default formReducers;

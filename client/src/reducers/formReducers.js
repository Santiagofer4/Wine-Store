import { POST_NEW_PRODUCT } from '../actions/actions';
import { postNewProduct } from '../actions/index';

const initialState = {
  strainList: '',
};

const formReducers = (state = initialState, action) => {
  console.log('formReducers', action);
  switch (action.type) {
    case POST_NEW_PRODUCT:
      return null; // TODO: Postear el nuevo producto a la DB
    default:
      return state;
  }
};

export default formReducers;

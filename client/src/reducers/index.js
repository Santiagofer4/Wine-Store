import { combineReducers } from 'redux';
import productReducers from './productReducers.js';
import formReducers from './formReducers.js';
import utilsReducers from './utilsReducers.js';
import productSlice from '../slices/productSlice';
import categorySlice from '../slices/categorySlice.js';

// const rootReducer = combineReducers({
//   productReducers,
//   formReducers,
//   utilsReducers,
// });

const rootReducer = {
  products: productSlice.reducer,
  categories: categorySlice.reducer,
  productReducers,
  formReducers,
  utilsReducers,
};

export default rootReducer;

import { combineReducers } from 'redux';
// import productReducers from './productReducers.js';
// import formReducers from './formReducers.js';
// import utilsReducers from './utilsReducers.js';
import productSlice from '../slices/productSlice';
import categorySlice from '../slices/categorySlice.js';
import productDetailSlice from '../slices/productDetailSlice'
import productsCart from '../slices/productsCartSlice'
import { strainSlice } from '../slices/strainSlice';
import orderTableSlice from '../slices/orderTableSlice';


// const rootReducer = combineReducers({
//   productReducers,
//   formReducers,
//   utilsReducers,
// });

const rootReducer = {
  products: productSlice.reducer,
  categories: categorySlice.reducer,
  wineDetail: productDetailSlice.reducer,
  productsCart: productsCart.reducer,
  // productReducers,
  // formReducers,
  // utilsReducers,
  strains: strainSlice.reducer,
  orderTable: orderTableSlice.reducer,
};

export default rootReducer;

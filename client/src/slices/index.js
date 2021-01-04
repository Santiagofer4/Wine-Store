import productSlice from '../slices/productSlice';
import categorySlice from '../slices/categorySlice';
import productDetailSlice from '../slices/productDetailSlice';
import productsCartSlice from './productsCartSlice';
import orderTableSlice from './orderTableSlice';
import strainSlice from '../slices/strainSlice';
import userSlice from './userSlice';

const rootReducer = {
  products: productSlice.reducer,
  categories: categorySlice.reducer,
  wineDetail: productDetailSlice.reducer,
  productsCart: productsCartSlice.reducer,
  strains: strainSlice.reducer,
  orderTable: orderTableSlice.reducer,
  user: userSlice.reducer,
};

export default rootReducer;

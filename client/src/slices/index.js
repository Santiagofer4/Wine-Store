import productSlice from '../slices/productSlice';
import categorySlice from '../slices/categorySlice';
import productDetailSlice from '../slices/productDetailSlice';
import productsCartSlice from './productsCartSlice';
import orderTableSlice from './orderTableSlice';
import strainSlice  from '../slices/strainSlice';

const rootReducer = {
  products: productSlice.reducer,
  categories: categorySlice.reducer,
  wineDetail: productDetailSlice.reducer,
  productsCart: productsCartSlice.reducer,
  strains: strainSlice.reducer,
  orderTable: orderTableSlice.reducer,
};



export default rootReducer;

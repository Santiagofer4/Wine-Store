import productSlice from '../slices/productSlice';
import categorySlice from '../slices/categorySlice';
import productDetailSlice from '../slices/productDetailSlice'
import productsCartSlice from './productsCartSlice'
const rootReducer = {
  products: productSlice.reducer,
  category: categorySlice.reducer,
 wineDetail: productDetailSlice.reducer,
 productsCart: productsCartSlice.reducer
};

export default rootReducer;

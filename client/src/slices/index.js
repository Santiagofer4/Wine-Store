import productSlice from '../slices/productSlice';
import categorySlice from '../slices/categorySlice';
import productDetailSlice from '../slices/productDetailSlice'

const rootReducer = {
  products: productSlice.reducer,
  category: categorySlice.reducer,
  // wineDetail: productDetailSlice.reducer
};

export default rootReducer;

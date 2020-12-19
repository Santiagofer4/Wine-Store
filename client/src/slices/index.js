import productSlice from '../slices/productSlice';
import categorySlice from '../slices/categorySlice';

const rootReducer = {
  products: productSlice.reducer,
  category: categorySlice.reducer,
};

export default rootReducer;

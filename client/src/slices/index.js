import productSlice from '../slices/productSlice';
import categorySlice from '../slices/categorySlice';
import productDetailSlice from '../slices/productDetailSlice';
import productsCartSlice from './productsCartSlice';
import orderTableSlice from './orderTableSlice';
import strainSlice from '../slices/strainSlice';
import userSlice from './userSlice';
import reviewSlice from './reviewSlice';
import notificationSlice from './notificationSlice';

const rootReducer = {
  products: productSlice.reducer,
  categories: categorySlice.reducer,
  wineDetail: productDetailSlice.reducer,
  productsCart: productsCartSlice.reducer,
  strains: strainSlice.reducer,
  orderTable: orderTableSlice.reducer,
  user: userSlice.reducer,
  reviews: reviewSlice.reducer,
  notifications: notificationSlice.reducer,
};

export default rootReducer;

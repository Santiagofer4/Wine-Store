import { combineReducers } from 'redux';
import productReducers from './productReducers.js';
import formReducers from './formReducers.js';
import utilsReducers from './utilsReducers.js';

const rootReducer = combineReducers({
  productReducers,
  formReducers,
  utilsReducers,
});

export default rootReducer;

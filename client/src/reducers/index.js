import { combineReducers } from 'redux';
import productReducers from './productReducers.js';
import formReducers from './formReducers.js';

const rootReducer = combineReducers({ productReducers, formReducers });

export default rootReducer;

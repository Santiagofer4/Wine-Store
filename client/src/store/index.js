import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../slices/index';
import logger from 'redux-logger';
import { notificationMiddleware } from './middleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(notificationMiddleware),
});

export default store;

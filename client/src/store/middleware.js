import { enqueueSnackbar } from '../slices/notificationSlice';

export const notificationMiddleware = (store) => (next) => (action) => {
  console.log('NOTI MIDDLE WARE', action.type, action);
  let [SLICE, ACTION] = action.type.split('/');
  if (SLICE === 'cart') {
    console.log('SADADASD');
    // store.dispatch(enqueueSnackbar());
  }

  //   console.log('ACTION', ACTION);
  return next(action);
};

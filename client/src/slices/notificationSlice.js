import { createSlice } from '@reduxjs/toolkit';

const initialState_notification = {
  notifications: [],
};
const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState_notification,
  reducers: {
    enqueueSnackbar: (state, { payload }) => {
      let { key, notification } = payload;
      key = key || new Date().getTime + Math.random();
      state.notifications.push({ key, notification });
    },
    closeSnackbar: (state, { payload }) => {
      const { key, notification, dismissAll } = payload;
      state.notifications = state.notifications.filter((notification) =>
        dismissAll || notification.key === key
          ? (notification.dismissed: true)
          : notification
      );
    },
    clearSnackbar: (state, { payload }) => {
      state.notifications = state.notifications.forEach(
        ((notification) => notification.dismissed: true)
      );
    },
    removeSnackbar: (state, { payload }) => {
      const { key, notification } = payload;
      state.notifications = state.notifications.filter(
        (notification) => notification.key !== key
      );
    },
  },
});

export const {
  enqueueSnackbar,
  closeSnackbar,
  clearSnackbar,
  removeSnackbar,
} = notificationSlice.actions;

export default notificationSlice;

const notificationsMiddlewarestore = (store) => (next) => (action) => {
  let TYPE = action.type;
  console.log('CUSTOM MIDDLEWARE', TYPE);
  switch (TYPE) {
    case 'value':
      break;

    default:
      break;
  }
};

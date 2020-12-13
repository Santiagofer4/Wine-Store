import { AccordionActions } from '@material-ui/core';
import { SET_HISTORY } from '../actions/actions.js';

const initialState = {
  lastLocation: '',
  currentLocation: '', //? implementar despues
};
const utilsReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_HISTORY:
      return { ...state, lastLocation: action.payload };
    default:
      return state;
  }
};

export default utilsReducers;

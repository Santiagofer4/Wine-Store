import { GET_PRODUCT_SEARCH } from "../actions/actions";

const initialState = {
  wineList: [],
  allProducts: [],
  wineDetail: {},
  search: "",
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SEARCH:
        console.log('reducer', action.payload);
        return {
            ...state,
            wineList: action.payload
        }
  }
};

export default reducers;
import ACTION_TYPES from './actionTypes';
const initialState = {
  customers: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_CUSTOMERS_SUCCESS:
      return { ...state, customers: action.customers };
    default:
      return state;
  }
}

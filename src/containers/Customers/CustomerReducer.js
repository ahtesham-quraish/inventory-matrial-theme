import ACTION_TYPES from './actionTypes';
const initialState = {
  customers: null,
  customerId: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_CUSTOMERS_SUCCESS:
      return { ...state, customers: action.customers };
    case ACTION_TYPES.SET_CUSTOMER_ID:
      return { ...state, customerId: action.id };
    default:
      return state;
  }
}

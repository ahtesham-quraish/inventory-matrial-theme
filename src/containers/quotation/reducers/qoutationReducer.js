import ACTION_TYPES, { action_types } from '../actions/actionTypes';
const initialState = {
  selectedCustomers: null,
  qoutationProducts: [],
  pastProducts:[]
};

export default function QoutationReducer(state = initialState, action) {
  switch (action.type) {
    case action_types.SET_SELECTED_CUSTOMER:
      return {
        ...state,
        selectedCustomers: action.payload,
      };
    case action_types.ADD_PRODUCT_TO_QOUTATION:
      return {
        ...state,
        qoutationProducts: state.qoutationProducts.concat(action.payload),
      };
    case action_types.REMOVE_PRODUCT_FROM_QOUTATION:
      return {
        ...state,
        qoutationProducts: state.qoutationProducts.filter((product) => {
          return product.id !== action.payload.value;
        }),
      };
    default:
      return state;
  }
}

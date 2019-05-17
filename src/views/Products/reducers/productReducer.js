import action_types from '../actions/actionTypes';

const initialState = {
  product: [],
  loading: false,
  success: false,
  error: false,
};

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case action_types.ADD_FETCHED_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case action_types.APPEND_POSTED_PRODUCT:
      return {
        ...state,
        product: state.product.concat(action.payload),
      };
    case action_types.TOGGLE_PRODUCT_LOADER:
      return {
        ...state,
        loading: !state.loading,
      };
    case action_types.APPEND_POSTED_PRODUCT_SUCCESS:
      console.log('toggle success apend');
      return {
        ...state,
        success: !state.success,
      };
    case action_types.APPEND_POSTED_PRODUCT_ERROR:
      return {
        ...state,
        error: !state.error,
      };
    default:
      return state;
  }
}

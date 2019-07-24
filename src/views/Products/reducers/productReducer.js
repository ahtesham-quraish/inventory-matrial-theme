import action_types from '../actions/actionTypes';

const initialState = {
  product: [],
  productDetail: {},
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
    case action_types.FETCH_PRODUCT_DETAILS:
      return {
        ...state,
        productDetail: action.payload,
      };
    case action_types.GET_CUSTOMER_INVOICE_PRODUCTS_SUCCESS:
      let ids = [];
      console.log('prod filter here', action.payload);
      action.payload.products.forEach((element) => {
        console.log(element.original_product.id, ' element');
        ids.push(element.original_product.id);
      });
      console.log('products to filter are', ids);
      console.log('present products are', state.product);
      return {
        ...state,
        product: state.product.filter((item) => !ids.includes(item.id)),
      };
    default:
      return state;
  }
}

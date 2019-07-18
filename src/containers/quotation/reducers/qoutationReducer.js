import ACTION_TYPES, { action_types } from '../actions/actionTypes';

const initialState = {
  selectedCustomers: null,
  qoutationProducts: [],
  pastProducts: [],
  pdf_email_response: null,
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

    case action_types.SEND_PDF_VIA_EMAIL_SUCCESS:
      return {
        ...state,
        pdf_email_response: action.payload,
      };
    case action_types.GET_CUSTOMER_INVOICE_PRODUCTS_SUCCESS:
      return { pastProducts: action.payload.products };
    default:
      return state;
  }
}

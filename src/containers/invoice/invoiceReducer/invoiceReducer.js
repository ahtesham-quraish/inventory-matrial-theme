import { action_types } from '../actions/actionTypes';
const initialState = {
  savedInvoice: {},
  invoices: [],
};

export default function InvoiceReducer(state = initialState, action) {
  switch (action.type) {
    case action_types.POST_INVOICE_SUCCESS:
      return {
        ...state,
        savedInvoice: action.payload,
      };

    case action_types.GET_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: action.payload.invoices,
      };

    default:
      return state;
  }
}

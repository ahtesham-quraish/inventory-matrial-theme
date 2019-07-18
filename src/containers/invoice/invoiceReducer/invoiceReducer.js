import { action_types } from '../actions/actionTypes';
const initialState = {
  savedInvoice: {},
};

export default function InvoiceReducer(state = initialState, action) {
  switch (action.type) {
    case action_types.POST_INVOICE_SUCCESS:
      return {
        ...state,
        savedInvoice: action.payload,
      };

    default:
      return state;
  }
}

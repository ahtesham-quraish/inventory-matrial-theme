import { action_types } from '../actions/actionTypes';
const initialState = {
  savedInvoice: {},
  invoices: [],
  invoicePDFInputs: {
    buyerOrderNumber: '',
    buyerOrderNumberDate: new Date(),
    taxInvoiceNumber: '',
    taxInvoiceNumberDate: new Date(),
    deliverNumber: '',
    deliverNumberDate: new Date(),
    qoutNumber: '',
    qoutNumberDate: new Date(),
    subTotal: '',
    grandTotal: '',
    discount: 10,
    status: 'Unpaid',
  },
  invoiceByID: {
    invoice: {
      buyerOrderNumber: '',
      buyerOrderNumberDate: '',
      taxInvoiceNumber: '',
      taxInvoiceNumberDate: '',
      deliverNumber: '',
      deliverNumberDate: '',
      qoutNumber: '',
      qoutNumberDate: '',
    },
    products: [],
  },
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

    case action_types.INVOICE_INPUTS_CHANGE_HANDLE:
      const invoicePDFInputs = { ...state.invoicePDFInputs };

      invoicePDFInputs[action.payload.field] = action.payload.value;
      console.log('after change ', invoicePDFInputs);
      return {
        ...state,
        invoicePDFInputs: invoicePDFInputs,
      };

    case action_types.GET_INVOICE_BY_ID_SUCCESS:
      return {
        ...state,
        invoiceByID: action.payload,
      };

    default:
      return state;
  }
}

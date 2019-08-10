import { combineReducers } from 'redux';
import CustomerState from './containers/Customers/CustomerReducer';
import { productReducer } from './views/Products/reducers/productReducer';
import QoutationReducer from './containers/quotation/reducers/qoutationReducer';
import InvoiceReducer from './containers/invoice/invoiceReducer/invoiceReducer';
import BankState from './containers/bank/bankState';
export default combineReducers({
  CustomerState,
  productReducer,
  QoutationReducer,
  InvoiceReducer,
  BankState,
});

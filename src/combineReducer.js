import { combineReducers } from 'redux';
import CustomerState from './containers/Customers/CustomerReducer';
import { productReducer } from './views/Products/reducers/productReducer';
import QoutationReducer from './containers/quotation/reducers/qoutationReducer';
export default combineReducers({
  CustomerState,
  productReducer,
  QoutationReducer,
});

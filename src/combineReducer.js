import { combineReducers } from 'redux';
import CustomerState from './containers/Customers/CustomerReducer';
import { productReducer } from './views/Products/reducers/productReducer';
export default combineReducers({
  CustomerState,
  productReducer,
});

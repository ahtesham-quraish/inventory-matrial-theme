import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function getAllCustomersSuccess(products) {
  return (dispatch) => {
    dispatch({
      products,
      type: action_types.GET_CUSTOMER_INVOICE_PRODUCTS_SUCCESS,
    });
  };
}
const getCustomerInvoiceProducts = (cust_id) => {
  return (dispatch) => {
    return axiosInstance
      .get('http://localhost:8000/invoice-by-customer/?cust_id=' + cust_id)
      .then((response) => dispatch(getAllCustomersSuccess(response.data)));
  };
};

export default getCustomerInvoiceProducts;

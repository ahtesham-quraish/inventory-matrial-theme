import ACTION_TYPES from '../actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function getAllCustomersSuccess(products) {
  return (dispatch) => {
    dispatch({
      products,
      type: ACTION_TYPES.GET_CUSTOMER_INVOICE_PRODUCTS_SUCCESS,
    });
  };
}
const getCustomerInvoiceProducts = (cust_id) => {
  return (dispatch) => {
    return axiosInstance
      .get('http://localhost:8000/invoice/')
      .then((response) => dispatch(getAllCustomersSuccess(response.data)));
  };
};

export default getCustomerInvoiceProducts;

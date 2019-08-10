import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function updateInvoiceSuccess(response) {
  return (dispatch) => {
    dispatch({
      payload: response,
      type: action_types.HANDLE_UPDATE_INVOICE_RESPONSE,
    });
  };
}
const updateInvoice = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .put('http://localhost:8000/invoice/', payload)
      .then((response) => dispatch(updateInvoiceSuccess(response.data)));
  };
};

export default updateInvoice;

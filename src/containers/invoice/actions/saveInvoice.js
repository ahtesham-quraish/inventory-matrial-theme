import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function saveInvoiceSuccess(response) {
  return (dispatch) => {
    dispatch({ payload: response, type: action_types.POST_INVOICE_SUCCESS });
  };
}
const saveInvoice = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .post('http://localhost:8000/invoice/', payload)
      .then((response) => dispatch(saveInvoiceSuccess(response.data)));
  };
};

export default saveInvoice;

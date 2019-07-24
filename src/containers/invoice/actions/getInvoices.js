import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function getInvoiceSuccess(response) {
  return (dispatch) => {
    dispatch({ payload: response, type: action_types.GET_INVOICE_SUCCESS });
  };
}
const getInvoices = () => {
  return (dispatch) => {
    return axiosInstance
      .get('http://localhost:8000/invoice/')
      .then((response) => dispatch(getInvoiceSuccess(response.data)));
  };
};

export default getInvoices;

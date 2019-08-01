import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function handleResponse(response) {
  return (dispatch) => {
    dispatch({
      payload: response,
      type: action_types.GET_INVOICE_BY_ID_SUCCESS,
    });
  };
}
const getInvoiceByID = (id) => {
  return (dispatch) => {
    return axiosInstance
      .get('http://localhost:8000/invoice/?invoice_id=' + id)
      .then((response) => dispatch(handleResponse(response.data)));
  };
};

export default getInvoiceByID;

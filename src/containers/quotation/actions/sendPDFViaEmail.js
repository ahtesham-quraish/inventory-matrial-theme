import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';

export function sendEmailSuccess(response) {
  return (dispatch) => {
    dispatch({
      payload: response,
      type: action_types.SEND_PDF_VIA_EMAIL_SUCCESS,
    });
  };
}
const sendPDFViaEmail = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .post('http://localhost:8000/email-invoice/', payload)
      .then((response) => dispatch(sendEmailSuccess(response.data)));
  };
};

export default sendPDFViaEmail;

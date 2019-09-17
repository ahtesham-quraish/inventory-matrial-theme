import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function deleteInvoiceSuccess(response) {
    return (dispatch) => {
        dispatch({ payload: response, type: action_types.DELETE_INVOICE_SUCCESS });
    };
}


export const deleteInvoice = (id) => {
    return (dispatch) => {
        return axiosInstance
            .delete(`http://localhost:8000/invoice/?invoice_id=${id}`)
            .then((response) => dispatch(deleteInvoiceSuccess(response.data)));
    };
};

export default deleteInvoice;

import ACTION_TYPES from '../actionTypes';
import axiosInstance from '../../../helpers/axios-instance';

const deleteCustomer = (id) => {
    return (dispatch) => {
        return axiosInstance
            .delete(`http://localhost:8000/customer/${id}/`)
            .then((response) => dispatch({ type: ACTION_TYPES.DELETE_CUSTOMER_SUCCESS }));
    };
};

export default deleteCustomer;

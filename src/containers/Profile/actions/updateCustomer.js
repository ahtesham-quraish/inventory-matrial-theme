import ACTION_TYPES from '../actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function updateCustomerSuccess(customers) {
  return (dispatch) => {
    dispatch({ customers, type: ACTION_TYPES.UPDATE_CUSTOMER });
  };
}
const updateCustomer = (id, payload) => {
  return (dispatch) => {
    return axiosInstance
      .put(`http://localhost:8000/customer/${id}/`, payload)
      .then(
        (response) => dispatch(updateCustomerSuccess(response.data)),
        (e) => {
          debugger;
        },
      );
  };
};

export default updateCustomer;

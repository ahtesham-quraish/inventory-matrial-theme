import ACTION_TYPES from '../actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function addCustomerSuccess(customers) {
  return (dispatch) => {
    dispatch({ customers, type: ACTION_TYPES.ADD_CUSTOMER });
  };
}
const addCustomer = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .post('http://localhost:8000/customer/', payload)
      .then((response) => dispatch(addCustomerSuccess(response.data)));
  };
};

export default addCustomer;

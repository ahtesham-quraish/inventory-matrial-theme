import ACTION_TYPES from '../actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function getAllCustomersSuccess(customers) {
  return (dispatch) => {
    dispatch({ customers, type: ACTION_TYPES.GET_CUSTOMERS_SUCCESS });
  };
}
const getAllCustomers = () => {
  return (dispatch) => {
    return axiosInstance
      .get('http://localhost:8000/customer/')
      .then((response) => dispatch(getAllCustomersSuccess(response.data)));
  };
};

export default getAllCustomers;

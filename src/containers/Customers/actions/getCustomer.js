import ACTION_TYPES from '../actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function setCustomer(customer) {
  return (dispatch) => {
    dispatch({ customer, type: ACTION_TYPES.GET_CUSTOMER_SUCCESS });
  };
}
const getCustomer = (id) => {
  return (dispatch) => {
    return axiosInstance
      .get(`http://localhost:8000/customer/${id}/`)
      .then((response) => dispatch(setCustomer(response.data)));
  };
};

export default getCustomer;

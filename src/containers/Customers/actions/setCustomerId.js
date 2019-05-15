import ACTION_TYPES from '../actionTypes';
export default function setCustomerId(id) {
  return (dispatch) => {
    dispatch({ id, type: ACTION_TYPES.SET_CUSTOMER_ID });
  };
}
